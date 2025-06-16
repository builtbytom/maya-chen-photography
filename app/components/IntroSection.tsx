'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.2 }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))

    return () => {
      reveals?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen bg-charcoal flex items-center justify-center px-8 py-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-thin text-cream mb-8">
            Every Frame<br />Tells A Story
          </h2>
          <p className="text-xl text-cream/70 font-light leading-relaxed">
            Connecticut-based photographer specializing in capturing authentic moments 
            through moody, cinematic imagery. From intimate portraits to creative 
            storytelling, each photograph is crafted with intention and artistry.
          </p>
        </motion.div>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="relative overflow-hidden"
            style={{
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%'
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt=""
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/20 to-transparent" />
          </motion.div>
          
          {/* Floating accent */}
          <motion.div
            className="absolute -bottom-16 -right-16 w-48 h-48 bg-gold/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}