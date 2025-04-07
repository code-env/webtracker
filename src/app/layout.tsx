import type { Metadata } from "next";
import {  Inria_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer/mainFooter";

import { Toaster } from "@/components/ui/sonner"


const inriaSerif = Inria_Serif({
  weight: ["400", "700"],
  variable: "--font-inria-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebTracker",
  description: "A web analytics tool for tracking user behavior and performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inriaSerif.variable} ${inriaSerif.variable} ${inriaSerif.style} antialiased`}
        
      >
        
        <Header/>
        {children}
        <Toaster className="bg-blue-500"/>
        <Footer/>
       
      </body>
    </html>
  );
}
