import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "WebTracker",
    template: "%s | WebTracker",
  },
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


export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link 
          href="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Last Updated: April 26, 2025</p>
      </div>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Introduction</h2>
          <p className="mb-4">
            WebTracker (we,&quot; our,&quot; or us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web analytics service.
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. By using WebTracker, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-blue-700 mb-3">Information Collected Automatically</h3>
          <p className="mb-4">
            When visitors interact with websites using our tracking script, we automatically collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP addresses (anonymized)</li>
            <li>Browser type and version</li>
            <li>Device type and screen size</li>
            <li>Operating system</li>
            <li>Referral sources</li>
            <li>Pages visited and time spent</li>
            <li>Click events and interactions (Coming Soon)</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-blue-700 mb-3">Account Information</h3>
          <p className="mb-4">
            When you create an account with WebTracker, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>Website URL(s)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for various purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our service</li>
            <li>To provide analytics data to website owners</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To improve our service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Data Retention</h2>
          <p className="mb-4">
            We retain user data for as long as your account is active or as needed to provide you with our services. We will retain and use your information to comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>
          <p className="mb-4">
            Website visitor data is retained according to the plan selected by the website owner:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Free Plan: Lifetime</li>
            
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Cookie Policy</h2>
          <p className="mb-4">
            WebTracker is designed to be privacy-focused and does not use traditional cookies for tracking. Instead, we use anonymous session identifiers that do not store personally identifiable information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Your Data Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access the data we have about you</li>
            <li>Right to correction of inaccurate data</li>
            <li>Right to deletion of your data</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing of your data</li>
          </ul>
          <p className="mb-4">
            To exercise any of these rights, please contact us at avikm744@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Children&apos;s Privacy</h2>
          <p className="mb-4">
            Our service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>By email: avikm744@gmail.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
}