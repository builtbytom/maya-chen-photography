'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-8xl md:text-9xl font-display font-thin text-cream mb-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          404
        </motion.h1>
        <p className="text-2xl text-cream/70 mb-8">This page exists only in another dimension</p>
        <Link href="/">
          <motion.span
            className="inline-block px-8 py-3 border border-cream/30 text-cream font-display tracking-wider hover:bg-cream hover:text-charcoal transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RETURN HOME
          </motion.span>
        </Link>
      </motion.div>
    </div>
  )
}