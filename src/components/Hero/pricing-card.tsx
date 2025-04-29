import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
        "relative rounded-lg overflow-visible transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1 group",
        "flex flex-col h-full",
        popular ?
          "border-2 border-primary pt-6" :
          "border border-border/50 dark:border-border/30",
        "bg-card/90 dark:bg-card/90 backdrop-blur-sm"
      )}
    >
      <div className={cn(
        "absolute inset-0 -z-10 transition-opacity duration-300 rounded-lg",
        popular ?
          "bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-100" :
          "bg-gradient-to-b from-secondary/80 to-transparent dark:from-secondary/30 dark:to-transparent opacity-80 group-hover:opacity-100"
      )}/>

      {popular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-indigo-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          className="space-y-1 mb-4"
        >
          <h3 className={cn(
            "text-xl font-bold",
            popular ? "text-primary" : "text-foreground"
          )}>
            {name}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="flex items-baseline mb-6"
        >
          <span className={cn(
            "text-3xl font-extrabold",
            popular ? "text-primary" : "text-foreground"
          )}>
            {price}
          </span>
          {price !== "Free" && (
            <span className="text-muted-foreground ml-1.5 text-sm">/month</span>
          )}
        </motion.div>

        <div className="border-t border-border/50 dark:border-border/30 mb-6"></div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
          className="space-y-3 mb-8 flex-1"
        >
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: delay + 0.3 + (i * 0.1) }}
              className="flex items-start gap-3"
            >
              <span className={cn(
                "flex-shrink-0 rounded-full p-1 mt-0.5",
                popular ?
                  "bg-primary/10 dark:bg-primary/20" :
                  "bg-secondary dark:bg-secondary/50"
              )}>
                <Check className={cn(
                  "h-3.5 w-3.5",
                  popular ?
                    "text-primary" :
                    "text-foreground/70"
                )} />
              </span>
              <span className={cn(
                "text-sm",
                popular ?
                  "text-foreground" :
                  "text-muted-foreground"
              )}>
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          className="mt-auto"
        >
          <Link href="/auth" className="block">
            <Button
              className={cn(
                "w-full py-5 font-medium btn-pulse",
                popular ?
                  "bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 text-white shadow-md" :
                  "bg-card dark:bg-card border border-border dark:border-border text-foreground hover:bg-secondary dark:hover:bg-secondary"
              )}
              variant={popular ? "default" : "outline"}
              size="lg"
            >
              {ctaText}
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300",
        popular ?
          "bg-gradient-to-r from-primary via-indigo-500 to-primary" :
          "bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/50 to-muted-foreground/30"
      )} />
    </motion.div>
  )
}
