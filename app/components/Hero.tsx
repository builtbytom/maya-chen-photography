'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const images = [
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Portrait 1' },
  { src: 'https://images.unsplash.com/photo-1617638924571-92d272ce9338?w=800&q=80', alt: 'Portrait 2' },
  { src: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80', alt: 'Portrait 3' },
  { src: 'https://images.unsplash.com/photo-1606216265946-61fe4a1d3b84?w=800&q=80', alt: 'Portrait 4' },
  { src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80', alt: 'Portrait 5' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Pre-calculate transforms for all images
  const rotationTransform = useTransform(springX, [-500, 500], [-15, 15])
  const xTransforms = images.map((_, index) => 
    useTransform(springX, (x) => x * (0.1 + index * 0.05))
  )
  const yTransforms = images.map((_, index) => 
    useTransform(springY, (y) => y * (0.1 + index * 0.05))
  )
  const titleXTransform = useTransform(springX, (x) => x * -0.02)
  const titleYTransform = useTransform(springY, (y) => y * -0.02)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Cinematic fade overlay */}
      <div className="cinematic-fade" />

      {/* Floating images that follow cursor */}
      {images.map((image, index) => {
        const scale = index === activeIndex ? 1 : 0.8
        const opacity = index === activeIndex ? 1 : 0.3
        const zIndex = index === activeIndex ? 10 : index

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              x: xTransforms[index],
              y: yTransforms[index],
              rotate: rotationTransform,
              left: `${20 + index * 15}%`,
              top: `${10 + (index % 2) * 20}%`,
              zIndex,
            }}
            animate={{
              scale,
              opacity,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              className="relative overflow-hidden liquid-container"
              whileHover={{ scale: 1.05 }}
              style={{
                width: '300px',
                height: '400px',
                borderRadius: index === activeIndex ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '20px',
              }}
              animate={{
                borderRadius: index === activeIndex 
                  ? ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
                  : '20px',
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Title with parallax effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"
        style={{
          x: titleXTransform,
          y: titleYTransform,
        }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-display font-thin tracking-widest text-cream mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          MAYA CHEN
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-display font-extralight tracking-wide text-cream/70"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Visual Storyteller
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cream/30 rounded-full p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-cream/50 rounded-full mx-auto"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}