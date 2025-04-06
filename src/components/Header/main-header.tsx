'use client';

import { ChartBar, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="w-full top-0">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2 text-blue-700">
          <ChartBar className="h-6 w-6" />
          <span>WebTracker</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
          <Link href="/auth">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)} 
            className="rounded-xl border-blue-200 text-blue-600"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-blue-50 border-t border-blue-100">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-blue-600 hover:text-blue-800 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="my-2 border-blue-100" />
          <Link
            href="/auth"
            className="text-blue-600 hover:text-blue-800 py-2"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link href="/auth" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
