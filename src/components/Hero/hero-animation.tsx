import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const HeroAnimation = () => {
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Tailwind color classes for light/dark mode
  const statColors = [
    'text-emerald-500 dark:text-emerald-400',
    'text-blue-600 dark:text-blue-400',
    'text-violet-500 dark:text-violet-400'
  ]

  return (
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-neutral-900 dark:to-indigo-950 opacity-60"
      ></div>
      <div className="absolute inset-0 overflow-hidden">
        {[ ...Array(5) ].map((_, i) => {
          const colors = [
            'bg-blue-400 dark:bg-blue-600',
            'bg-indigo-400 dark:bg-indigo-600',
            'bg-emerald-400 dark:bg-emerald-600',
            'bg-violet-400 dark:bg-violet-600',
            'bg-sky-400 dark:bg-sky-600'
          ]

          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${colors[i % colors.length]} mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20`}
              style={{
                width: `${Math.random() * 100 + 100}px`,
                height: `${Math.random() * 100 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                x: [ 0, Math.random() * 60 - 30, 0 ],
                y: [ 0, Math.random() * 60 - 30, 0 ]
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm"
      >
        <div
          className="relative w-full h-full flex flex-col bg-white/90 dark:bg-neutral-900/90 border border-gray-200/50 dark:border-neutral-800/50"
        >
          <div
            className="p-3 sm:p-4 border-b bg-gray-50/90 dark:bg-neutral-800/90 border-gray-200/50 dark:border-neutral-700/50 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center">
              <motion.div
                className="mr-2 w-4 h-4 rounded-full"
                transition={{ duration: 2, repeat: Infinity }}
              />
              WebTracker Dashboard
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Visitors Today', value: '1,234', change: '+12.3%' },
                { label: 'Page Views', value: '5,678', change: '+8.7%' },
                { label: 'Avg. Session', value: '2m 45s', change: '+5.2%' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="rounded-lg p-4 border bg-white/90 dark:bg-neutral-800/80 shadow-sm border-gray-200/70 dark:border-neutral-700/70 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                    <div
                      className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full"
                    >
                      {stat.change}
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${statColors[i]}`}>{stat.value}</div>

                  <div className="h-6 mt-2">
                    <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                        d={i === 0 ?
                          'M0,15 C10,12 20,17 30,15 C40,13 50,8 60,10 C70,12 80,5 90,3 L100,3' :
                          i === 1 ?
                            'M0,10 C10,13 20,8 30,7 C40,6 50,12 60,11 C70,10 80,5 90,4 L100,6' :
                            'M0,13 C10,15 20,10 30,8 C40,6 50,10 60,12 C70,14 80,8 90,7 L100,5'}
                        fill="none"
                        stroke={i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#8b5cf6'}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-lg p-3 sm:p-4 border bg-white/90 dark:bg-neutral-800/80 mb-4 shadow-sm border-gray-200/70 dark:border-neutral-700/70"
            >
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-2 xs:mb-3 gap-2">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Website Traffic</div>
                <div className="flex flex-wrap gap-2 xs:gap-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Visitors</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Page Views</span>
                  </div>
                </div>
              </div>

              <div className="h-[120px] xs:h-[130px] w-full relative">
                <div className="absolute inset-0 grid grid-cols-4 xs:grid-cols-7 w-full h-full">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`${i < 4 ? '' : 'hidden xs:block'} border-r border-gray-100 dark:border-neutral-700/50 h-full`}
                    ></div>
                  ))}
                </div>

                <div className="absolute inset-0 grid grid-rows-3 xs:grid-rows-4 w-full h-full">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`${i < 3 ? '' : 'hidden xs:block'} border-t border-gray-100 dark:border-neutral-700/50 w-full`}
                    ></div>
                  ))}
                </div>
                <svg
                  width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" className="relative z-10"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    d="M0,80 C20,70 40,90 60,80 C80,70 100,50 120,60 C140,70 160,30 180,20 C200,10 220,30 240,40 C260,50 280,20 300,10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
                    d="M0,90 C20,80 40,70 60,65 C80,60 100,70 120,75 C140,80 160,60 180,50 C200,40 220,60 240,70 C260,80 280,50 300,40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    strokeDasharray="4,4"
                  />

                  {[ 20, 60, 120, 180, 240, 300 ].map((x, i) => {
                    if (i % 2 !== 0 && i !== 5) {
                      return null
                    }
                    const y = i % 2 === 0 ? 70 : 50
                    return (
                      <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#3b82f6"
                        stroke="#fff"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      />
                    )
                  })}
                </svg>

                <div className="absolute bottom-0 inset-x-0 grid grid-cols-7 text-xs text-gray-500 dark:text-gray-400">
                  {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ].map((day, i) => (
                    <div key={i} className="flex justify-center">
                      {day.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-lg p-3 sm:p-4 border bg-white/90 dark:bg-neutral-800/80 shadow-sm border-gray-200/70 dark:border-neutral-700/70"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Top Pages</div>
                <div
                  className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full"
                >
                  View All
                </div>
              </div>

              <div className="space-y-2 max-w-4xl mx-auto">
                {[
                  { page: '/home', views: '543', increase: true },
                  { page: '/products', views: '421', increase: true },
                  { page: '/about', views: '287', increase: false }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    className="flex flex-col xs:flex-row justify-between p-2 sm:p-3 rounded-lg bg-gray-50/80 dark:bg-neutral-700/50 text-gray-700 dark:text-gray-200"
                  >
                    <div className="flex items-center space-x-2 mb-2 xs:mb-0">
                      <div className="w-1.5 h-8 rounded-sm bg-blue-500"></div>
                      <span
                        className="font-medium truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none"
                      >{item.page}</span>
                    </div>

                    <div className="flex items-center justify-between xs:justify-end xs:space-x-3 pl-4 xs:pl-0">
                      <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-1">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{item.views}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs xs:inline">views</span>
                      </div>

                      <div
                        className={`flex items-center space-x-1 text-xs ${item.increase ? 'text-emerald-500' : 'text-red-500'}`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.increase ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                          />
                        </svg>
                        <span>{item.increase ? '+12%' : '-5%'}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {[ ...Array(12) ].map((_, i) => {
        const size = Math.random() * 5 + 2
        const x = Math.random() * 100
        const y = Math.random() * 100
        const delay = Math.random() * 5

        // Elegant color palette
        const colors = [
          'bg-blue-400 dark:bg-blue-500',
          'bg-indigo-400 dark:bg-indigo-500',
          'bg-violet-400 dark:bg-violet-500',
          'bg-emerald-400 dark:bg-emerald-500',
          'bg-sky-400 dark:bg-sky-500'
        ]

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-60 ${colors[i % colors.length]}`}
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              boxShadow: `0 0 ${size}px 0 ${colors[i % colors.length].replace('bg-', 'rgba(').replace(' ', ', 0.5)')}`
            }}
            animate={{
              y: [ 0, -15, 0 ],
              opacity: [ 0.6, 1, 0.6 ],
              scale: [ 1, 1.2, 1 ]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut'
            }}
          />
        )
      })}
    </div>
  )
}
