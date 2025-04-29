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


export default function TermsAndConditions() {
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
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">Last Updated: April 26, 2025</p>
      </div>

      <div className="prose prose-blue max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Introduction</h2>
          <p className="mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of WebTracker (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a web analytics service.
          </p>
          <p className="mb-4">
            By using WebTracker, you agree to these Terms. If you disagree with any part of the Terms, you may not access our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          <p className="mb-4">
            You agree to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. We may not be held liable for any loss or damage arising from your failure to comply with this obligation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Service Usage</h2>
          <p className="mb-4">
            Our service is provided &quot;as is&quot; and &quot;as available.&quot; You agree to use WebTracker at your own risk.
          </p>
          <p className="mb-4">
            You agree not to use the service:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any &quot;junk mail,&quot; &quot;chain letter,&quot; or &quot;spam&quot;</li>
            <li>To impersonate or attempt to impersonate WebTracker, a WebTracker employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Intellectual Property</h2>
          <p className="mb-4">
            The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of WebTracker and its licensors.
          </p>
          <p className="mb-4">
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of WebTracker.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Data Collection</h2>
          <p className="mb-4">
            By using WebTracker, you agree that we collect anonymous usage data from visitors to websites that implement our tracking script. This data is used to provide analytics to website owners.
          </p>
          <p className="mb-4">
            You agree to inform your website visitors about the use of WebTracker through your own Privacy Policy and, where required by law, obtain any necessary consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Subscription and Billing</h2>
          <p className="mb-4">
            Some features of WebTracker are billed on a subscription basis. You will be billed in advance on a recurring basis, depending on the subscription plan you select.
          </p>
          <p className="mb-4">
            You may cancel your subscription at any time. Upon cancellation, your subscription will remain active until the end of the current billing period.
          </p>
          <p className="mb-4">
            Refunds are provided at our discretion and may be issued for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Significant service outages</li>
            <li>Billing errors</li>
            <li>Other circumstances evaluated on a case-by-case basis</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
          </p>
          <p className="mb-4">
            Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service or contact us to request account deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall WebTracker, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Disclaimer</h2>
          <p className="mb-4">
            Your use of the service is at your sole risk. The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The service is provided without warranties of any kind, whether express or implied.
          </p>
          <p className="mb-4">
            WebTracker does not warrant that the service will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions.
          </p>
          <p className="mb-4">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice prior to any new terms taking effect.
          </p>
          <p className="mb-4">
            By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>By email: avikm744@gmail.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
}