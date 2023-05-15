import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectDb } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDb();

      const sessionUser = await User.findOne({ email: session!.user?.email });
      if (sessionUser) {
        (session.user as any).id = sessionUser._id.toString();
      }
      return session;
    },

    async signIn({ profile }) {
      await connectDb();

      const userExists = await User.findOne({ email: profile?.email });

      if (!userExists) {
        try {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.image,
          });
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
