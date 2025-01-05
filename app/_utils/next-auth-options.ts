import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
};
