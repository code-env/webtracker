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
              <ChartBar className="icon-class w-8 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-900">WebTracker</h2>
            </Link>
            <p className="text-blue-700 mt-2">
              WebTracker is a powerful web analytics tool that helps you track and analyze your website&apos;s performance.
            </p>
            <p className="text-sm text-blue-600 mt-5">
              © {new Date().getFullYear()} WebTracker. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-blue-900">Pages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-blue-600 hover:text-blue-800">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-blue-600 hover:text-blue-800">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-blue-600 hover:text-blue-800">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-blue-600 hover:text-blue-800">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-900">Socials</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/Avik-creator" className="text-blue-600 hover:text-blue-800">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/" className="text-blue-600 hover:text-blue-800">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/Avikm744" className="text-blue-600 hover:text-blue-800">
                    X
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-900">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
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
