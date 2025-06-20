'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const images = [
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80' },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Pre-calculate transforms for all images
  const rotationTransform = useTransform(springX, [-500, 500], [-15, 15])
  const xTransform0 = useTransform(springX, (x) => x * 0.1)
  const xTransform1 = useTransform(springX, (x) => x * 0.15)
  const xTransform2 = useTransform(springX, (x) => x * 0.2)
  const xTransform3 = useTransform(springX, (x) => x * 0.25)
  const xTransform4 = useTransform(springX, (x) => x * 0.3)
  const yTransform0 = useTransform(springY, (y) => y * 0.1)
  const yTransform1 = useTransform(springY, (y) => y * 0.15)
  const yTransform2 = useTransform(springY, (y) => y * 0.2)
  const yTransform3 = useTransform(springY, (y) => y * 0.25)
  const yTransform4 = useTransform(springY, (y) => y * 0.3)
  const xTransforms = [xTransform0, xTransform1, xTransform2, xTransform3, xTransform4]
  const yTransforms = [yTransform0, yTransform1, yTransform2, yTransform3, yTransform4]
  const titleXTransform = useTransform(springX, (x) => x * -0.02)
  const titleYTransform = useTransform(springY, (y) => y * -0.02)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY, isMobile])

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
        
        // Mobile positioning: vertical stack with slight offset
        const mobilePosition = {
          left: `${10 + (index % 2) * 60}%`,
          top: `${15 + index * 15}%`,
        }
        
        // Desktop positioning: spread horizontally
        const desktopPosition = {
          left: `${20 + index * 15}%`,
          top: `${10 + (index % 2) * 20}%`,
        }
        
        const position = isMobile ? mobilePosition : desktopPosition

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              x: isMobile ? 0 : xTransforms[index],
              y: isMobile ? 0 : yTransforms[index],
              rotate: isMobile ? 0 : rotationTransform,
              ...position,
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
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              style={{
                width: isMobile ? '150px' : '300px',
                height: isMobile ? '200px' : '400px',
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
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Title with parallax effect */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-20 left-1/2 transform -translate-x-1/2' : 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'} text-center z-20`}
        style={{
          x: isMobile ? 0 : titleXTransform,
          y: isMobile ? 0 : titleYTransform,
        }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-display font-thin tracking-widest text-cream mb-2 md:mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          MAYA CHEN
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-display font-extralight tracking-wide text-cream/70"
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