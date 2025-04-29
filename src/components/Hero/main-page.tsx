'use client';

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, LineChart, MousePointer, Clock, PieChart, Zap, Lock, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroAnimation } from "./hero-animation"
import { FeatureCard } from "./feature-card";
import { PricingCard } from "./pricing-card";
import { FAQSection } from "./fqa";

const Features = [
  {
    icon: <PieChart className="h-10 w-10" />,
    title: "Traffic Sources",
    description: "Identify where your visitors are coming from to optimize marketing efforts."
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Performance Metrics",
    description: "Monitor page load times and other performance indicators."
  },
  {
    icon: <Lock className="h-10 w-10" />,
    title: "Privacy Focused",
    description: "Collect data without compromising visitor privacy or using cookies."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "Real-time Analytics",
    description: "See visitor activity as it happens with live updates and no delay.",
    comingSoon: true
  },
  {
    icon: <MousePointer className="h-10 w-10" />,
    title: "Click Tracking",
    description: "Understand exactly what elements visitors interact with on your site.",
    comingSoon: true
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Session Duration",
    description: "Track how long visitors stay on your site and which pages keep them engaged.",
    comingSoon: true
  }
]

const pricingPlans = [
  {
    name: "Pro",
    price: "$29",
    description: "Ideal for growing businesses",
    features: [
      "Up to 100,000 pageviews/month",
      "Advanced analytics",
      "30-day data retention",
      "Priority support",
      "Custom reports",
      "API access"
    ],
  },
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal projects",
    features: [
      "Up to 10,000 pageviews/month",
      "Basic analytics dashboard",
      "7-day data retention",
      "Email support",
      "Community access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large scale applications",
    features: [
      "Unlimited pageviews",
      "Advanced analytics",
      "1-year data retention",
      "24/7 phone support",
      "Custom integration",
      "Dedicated account manager"
    ]
  }
]

const faqData = [
  {
    question: "What makes your platform unique?",
    answer: "Our platform stands out through its intuitive design, powerful analytics capabilities, and privacy-first approach. We don't use cookies or collect personally identifiable information, making it fully compliant with regulations like GDPR and CCPA while still providing actionable insights."
  },
  {
    question: "How does the pricing structure work?",
    answer: "We offer transparent, predictable pricing tiers designed to scale with your needs. Each tier includes core analytics features, with additional capabilities as you move up. All plans start with a 14-day free trial with no credit card required. Our Free plan is genuinely free forever with no hidden limitations."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide comprehensive support through multiple channels including detailed documentation, video tutorials, and email support for all plans. Pro and Enterprise plans receive priority support with faster response times, and Enterprise customers get a dedicated account manager."
  },
  {
    question: "How can I get started?",
    answer: "Getting started with WebTracker is simple. Sign up for a free account, add our lightweight tracking script to your website, and you'll start seeing analytics data in your dashboard within minutes. Our setup wizard guides you through the entire process, and our support team is always available to help."
  }
];

export default function HeroSection() {
  return (
    <main className="flex px-8">
      <section className="container py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_100%)] dark:bg-[radial-gradient(45%_25%_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_100%)]"></div>
          <div className="absolute top-0 -right-64 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 -left-64 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-2" variant="outline">
                <span className="text-emerald-500 dark:text-emerald-400"><CheckIcon className="h-4 w-4" /></span> 100% Free
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Powerful Analytics <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Without Price tag</span>
            </motion.h1>

            <motion.p
              className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track visitor behavior, understand your audience, and make informed decisions with our privacy-focused web analytics platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white"
              >
                <Link href="/auth">
                  Start Tracking Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">Explore Features</Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>No cookies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                <span>Unlimited websites</span>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full h-[400px] lg:h-[500px] bg-card rounded-lg p-6 shadow-lg border border-border/50"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>

        <section className="container py-20" id="features">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-2" variant="outline">
              Features
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Analytics That <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Drive Results</span>
            </h2>
            <p className="text-muted-foreground">
              Powerful tools designed to give you accurate insights while respecting user privacy, helping you make data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        <section className="py-20" id="pricing">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-2" variant="outline">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Simple, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Transparent</span> Pricing
              </h2>
              <p className="text-muted-foreground">
                Choose the plan that best fits your needs. All plans include core analytics features with no hidden costs.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {pricingPlans.map((plan, i) => (
                <PricingCard
                  key={i}
                  {...plan}
                  delay={i * 0.2}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" id="faq">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-2" variant="outline">
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Questions</span>
              </h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our platform. If you can&#39;t find what you&#39;re looking for, feel free to reach out.
              </p>
            </div>

            <FAQSection faqs={faqData} />
          </div>
        </section>
      </section>
    </main>
  )
}
