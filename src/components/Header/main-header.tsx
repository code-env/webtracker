'use client';

import { ChartBar, Menu, X, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { ThemeSwitcher } from "@/components/theme-switcher";

function SignOut() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signOut()
      }}
    >
      <Button type="submit" variant="default">
        <LogOut className="h-4 w-4" />
        <span>Sign out</span>
      </Button>
    </form>
  )
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession();

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const afterAuthenticatedNavLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> }
  ];

  const userImage = session?.user?.image;
  const userName = session?.user?.name;
  
  // Get only the first name if full name exists
  const firstName = userName?.split(' ')[0];

  return (
    <div className="relative">
      <nav className="flex flex-row items-center justify-center bg-white dark:bg-neutral-900 shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center space-x-2 text-primary">
            <ChartBar className="h-6 w-6" />
            <span>WebTracker</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? afterAuthenticatedNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary/80 hover:text-primary transition-colors flex items-center gap-2 font-medium"
              >
                {link.icon}
                {link.name}
              </Link>
            )) : navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary/80 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 border-r border-primary/10 pr-6">
                  {userImage ? (
                    <Image 
                      src={userImage} 
                      alt={userName || "User"} 
                      width={36} 
                      height={36} 
                      className="rounded-full ring-2 ring-primary/10"
                    />
                  ) : (
                    <div className="bg-primary/10 rounded-full w-9 h-9 flex items-center justify-center text-primary font-semibold">
                      {firstName?.[0]}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-primary/80 dark:text-primary font-medium text-sm">Welcome,</span>
                    <span className="text-primary font-semibold">{firstName}</span>
                  </div>
                  <ThemeSwitcher className="ml-2" />
                </div>
                <SignOut />
              </div>
            ) : (
              <>
                <ThemeSwitcher className="mr-4" />
                <Link href="/auth" className="text-primary/80 hover:text-primary mr-4">
                  Login
                </Link>
                <Link href="/auth">
                  <Button variant="default">
                    Sign Up <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)} 
              className="rounded-xl border-primary/10"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full px-4 py-4 flex flex-col gap-3 bg-white dark:bg-neutral-900 shadow-md z-10">
          {session ? (
            <div className="flex items-center gap-3 border-b border-primary/10 pb-4 mb-2">
              {userImage ? (
                <Image 
                  src={userImage} 
                  alt={userName || "User"} 
                  width={40} 
                  height={40} 
                  className="rounded-full ring-2 ring-primary/10"
                />
              ) : (
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-semibold">
                  {firstName?.[0]}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-primary/80 dark:text-primary font-medium text-sm">Welcome,</span>
                <span className="text-primary font-semibold">{firstName}</span>
              </div>
            </div>
          ) : null}
          
          {session ? afterAuthenticatedNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary/80 hover:text-primary transition-colors py-2 flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          )) : navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <hr className="my-2 border-primary/10 w-full" />
          
          {session ? (
            <SignOut />
          ) : (
            <>
              <Link
                href="/auth"
                className="text-primary/80 hover:text-primary py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link href="/auth" onClick={() => setIsOpen(false)} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/80 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};