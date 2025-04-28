"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.95
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 20,
        scale: 0.95
      }}
      transition={{ 
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-gradient-to-b from-background to-background/50",
        "p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "border-blue-100 dark:border-blue-900 from-blue-50/80 to-blue-50/20 dark:from-blue-900/80 dark:to-blue-900/20",
        "hover:bg-blue-50/50 hover:border-blue-200 dark:hover:bg-blue-950/50 dark:hover:border-blue-800"
      )}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 0.4,
            delay: delay + 0.3,
            ease: "easeInOut"
          }}
          className="mb-4 text-blue-500 dark:text-blue-200"
        >
          {icon}
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="text-xl font-semibold tracking-tight text-blue-900 dark:text-blue-200"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="mt-2 text-blue-600/80 leading-relaxed dark:text-blue-200/80"
        >
          {description}
        </motion.p>
      </div>

      {/* Animated border gradient */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 via-blue-400/50 to-blue-500"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}