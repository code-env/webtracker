'use client'

import Link from "next/link";
import { ChartBar, Github, Linkedin, Twitter, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
        <div className="absolute -top-[200px] -left-[200px] w-[400px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -top-[300px] -right-[200px] w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-sm"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-indigo-500 text-white p-1.5 rounded-lg shadow-md">
                <ChartBar className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
                WebTracker
              </span>
            </Link>

            <p className="text-muted-foreground mb-6">
              WebTracker is a powerful web analytics tool that helps you track and analyze your website&#39;s performance while respecting user privacy.
            </p>

            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>by</span>
              <Link
                href="https://github.com/Avik-creator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Avik Mukherjee
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
          >
            <div>
              <div className="text-sm uppercase tracking-wider font-medium text-primary mb-4">Pages</div>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm uppercase tracking-wider font-medium text-primary mb-4">Connect</div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://github.com/Avik-creator"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/avik-mukherjee-8ab9911bb/"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/Avikm744"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm uppercase tracking-wider font-medium text-primary mb-4">Legal</div>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 mt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} WebTracker. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
