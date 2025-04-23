import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/lib/db";



export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: DrizzleAdapter(db),
    session:{
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24, // 24 hours
    },
    providers:[
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID || "",
            clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
            authorization: {
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope:[
                        "openid",
                        "profile",
                        "email",
                    ].join(" "),
                    response:"code",
                }
            }
        }),
    ],

    pages: {
        signIn: "/auth",
    },

    callbacks:{
        async jwt({ token, user }) {
            if (user) {
             
              token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
             
            }
            return token;
          },
               
          async session({ session, token }) {
            if (token) {
              // set the token data to session
              if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
              }
            }
      
            return session;
          },
      

        redirect() {
            return "/auth";
        }
    }
})