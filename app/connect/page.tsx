'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Connect() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  })
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const sessionTypes = ['Portrait', 'Family', 'Creative', 'Editorial']

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-16 px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        onMouseMove={handleMouseMove}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              x: useTransform(mouseX, [0, window.innerWidth], [0, 30 * (i + 1)]),
              y: useTransform(mouseY, [0, window.innerHeight], [0, 30 * (i + 1)]),
              left: `${20 * i}%`,
              top: `${20 * i}%`,
              background: `radial-gradient(circle, rgba(139, 115, 85, 0.1), transparent)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-thin tracking-widest text-cream mb-4">
            LET&apos;S CONNECT
          </h1>
          <p className="text-xl text-cream/70 font-light">
            Every great story begins with a conversation
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Left Column - Form Fields */}
          <div className="space-y-8">
            {/* Name Field */}
            <motion.div
              className="relative"
              onHoverStart={() => setHoveredField('name')}
              onHoverEnd={() => setHoveredField(null)}
            >
              <motion.input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-cream/30 text-cream py-4 px-2 focus:outline-none focus:border-cream transition-colors duration-300 text-lg"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: hoveredField === 'name' || formData.name ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="relative"
              onHoverStart={() => setHoveredField('email')}
              onHoverEnd={() => setHoveredField(null)}
            >
              <motion.input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-cream/30 text-cream py-4 px-2 focus:outline-none focus:border-cream transition-colors duration-300 text-lg"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: hoveredField === 'email' || formData.email ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Session Type */}
            <div>
              <p className="text-cream/70 mb-4">Session Type</p>
              <div className="grid grid-cols-2 gap-4">
                {sessionTypes.map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`py-3 px-6 border rounded-full transition-all duration-300 ${
                      formData.type === type
                        ? 'border-cream bg-cream text-charcoal'
                        : 'border-cream/30 text-cream hover:border-cream/60'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Message */}
          <div>
            <motion.div
              className="relative h-full"
              onHoverStart={() => setHoveredField('message')}
              onHoverEnd={() => setHoveredField(null)}
            >
              <motion.textarea
                placeholder="Tell me about your vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full h-64 bg-transparent border-2 border-cream/30 rounded-lg text-cream p-6 focus:outline-none focus:border-cream transition-colors duration-300 text-lg resize-none"
                whileFocus={{ scale: 1.02 }}
                style={{
                  borderRadius: hoveredField === 'message' 
                    ? '30% 70% 70% 30% / 30% 30% 70% 70%' 
                    : '1rem',
                }}
                animate={{
                  borderRadius: formData.message 
                    ? ['1rem', '30% 70% 70% 30% / 30% 30% 70% 70%', '1rem']
                    : '1rem',
                }}
                transition={{
                  duration: 8,
                  repeat: formData.message ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="mt-8 w-full py-4 border-2 border-cream/30 text-cream font-display tracking-wider magnetic hover:bg-cream hover:text-charcoal transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderRadius: '20px',
              }}
              animate={{
                borderRadius: ['20px', '50% 50% 30% 70% / 60% 40% 60% 40%', '20px'],
              }}
              transition={{
                borderRadius: {
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              SEND MESSAGE
            </motion.button>
          </div>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="mt-24 grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <h3 className="text-cream/70 mb-2">Location</h3>
            <p className="text-cream font-light">Connecticut, USA</p>
          </div>
          <div>
            <h3 className="text-cream/70 mb-2">Email</h3>
            <p className="text-cream font-light">hello@mayachen.com</p>
          </div>
          <div>
            <h3 className="text-cream/70 mb-2">Social</h3>
            <p className="text-cream font-light">@mayachenphotography</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}