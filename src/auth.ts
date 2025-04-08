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
        async jwt({token, user}) {
            console.log("JWT callback", {token, user});
            if (user) {
                token.id = user.id;
                token.image = user.image;
                token.name = user.name;
            }
            return token;
        },
        async session({session, user}) {
            
            if (session && user) {
                session.user.id = user.id;
                session.user.image = user.image;
                session.user.name = user.name;
            }
            return session;
        },
        redirect() {
            return "/auth";
        }
    }
})