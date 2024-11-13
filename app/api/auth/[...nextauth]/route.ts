import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation'
interface au{
  email:string,
  password:string
  
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // Add the `id` field
      name?: string ;
      email?: string  ;
      image?: string ;
    };
    isAuthenticated: boolean;  // Include isAuthenticated in the session
  }

  interface User {
    id: string;  // Add `id` to the User type
  }
}
const prisma = new PrismaClient();
export const authOptions:NextAuthOptions = {
  // adapter:prismaAdapter(prisma),
  session:{
    strategy:'jwt'
  },

  pages:{
    signIn:'/LoginFormPage'
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        
        async authorize(credentials, req){
            if (!credentials?.email||!credentials.password){
                return null
            }
            const checkUser=await prisma.user.findUnique({
                where:{
                    email:credentials.email

                }

            })
            if (!checkUser){
                return null
            }
            const passwordMatch=await bcrypt.compare(credentials.password,checkUser.password!)
            console.log("check use",checkUser)
            if (!passwordMatch){
                return null
            }
            return { id: checkUser.id+'', email: checkUser.email,name:checkUser.name };


        }
    })
    ,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,  // Fallback to empty string if undefined
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,  // Fallback to empty string if undefined
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
    async jwt({ token, user }) {
      // If user exists, set `isAuthenticated` to true and add `id`
     
      
      if (user) {
        token.id = user.id;
        token.isAuthenticated = true;
      } else {
        // Ensure `isAuthenticated` is false if no user is logged in
        token.isAuthenticated = false;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach `id` and `isAuthenticated` from token to session
      if (session.user){
        console.log("session user is ", session.user);
        console.log("token is", token);
        
        session.user.id = token.sub as string;
        session.isAuthenticated = Boolean(token.isAuthenticated);
      }
      console.log("final session", session);
      
      return session;
    },
  },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// function prismaAdapter(prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>): import("next-auth/adapters").Adapter | undefined {
//   throw new Error("Function not implemented.");
// }

