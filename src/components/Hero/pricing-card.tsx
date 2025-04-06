"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  delay?: number
  ctaText?: string
}

export function PricingCard({ 
  name, 
  price, 
  description, 
  features, 
  popular, 
  delay = 0,
  ctaText = "Get Started" 
}: PricingCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-xl border bg-background p-8",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        popular && "border-blue-400/50 bg-blue-50 shadow-sm"
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="flex items-baseline"
        >
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground ml-1">/mo</span>}
        </motion.div>

        {/* Features */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
          className="space-y-3 mt-6"
        >
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          className="mt-8"
        >
          <Button 
            className={cn(
              "w-full",
              popular 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "border-blue-300 hover:bg-blue-50"
            )}
            variant={popular ? "default" : "outline"}
          >
            {ctaText}
          </Button>
        </motion.div>
      </div>

      {/* Animated border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-400/40 via-blue-500/60 to-blue-400/40"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}