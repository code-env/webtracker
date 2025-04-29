import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  comingSoon?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  comingSoon = false
}: FeatureCardProps) {
  const [ ref, inView ] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98
      }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {
        opacity: 0,
        y: 20,
        scale: 0.98
      }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: 'easeOut'
      }}
      className={cn(
        'group relative overflow-hidden rounded-lg',
        'p-6 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-0.5',
        'border border-border/50 dark:border-border/30',
        'bg-card dark:bg-card/90 backdrop-blur-sm'
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-indigo-500/80" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-primary dark:text-primary flex-shrink-0 text-xl">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-foreground">
              {title}
            </h3>
            {comingSoon && (
              <Badge
                variant="outline"
                className="text-sm font-medium bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400 border-violet-500/20 dark:border-violet-400/20"
              >
                Coming Soon
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>
      </div>

    </motion.div>
  )
}
