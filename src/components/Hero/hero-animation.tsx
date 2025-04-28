"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const HeroAnimation = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Tailwind color classes for light/dark mode
  const statColors = [
    'text-emerald-500 dark:text-emerald-400',
    'text-sky-600 dark:text-sky-400',
    'text-violet-500 dark:text-violet-400',
  ];

  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-xl border shadow-xl overflow-hidden bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700"
      >
        {/* Dashboard Header */}
        <div className="p-2 sm:p-4 border-b bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100">
              WebTracker Dashboard
            </div>
            <div className="w-8 sm:w-16" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-2 sm:p-4">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4">
            {[
              { label: "Visitors", value: "1,234" },
              { label: "Page Views", value: "5,678" },
              { label: "Avg. Time", value: "2m 45s" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="rounded-lg p-2 sm:p-3 border bg-white dark:bg-neutral-900 shadow-sm border-gray-200 dark:border-neutral-700"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                <div className={`text-lg sm:text-xl font-bold ${statColors[i]}`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-lg p-2 sm:p-3 border bg-white dark:bg-neutral-900 mb-4 h-[140px] sm:h-[180px] shadow-sm border-gray-200 dark:border-neutral-700"
          >
            <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Visitors Over Time</div>
            <div className="h-[100px] sm:h-[140px] w-full">
              <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M0,80 C20,70 40,90 60,80 C80,70 100,50 120,60 C140,70 160,30 180,20 C200,10 220,30 240,40 C260,50 280,20 300,10"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                  d="M0,90 C20,80 40,70 60,65 C80,60 100,70 120,75 C140,80 160,60 180,50 C200,40 220,60 240,70 C260,80 280,50 300,40"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="rounded-lg p-2 sm:p-3 border bg-white dark:bg-neutral-900 shadow-sm border-gray-200 dark:border-neutral-700"
          >
            <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Top Pages</div>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              {[
                { page: "/home", views: "543" },
                { page: "/products", views: "421" },
                { page: "/about", views: "287" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className={`flex justify-between items-center p-2 rounded-md ${i % 2 === 0 ? 'bg-gray-50 dark:bg-neutral-800' : 'bg-gray-100 dark:bg-neutral-700'} text-gray-700 dark:text-gray-200`}
                >
                  <div>{item.page}</div>
                  <div className="text-gray-500 dark:text-gray-400">{item.views} views</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Dots */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 6 + 2
        const x = Math.random() * 100
        const y = Math.random() * 100
        const delay = Math.random() * 5

        // Pick color for dot
        const bgClass = i % 3 === 0
          ? 'bg-emerald-500 dark:bg-emerald-400'
          : i % 3 === 1
          ? 'bg-sky-600 dark:bg-sky-400'
          : 'bg-violet-500 dark:bg-violet-400'

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-60 ${bgClass}`}
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

export default HeroAnimation