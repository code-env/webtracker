import type { Metadata } from "next";
import {  Inria_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer/mainFooter";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes";

const inriaSerif = Inria_Serif({
  weight: ["400", "700"],
  variable: "--font-inria-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebTracker",
  description: "A web analytics tool for tracking user behavior and performance",
  keywords: [
    "web analytics",
    "user behavior",
    "performance tracking",
    "data visualization",
    "real-time analytics",
    "user engagement",
    "website performance",
    "analytics dashboard",
    "data analysis",
    "user experience",
    "conversion tracking",
    "event tracking"],
  openGraph: {
    description: "A web analytics tool for tracking user behavior and performance",
    title: "WebTracker",
    type: "website",
    siteName: "WebTracker",
    locale: "en_US",
    url: "https://webtracker.avikmukherjee.tech",
    images: [
      {
        url: "https://webtracker.avikmukherjee.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebTracker",
      },
    ]
  },
  twitter:{
    card: "summary_large_image",
    description: "A web analytics tool for tracking user behavior and performance",
    title: "WebTracker",
    images: [
      {
        url: "https://webtracker.avikmukherjee.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebTracker",
      },
    ]
  },
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
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header/>
            {children}
            <Toaster className="bg-blue-500"/>
            <Footer/>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
