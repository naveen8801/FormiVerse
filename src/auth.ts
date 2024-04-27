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
    id?: string | null;
    username?: string | null;
  }
}

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const db: any = await connectDB();
        if (db && credentials) {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (user) {
            const res = await verifyPassword(
              credentials.password,
              user.password
            );
            if (!res) {
              //   res.status(404).json({ msg: 'Wrong Credentials' });
              throw new Error("Invalid Credentials !");
            } else {
              return user;
            }
          } else {
            // res.status(404).json({ msg: 'No User Found' });
            throw new Error("No use found with this email !");
          }
        }
      },
    }),
  ],
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
