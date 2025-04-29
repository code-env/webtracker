import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [ ref ] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      className="overflow-hidden"
    >
      <div
        className={cn(
          'relative group rounded-lg transition-all duration-300',
          'border border-border/50 dark:border-border/30',
          'hover:shadow-md',
          isOpen
            ? 'bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10'
            : 'bg-card/80 dark:bg-card/80 hover:bg-secondary/50 dark:hover:bg-secondary/20'
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-5 text-left"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              'text-lg font-medium transition-colors duration-200',
              isOpen
                ? 'text-primary dark:text-primary-foreground'
                : 'text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-primary-foreground'
            )}
          >
            {question}
          </span>

          <div
            className={cn(
              'flex-shrink-0 ml-4 rounded-full p-2 transition-all duration-300',
              isOpen
                ? 'bg-primary/10 dark:bg-primary/20 rotate-180'
                : 'bg-secondary dark:bg-secondary/50 group-hover:bg-primary/10 dark:group-hover:bg-primary/20'
            )}
          >
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-colors duration-200',
                isOpen
                  ? 'text-primary dark:text-primary-foreground'
                  : 'text-muted-foreground group-hover:text-primary dark:group-hover:text-primary-foreground'
              )}
            />
          </div>
        </button>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-0">
                <div className="border-t border-border/50 dark:border-border/30 mb-4 pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={cn(
            'absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-indigo-500 to-primary',
            'transition-all duration-500 ease-out',
            isOpen ? 'w-full' : 'group-hover:w-full'
          )}
        />
      </div>
    </motion.div>
  )
}

interface FAQSectionProps {
  faqs: Omit<FAQItemProps, 'index'>[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [ ref, inView ] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} index={index} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 p-6 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-border/50 dark:border-border/30 overflow-hidden relative"
      >
        <div className="absolute -z-10 inset-0 opacity-10">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl"
          ></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className="flex items-center justify-center p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground"
            >
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Still have questions?</h3>
              <p className="text-muted-foreground">Our support team is here to help you with any questions you may
                have.</p>
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white shadow-md px-6"
            size="lg"
            onClick={() => window.location.href = 'mailto:support@webtracker.com'}
          >
            <Mail className="h-4 w-4 " />
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
