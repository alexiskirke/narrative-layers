'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { generateParticles } from '@/lib/utils'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only generate particles on client side to avoid hydration mismatch
    setParticles(generateParticles(100))
    
    // Safety fallback: ensure content is visible after 3 seconds
    const fallbackTimer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]')
      hiddenElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.classList.add('fallback-visible')
        }
      })
    }, 3000)
    
    return () => clearTimeout(fallbackTimer)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  const words = ['narrative', 'layers']
  
  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cosmic animate-gradient"
      suppressHydrationWarning={true}
    >
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {particles.length > 0 && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
                         animate={{
               y: [0, -100, 0],
               x: [0, (particle.id % 2 === 0 ? 1 : -1) * 50, 0],
               scale: [1, 1.5, 1],
             }}
            transition={{
              duration: particle.speed * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-ethereal rounded-full opacity-20 blur-3xl animate-morphing"
        style={{ x, y }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />
      
      <motion.div
        className="absolute w-64 h-64 bg-aurora rounded-full opacity-30 blur-2xl animate-morphing"
        style={{ 
          x: useSpring(mouseX, { ...springConfig, damping: 40 }), 
          y: useSpring(mouseY, { ...springConfig, damping: 40 })
        }}
        animate={{
          scale: [1.2, 0.8, 1.2],
          rotate: -360,
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Morphing Text */}
        <div className="space-y-4 mb-8">
          {words.map((word, wordIndex) => (
            <div key={word} className="flex justify-center space-x-2">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  custom={wordIndex * word.length + letterIndex}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-6xl md:text-8xl lg:text-9xl font-space font-bold text-gradient lowercase tracking-tight"
                  style={{
                    textShadow: '0 0 40px rgba(102, 126, 234, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: '#00ffff',
                    textShadow: '0 0 40px #00ffff',
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          experience the intersection of art, technology, and narrative.
          <br />
          <span className="text-gradient font-medium">
            where stories come alive through motion.
          </span>
        </motion.p>

        {/* Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-semibold tracking-wide overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Enter the Experience</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
              }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 glass rounded-full text-white font-semibold tracking-wide border-2 border-transparent magnetic"
            whileHover={{ 
              borderColor: '#667eea',
              boxShadow: '0 0 30px rgba(102, 126, 234, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
} 