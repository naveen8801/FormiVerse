import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import User from "./Models/User";
import connectDB from "./helpers/ConnectDB";
import { verifyPassword } from "./helpers/passwordManager";
// import sendEmail from "./utils/sendEmail";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    _id?: string | null;
    username?: string | null;
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
            throw new Error("No use found with this email !");
          }
        } catch (error) {
          throw new Error(error?.toString());
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      //   session.user.id = token.id;
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      //   if (user._id) {
      //     token.id = user._id;
      //   }
      return token;
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
