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
      {/* Floating Navigation Orbs */}
      <div className="fixed top-0 left-0 w-full h-32 z-50">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 cursor-pointer"
            initial={{ x: 100 + i * 200, y: 20 }}
            animate={{
              y: [20, 40, 20],
              x: 100 + i * 200 + Math.sin(Date.now() / 1000 + i) * 20,
            }}
            transition={{
              y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gold/20 to-burgundy/20 backdrop-blur-sm border border-cream/10" />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at center, rgba(139, 115, 85, ${0.3 + i * 0.1}), transparent)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

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

            {/* Maya Chen Logo */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-2xl font-display font-thin tracking-widest text-cream/50">
                MAYA CHEN
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}