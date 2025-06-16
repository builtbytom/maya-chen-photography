'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { path: '/', label: 'Stories', image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=400&q=80' },
  { path: '/gallery', label: 'Gallery', image: 'https://images.unsplash.com/photo-1606216265946-61fe4a1d3b84?w=400&q=80' },
  { path: '/process', label: 'Process', image: 'https://images.unsplash.com/photo-1617638924571-92d272ce9338?w=400&q=80' },
  { path: '/connect', label: 'Connect', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Pre-calculate transforms
  const xTransform = useTransform(mouseX, [0, 1920], [-10, 10])
  const yTransform = useTransform(mouseY, [0, 1080], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Logo - Always Visible */}
      <Link href="/">
        <motion.div
          className="fixed top-8 left-8 z-50 text-cream"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-2xl font-display font-thin tracking-widest">
            MAYA CHEN
          </h1>
          <p className="text-xs tracking-wider text-cream/60 mt-1">PHOTOGRAPHY</p>
        </motion.div>
      </Link>

      {/* Navigation Toggle Button */}
      <motion.button
        className="fixed top-8 right-8 z-50 w-16 h-16 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-burgundy/30 backdrop-blur-sm border border-cream/20"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-[2px] bg-cream relative"
              animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
            >
              <motion.div
                className="absolute w-8 h-[2px] bg-cream"
                animate={isOpen ? { rotate: 90, y: 0 } : { rotate: 0, y: -8 }}
              />
              <motion.div
                className="absolute w-8 h-[2px] bg-cream"
                animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 8 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Navigation Hint (shows on first visit) */}
      <motion.div
        className="fixed top-8 right-32 z-40 text-cream/60 text-sm tracking-wider"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        exit={{ opacity: 0 }}
      >
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: 3 }}
        >
          MENU
        </motion.span>
      </motion.div>

      {/* Full Screen Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-8 right-8 text-cream text-4xl magnetic"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3 }}
            >
              ×
            </motion.button>

            {/* Navigation Items */}
            <div className="h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    className="relative group"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <Link href={item.path} onClick={() => setIsOpen(false)}>
                      <motion.div
                        className="relative overflow-hidden rounded-lg"
                        whileHover={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Background Image */}
                        <motion.div
                          className="absolute inset-0 z-0"
                          animate={{
                            scale: hoveredIndex === index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-charcoal/70" />
                        </motion.div>

                        {/* Text */}
                        <div className="relative z-10 p-24 text-center">
                          <motion.h3
                            className="text-5xl font-display font-light text-cream magnetic"
                            style={{
                              x: xTransform,
                              y: yTransform,
                            }}
                          >
                            {item.label}
                          </motion.h3>
                        </div>

                        {/* Liquid overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-gold/20 to-burgundy/20"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredIndex === index ? 1 : 0,
                          }}
                          style={{
                            borderRadius: hoveredIndex === index ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '0%',
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}