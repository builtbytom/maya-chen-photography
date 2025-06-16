'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const processSteps = [
  {
    number: '01',
    title: 'Vision',
    description: 'We begin with understanding your story, your essence, and what makes you unique.',
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=600&q=80',
  },
  {
    number: '02',
    title: 'Creation',
    description: 'Through careful composition and natural light, we capture authentic moments.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
  },
  {
    number: '03',
    title: 'Refinement',
    description: 'Each image is thoughtfully edited to enhance the mood and emotion.',
    image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80',
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'Your visual story comes to life in a beautifully curated collection.',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80',
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Pre-calculate transforms for each process step
  const stepTransform0 = useTransform(scrollYProgress, [0, 0.25], [50, -50])
  const stepTransform1 = useTransform(scrollYProgress, [0.25, 0.5], [50, -50])
  const stepTransform2 = useTransform(scrollYProgress, [0.5, 0.75], [50, -50])
  const stepTransform3 = useTransform(scrollYProgress, [0.75, 1], [50, -50])
  const stepTransforms = [stepTransform0, stepTransform1, stepTransform2, stepTransform3]

  return (
    <div ref={containerRef} className="bg-charcoal">
      {/* Hero Section */}
      <motion.section 
        className="h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-display font-thin tracking-widest text-cream text-center"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          }}
        >
          THE PROCESS
        </motion.h1>
        <motion.div
          className="absolute inset-0 z-[-1]"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 0]),
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-gold/20 via-transparent to-transparent" />
        </motion.div>
      </motion.section>

      {/* Process Steps with Parallax */}
      {processSteps.map((step, index) => (
        <motion.section
          key={step.number}
          className="min-h-screen flex items-center px-8 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              className={`${index % 2 === 1 ? 'md:order-2' : ''}`}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="text-8xl font-display font-thin text-gold/30"
                style={{
                  y: stepTransforms[index],
                }}
              >
                {step.number}
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-cream mt-4 mb-6">
                {step.title}
              </h2>
              <p className="text-xl text-cream/70 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>

            {/* Image with Liquid Effect */}
            <motion.div
              className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 0.98 }}
                style={{
                  borderRadius: index % 2 === 0 
                    ? '60% 40% 30% 70% / 60% 30% 70% 40%' 
                    : '40% 60% 70% 30% / 30% 70% 40% 60%',
                }}
                animate={{
                  borderRadius: index % 2 === 0
                    ? ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
                    : ['40% 60% 70% 30% / 30% 70% 40% 60%', '70% 30% 40% 60% / 60% 40% 30% 70%', '40% 60% 70% 30% / 30% 70% 40% 60%'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/20 to-transparent" />
              </motion.div>
              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* Call to Action */}
      <motion.section
        className="h-screen flex items-center justify-center px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-display font-thin text-cream mb-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to Begin?
          </motion.h2>
          <motion.p
            className="text-xl text-cream/70 mb-12 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Let&apos;s create something beautiful together.
          </motion.p>
          <motion.a
            href="/connect"
            className="inline-block px-12 py-4 border-2 border-cream/30 text-cream font-display tracking-wider magnetic hover:bg-cream hover:text-charcoal transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START YOUR JOURNEY
          </motion.a>
        </div>
      </motion.section>
    </div>
  )
}