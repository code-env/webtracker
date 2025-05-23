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
        "rounded-xl border bg-gradient-to-br from-blue-50 via-white to-blue-50",
        "p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1"
      )}
    >
      {/* Quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-4xl font-serif text-blue-300"
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
        className="mt-2 text-gray-600 italic relative z-10"
      >
        {quote}
      </motion.p>

      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="mt-4 pt-4 border-t border-blue-100 relative z-10"
      >
        <p className="font-medium tracking-tight text-blue-900">{author}</p>
        <p className="text-sm text-blue-600">{role}</p>
      </motion.div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Animated border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}