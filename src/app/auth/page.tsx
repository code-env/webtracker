import React from "react";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function SignIn() {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-4 py-12 overflow-hidden">
     
      

      <Card className="w-full max-w-md mx-auto bg-background backdrop-blur-md border border-blue-800/50 rounded-xl shadow-xl transition-all duration-300 hover:shadow-blue-700/30 hover:border-blue-700/50">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-blue-500 animate-fade-in-down">
            Welcome
          </CardTitle>
          <p className="text-blue-500 animate-fade-in transition-all duration-500">
            Sign in to access your WebTracker account
          </p>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/dashboard",
              
              });
            }}
          >
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-3 
                    bg-blue-600 text-white 
                    hover:bg-blue-500 
                    border border-blue-500/50
                    transition-all duration-300
                    hover:shadow-md hover:shadow-blue-500/20
                    focus:ring-2 focus:ring-blue-400
                    rounded-lg py-2 px-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-white">Sign in with Google</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
