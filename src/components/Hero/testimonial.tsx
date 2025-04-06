"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  delay?: number
}

export function TestimonialCard({ quote, author, role, delay = 0 }: TestimonialCardProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0, 
          x: -50,
          rotateY: -10
        },
        visible: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          transition: {
            duration: 0.8,
            delay: delay,
            ease: "easeOut"
          }
        }
      }}
      className={cn(
        "group relative overflow-hidden",
        "rounded-xl border bg-gradient-to-br from-background via-background/50 to-background/90",
        "p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "dark:from-background/50 dark:via-blue-950/10 dark:to-background"
      )}
    >
      {/* Quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-4xl font-serif text-primary/20"
      >
        <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
          &ldquo;
        </span>
        
        <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
          &rdquo;
        </span>
      </motion.div>

      {/* Quote text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="mt-2 text-muted-foreground italic relative z-10"
      >
        {quote}
      </motion.p>

      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="mt-4 pt-4 border-t border-border relative z-10"
      >
        <p className="font-medium tracking-tight">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </motion.div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/5 dark:via-blue-400/5 dark:to-transparent" />
      
      {/* Animated border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 dark:from-blue-500/40 dark:via-blue-400/60 dark:to-blue-500/40"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}