'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const featuredProjects = [
  {
    title: 'Ethereal Portraits',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
  {
    title: 'Urban Stories',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1617638924571-92d272ce9338?w=800&q=80',
  },
  {
    title: 'Family Moments',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1606216265946-61fe4a1d3b84?w=800&q=80',
  },
]

export default function FeaturedWork() {
  return (
    <section className="min-h-screen bg-ink py-32 px-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-display font-thin text-cream mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-cream/60 font-light">
            A glimpse into recent visual stories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href="/gallery">
                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative h-[500px]"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={project.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                    >
                      <div>
                        <motion.p
                          className="text-gold text-sm mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {project.category}
                        </motion.p>
                        <motion.h3
                          className="text-cream text-3xl font-display font-light"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Liquid border effect on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-cream/20 pointer-events-none"
                    initial={{ borderRadius: '0px' }}
                    whileHover={{
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/gallery">
            <motion.span
              className="inline-block px-12 py-4 border border-cream/30 text-cream font-display tracking-wider hover:bg-cream hover:text-charcoal transition-colors duration-300 magnetic"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW ALL WORK
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}