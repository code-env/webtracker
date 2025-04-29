import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [ mounted, setMounted ] = useState(false)

  useEffect(
    () => {
      setMounted(true)
    },
    []
  )

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full w-9 h-9 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme === 'dark' ? 'dark' : 'light'}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-5 w-5 text-blue-300" />
          ) : (
            <Sun className="h-5 w-5 text-blue-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
