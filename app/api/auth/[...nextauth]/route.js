import NextAuth from "next-auth/next"; 
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Google OAuth client ID stored in environment variables
      clientSecret: process.env.GOOGLE_SECRET, // Google OAuth client secret stored in environment variables
    }),
  ],
});

// Export authentication handler for both GET and POST requests
export { handler as GET, handler as POST };
