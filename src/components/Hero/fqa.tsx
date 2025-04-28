"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

function FAQItem({ question, answer, index }: FAQItemProps) {
    const [ref] = useInView({
      triggerOnce: true,
      threshold: 0.1
    })
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.15,
          ease: "easeOut",
        }}
        className={cn(
          "relative group rounded-lg border-[0.5px]",
          "transition-all duration-300 ease-in-out",
          "border-blue-200 dark:border-blue-950",
          "hover:shadow-lg hover:shadow-blue-500/5",
          isOpen
            ? "bg-gradient-to-br from-blue-50/50 via-white to-white dark:from-blue-900/60 dark:via-neutral-900 dark:to-neutral-900"
            : "hover:bg-blue-50/50 dark:hover:bg-blue-900/40"
        )}
      >
        <div
          className={cn(
            "rounded-lg p-4",
            "transition-all duration-300",
            isOpen && "shadow-lg",
            "bg-white/80 dark:bg-neutral-900/80"
          )}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex w-full items-center justify-between",
              "text-left font-semibold text-blue-900 dark:text-blue-200"
            )}
          >
            <span>{question}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-blue-500 dark:text-blue-300 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </button>
  
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }
  

interface FAQSectionProps {
  faqs: Omit<FAQItemProps, "index">[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-16 w-full">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto mt-12 p-6 rounded-lg text-center bg-blue-50/50 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-800"
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4 bg-blue-100 dark:bg-blue-800">
            <Mail className="h-4 w-4 text-blue-500 dark:text-blue-300" />
          </div>
          <p className="text-sm font-medium mb-1 text-gray-900 dark:text-blue-100">Still have questions?</p>
          <p className="text-xs text-gray-600 dark:text-blue-200 mb-4">We&apos;re here to help you</p>
          <Button 
            variant="default"
            onClick={() => window.location.href = "mailto:avikm744@gmail.com"}
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  )
}