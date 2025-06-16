'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', category: 'portrait', title: 'Ethereal Light' },
  { id: 2, src: 'https://images.unsplash.com/photo-1617638924571-92d272ce9338?w=800&q=80', category: 'creative', title: 'Shadow Play' },
  { id: 3, src: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80', category: 'portrait', title: 'Silent Thoughts' },
  { id: 4, src: 'https://images.unsplash.com/photo-1606216265946-61fe4a1d3b84?w=800&q=80', category: 'family', title: 'Tender Moments' },
  { id: 5, src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80', category: 'portrait', title: 'Golden Hour' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', category: 'creative', title: 'Urban Dreams' },
  { id: 7, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', category: 'portrait', title: 'Soft Focus' },
  { id: 8, src: 'https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?w=800&q=80', category: 'family', title: 'Generations' },
  { id: 9, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', category: 'portrait', title: 'Natural Beauty' },
  { id: 10, src: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&q=80', category: 'creative', title: 'Contemplation' },
  { id: 11, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', category: 'portrait', title: 'Vibrant Soul' },
  { id: 12, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', category: 'creative', title: 'Artistic Vision' },
  { id: 13, src: 'https://images.unsplash.com/photo-1511551203524-9a24350a5771?w=800&q=80', category: 'family', title: 'Joy Unfiltered' },
  { id: 14, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', category: 'portrait', title: 'Quiet Strength' },
  { id: 15, src: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80', category: 'creative', title: 'Urban Poetry' },
  { id: 16, src: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&q=80', category: 'family', title: 'Connection' },
  { id: 17, src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80', category: 'portrait', title: 'Bold Expression' },
  { id: 18, src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80', category: 'creative', title: 'Timeless' },
]

const categories = ['all', 'portrait', 'creative', 'family']

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-16 px-8">
      {/* Category Filter */}
      <motion.div 
        className="flex justify-center gap-8 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`text-lg font-display font-light tracking-wide magnetic ${
              selectedCategory === category ? 'text-cream' : 'text-cream/40'
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid with Liquid Motion */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                layout: { type: "spring", stiffness: 300, damping: 30 }
              }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <motion.div
                className="relative overflow-hidden rounded-lg liquid-container"
                whileHover={{ scale: 0.98 }}
                style={{
                  borderRadius: '20px',
                }}
                animate={{
                  borderRadius: ['20px', '60% 40% 30% 70% / 60% 30% 70% 40%', '20px'],
                }}
                transition={{
                  borderRadius: {
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
              >
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-[400px] object-cover liquid-image"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h3 className="text-cream text-xl font-display font-light">{image.title}</h3>
                  <p className="text-cream/60 text-sm mt-1">{image.category}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-cream text-4xl magnetic"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
            <motion.div
              className="relative max-w-5xl max-h-[90vh] mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
                layoutId={`image-${selectedImage.id}`}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-charcoal to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-cream text-3xl font-display font-light">{selectedImage.title}</h2>
                <p className="text-cream/60 text-lg mt-2">{selectedImage.category}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}