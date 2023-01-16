import { isUserExists } from "./signup";

import { compare } from "bcryptjs";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await isUserExists(credentials.email);
        if (Object.keys(user).length === 0) {
          throw new Error("No user found!");
        }

        const userKey = user[Object.keys(user)[0]];
        const userPassword = userKey.password;

        const isValid = await compare(credentials.password, userPassword);
        if (!isValid) {
          throw new Error("Incorrect password!");
        }

        return { email: userKey.email, name: userKey.name };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
