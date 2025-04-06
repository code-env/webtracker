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
        "dark:border-blue-900/30 dark:from-blue-950/80 dark:to-blue-950/20",
        "dark:hover:bg-blue-900/20 dark:hover:border-blue-700/40"
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
          className="mb-4 text-primary dark:text-blue-300"
        >
          {icon}
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="text-xl font-semibold tracking-tight dark:text-blue-50"
        >
          {title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="mt-2 text-muted-foreground leading-relaxed dark:text-blue-300/90"
        >
          {description}
        </motion.p>
      </div>

      {/* Animated border gradient */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/50 to-primary dark:from-blue-400 dark:via-blue-300/50 dark:to-blue-400"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-400/20 dark:via-blue-300/5 dark:to-transparent" />
    </motion.div>
  )
}