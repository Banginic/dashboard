import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/drizzle/index";
import { usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
  interface User {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email))
          .limit(1);

        if (user.length === 0)  {
          throw new Error("No user found");
        }
        

        const isValid = await bcrypt.compare(credentials.password, user[0].password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user[0].id, email: user[0].email, role: user[0].role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/auth/sign-in",
    error: "/dashboard/auth/sign-in", // redirect errors to login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
