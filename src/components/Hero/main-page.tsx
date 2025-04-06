'use client';

import Link from "next/link"
import { motion } from "framer-motion"


import { ArrowRight, CheckCircle2, LineChart, MousePointer, Clock, PieChart, Zap, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import HeroAnimation from "./hero-animation"
import { FeatureCard } from "./feature-card";
import { TestimonialCard } from "./testimonial";
import { PricingCard } from "./pricing-card";
import { FAQSection } from "./fqa";

const Features = [
    {
        icon: <LineChart className="h-10 w-10 text-primary" />,
        title: "Real-time Analytics",
        description: "See visitor activity as it happens with live updates and no delay."
    },
    {
        icon: <MousePointer className="h-10 w-10 text-primary" />,
        title: "Click Tracking",
        description: "Understand exactly what elements visitors interact with on your site."
    },
    {
        icon: <Clock className="h-10 w-10 text-primary" />,
        title: "Session Duration",
        description: "Track how long visitors stay on your site and which pages keep them engaged."
    },
    {
        icon: <PieChart className="h-10 w-10 text-primary" />,
        title: "Traffic Sources",
        description: "Identify where your visitors are coming from to optimize marketing efforts."
    },
    {
        icon: <Zap className="h-10 w-10 text-primary" />,
        title: "Performance Metrics",
        description: "Monitor page load times and other performance indicators."
    },
    {
        icon: <Lock className="h-10 w-10 text-primary" />,
        title: "Privacy Focused",
        description: "Collect data without compromising visitor privacy or using cookies."
    }
]

const testimonials = [
    {
      quote: "WebTracker has transformed how we understand our users. The real-time analytics are a game-changer.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp"
    },
    {
      quote: "The privacy-focused approach and powerful features make this the perfect analytics solution for us.",
      author: "Michael Chen",
      role: "CEO at StartupX"
    },
    {
      quote: "Setup was incredibly easy and the insights we get are invaluable. Highly recommended!",
      author: "Emily Brown",
      role: "Developer at WebFlow"
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
        price: "Free",
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
      answer: "Our platform stands out through its intuitive design, powerful automation capabilities, and seamless integration options. We've focused on creating a user experience that combines simplicity with advanced features.",
    },
    {
      question: "How does the pricing structure work?",
      answer: "We offer flexible, transparent pricing tiers designed to scale with your needs. Each tier includes a core set of features, with additional capabilities as you move up. All plans start with a 14-day free trial.",
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide comprehensive support through multiple channels. This includes 24/7 live chat, detailed documentation, video tutorials, and dedicated account managers for enterprise clients.",
    },
    {
      question: "How can I get started?",
      answer: "You can get started by signing up for a free trial. Once you've signed up, you'll have access to our platform's full range of features. You can also contact our support team for assistance.",
    },
  ];
  

export default function HeroSection() {
  return (
    <main className="flex px-8">
      <section className="container py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 dark:bg-[radial-gradient(45%_25%_at_50%_50%,#1e3a8a_0%,transparent_100%)] bg-[radial-gradient(45%_25%_at_50%_50%,#d1fae5_0%,transparent_100%)] opacity-20 dark:opacity-30"
        ></div>

        <div className="grid gap-6 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-2" variant="outline">
                <span className="text-emerald-600 mr-1">✓</span> 100% Free
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-blue-900 dark:text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Powerful Analytics <br />
              <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">Without the Price Tag</span>
            </motion.h1>

            <motion.p
              className="max-w-[600px] text-blue-800 md:text-xl dark:text-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Track visitor behavior, understand your audience, and make data-driven decisions with our free, privacy-focused web analytics platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg">
                <Link href="/auth/register">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">See Features</Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-2" />
              <span>Privacy-focused</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-2" />
              <span>Unlimited websites</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full h-[400px] lg:h-[500px] bg-gradient-to-t from-blue-100 via-blue-50 to-white dark:from-blue-900 dark:via-blue-800 dark:to-blue-950 rounded-lg p-6"
            >
              <HeroAnimation />
            </motion.div>
          </div>

        

        </div>
        <section className="container py-12 md:py-24 lg:py-32">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-100">
                Features that Make a Difference
            </h2>
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

        <section className="py-20" id="testimonials">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-100">
          Loved by Developers
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              {...testimonial}
              delay={i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="py-20" id="pricing">
  <div className="container">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-100">Simple, Transparent Pricing</h2>
      <p className="text-blue-800 max-w-[600px] mx-auto dark:text-blue-200">
        Choose the plan that best fits your needs. All plans include core analytics features.
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
    <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-100">
      Frequently Asked Questions
    </h2>
   
    <FAQSection faqs={faqData} />
     
    
  </div>
</section>

      </section>
    </main>
  )
}
