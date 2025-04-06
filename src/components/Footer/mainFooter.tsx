"use client";
import Link from "next/link";
import { ChartBar } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" py-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <ChartBar className="icon-class w-8" />
              <h2 className="text-lg font-bold">WebTracker</h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              WebTracker is a powerful web analytics tool that helps you track and analyze your website&apos;s performance.
            </p>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} WebTracker. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                  FAQ
                  </Link>
                </li>
                
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/Avik-creator" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/Avikm744" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
        
      
      </div>
    </footer>
  );
}
