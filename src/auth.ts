import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import User from "./models/User";
import connectDB from "./helpers/ConnectDB";
import { hasPassword, verifyPassword } from "./helpers/passwordManager";
import { generateUsername } from "./lib/utils";
import sendEmail from "./lib/sendEmail";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    _id: string | null;
    username: string | null;
    fullname: string | null;
    email: string | null;
    isGoogleUser: boolean;
  }

  interface Session {
    // Add your additional properties here:
    user: {
      id: string | null;
      username: string | null;
      fullname: string | null;
      email: string | null;
      isGoogleUser: boolean;
    };
  }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, //  3 days ,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials: any, req) {
        try {
          await connectDB();
          const user = await User.findOne({
            $or: [
              { email: credentials.username },
              { username: credentials.username },
            ],
            isGoogleUser: false,
          });
          if (user) {
            const res = await verifyPassword(
              credentials.password,
              user.password
            );
            if (!res) {
              throw new Error("Invalid Credentials !");
            } else {
              return user;
            }
          } else {
            throw new Error("No use found with this email or username !");
          }
        } catch (error) {
          throw new Error(error?.toString());
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.fullname = token.fullname;
        session.user.isGoogleUser = token.isGoogleUser ?? false;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.fullname = user.fullname;
        token.isGoogleUser = false;
      }
      if (account?.provider === "google") {
        await connectDB();
        const currUser = await User.findOne({
          email: user?.email,
          isGoogleUser: true,
        });
        console.log("currUser inside jwt", currUser);
        token.id = currUser._id;
        token.username = currUser.username;
        token.fullname = currUser.fullname;
        token.isGoogleUser = true;
      }
      return token;
    },
    async signIn({ account, profile, user }: any) {
      if (account?.provider === "google" && profile) {
        try {
          await connectDB();
          const { name, email, given_name } = profile;
          const currUser = await User.findOne({ email, isGoogleUser: true });
          console.log("currUser inside sign in", currUser);
          if (!currUser) {
            // Create a new user
            const hash = await hasPassword(account?.providerAccountId);
            const newUser = await new User({
              username: generateUsername(name || given_name || ""),
              email: email,
              password: hash,
              fullname: name || given_name || "",
              isGoogleUser: true,
            }).save({
              validateBeforeSave: true,
            });
            user = newUser;
            console.log("newUser inside sign in", newUser);
            // Send email on user create
            const { msg, error } = await sendEmail({
              receiverEmail: email,
              data: { name: name || given_name },
              emailType: "WELCOME",
            });
            console.log("email sent for new user inside sign in");
            return true;
          }
          user = currUser;
          return true;
        } catch (error) {
          console.error("Error during google sign in", error);
          return false;
        }
      }
      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
