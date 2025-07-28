'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const galleryItems = [
    { id: 1, title: "Digital Dreams", description: "Exploration of subconscious narratives", color: "from-purple-500 to-pink-500" },
    { id: 2, title: "Temporal Fragments", description: "Time as a visual medium", color: "from-blue-500 to-cyan-500" },
    { id: 3, title: "Neural Networks", description: "AI-generated artistic interpretations", color: "from-green-500 to-teal-500" },
    { id: 4, title: "Quantum Entanglement", description: "Connected realities in motion", color: "from-orange-500 to-red-500" },
    { id: 5, title: "Cosmic Whispers", description: "Messages from distant galaxies", color: "from-indigo-500 to-purple-500" },
    { id: 6, title: "Metamorphosis", description: "Transformation through technology", color: "from-yellow-500 to-orange-500" },
  ]

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-space font-bold text-gradient mb-6">
            GALLERY
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A curated collection of digital narratives, each piece telling its own story
            through the language of motion, color, and form.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative magnetic"
              data-cursor="View"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass">
                {/* Dynamic Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60`}
                  whileHover={{ scale: 1.1, opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated Patterns */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full"
                      style={{
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 23) % 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.h3
                    className="text-2xl font-space font-bold text-white mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-200 text-sm"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-semibold tracking-wide magnetic"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            data-cursor="Click"
          >
            Explore Full Collection
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
} 