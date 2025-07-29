'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SimpleHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [titleAnimation, setTitleAnimation] = useState(false)
  const [taglineAnimation, setTaglineAnimation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate deterministic particles for both server and client
  const particles = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: (i * 7.3) % 100,
    y: (i * 11.7) % 100,
    size: (i % 6) + 2,
    speed: (i % 3) + 1,
    opacity: ((i % 10) * 0.08) + 0.1,
    color: ['#667eea', '#764ba2', '#f093fb', '#ff006e', '#8338ec'][i % 5]
  }))

  const staticVersion = (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
             style={{
         backgroundImage: `
           radial-gradient(circle at ${mounted ? mousePosition.x : 50}% ${mounted ? mousePosition.y : 50}%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
           linear-gradient(-45deg, #000000, #1a1a2e, #16213e, #0f3460, #1a1a2e),
           linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%)
         `,
         backgroundSize: '400% 400%, 100% 100%, 100% 100%',
         animation: 'gradientShift 8s ease-in-out infinite'
       }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              animation: `float ${particle.speed * 3}s ease-in-out infinite ${particle.id * 0.1}s`,
              transform: `translateZ(0)`,
            }}
          />
        ))}
      </div>

             {/* Floating Orbs */}
       <div className="absolute inset-0">
         <div 
           className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
           style={{
             background: 'radial-gradient(circle, #667eea, #764ba2)',
             left: '20%',
             top: '30%',
             animation: 'morphing 12s ease-in-out infinite, float 8s ease-in-out infinite'
           }}
         />
         <div 
           className="absolute w-64 h-64 rounded-full blur-2xl opacity-40"
           style={{
             background: 'radial-gradient(circle, #f093fb, #ff006e)',
             right: '15%',
             bottom: '25%',
             animation: 'morphing 10s ease-in-out infinite reverse, float 6s ease-in-out infinite 2s'
           }}
         />
         <div 
           className="absolute w-48 h-48 rounded-full blur-xl opacity-25"
           style={{
             background: 'radial-gradient(circle, #8338ec, #667eea)',
             left: '60%',
             top: '70%',
             animation: 'morphing 15s ease-in-out infinite, float 10s ease-in-out infinite 4s'
           }}
         />
       </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
                 {/* Title with 3D Effect */}
         <div className="space-y-4 mb-12">
           <h1 
             className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none cursor-pointer select-none"
             onClick={() => {
               setTitleAnimation(true)
               setTimeout(() => setTitleAnimation(false), 1000)
             }}
             style={{
               backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ff006e 75%, #8338ec 100%)`,
               backgroundSize: '300% 300%',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               filter: 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.6))',
               animation: 'gradientShift 4s ease-in-out infinite, textGlow 2s ease-in-out infinite alternate',
               transform: 'perspective(1000px) rotateX(10deg)',
             }}
           >
             {mounted ? (
               "narrative layers".split('').map((letter, index) => (
                 <motion.span
                   key={index}
                   className="inline-block"
                   animate={titleAnimation ? {
                     scale: 1.2,
                     rotate: (Math.random() - 0.5) * 90,
                   } : {
                     scale: 1,
                     rotate: 0,
                   }}
                   transition={{
                     duration: 0.3,
                     delay: index * 0.05,
                     type: "spring",
                     stiffness: 200,
                     damping: 15
                   }}
                 >
                   {letter === ' ' ? '\u00A0' : letter}
                 </motion.span>
               ))
             ) : (
               "narrative layers"
             )}
           </h1>
         </div>
        
                 {/* Subtitle with glow */}
         <div className="mb-16">
           <p 
             className="text-3xl md:text-5xl font-bold tracking-wide cursor-pointer select-none"
             onClick={() => {
               setTaglineAnimation(true)
               setTimeout(() => setTaglineAnimation(false), 1200)
             }}
           >
             {mounted ? (
               "story.will.change.the.world".split('.').map((word, wordIndex) => (
                 <motion.span
                   key={wordIndex}
                   className="inline-block"
                   animate={taglineAnimation ? {
                     scale: 1.1,
                     rotateX: 15,
                   } : {
                     scale: 1,
                     rotateX: 0,
                   }}
                   transition={{
                     duration: 0.4,
                     delay: wordIndex * 0.1,
                     type: "spring",
                     stiffness: 300,
                     damping: 20
                   }}
                   style={{
                     backgroundImage: taglineAnimation 
                       ? `linear-gradient(45deg, ${['#ff006e', '#8338ec', '#667eea', '#f093fb'][wordIndex % 4]}, ${['#8338ec', '#667eea', '#f093fb', '#ff006e'][wordIndex % 4]})`
                       : 'linear-gradient(45deg, #ff006e, #8338ec)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     filter: taglineAnimation 
                       ? `drop-shadow(0 0 15px ${['rgba(255, 0, 110, 0.8)', 'rgba(131, 56, 236, 0.8)', 'rgba(102, 126, 234, 0.8)', 'rgba(240, 147, 251, 0.8)'][wordIndex % 4]})`
                       : 'drop-shadow(0 0 10px rgba(255, 0, 110, 0.5))'
                   }}
                 >
                   {word}
                   {wordIndex < 4 && (
                     <span style={{ 
                       backgroundImage: 'linear-gradient(45deg, #ff006e, #8338ec)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent',
                     }}>.</span>
                   )}
                 </motion.span>
               ))
             ) : (
               <span style={{
                 backgroundImage: 'linear-gradient(45deg, #ff006e, #8338ec)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0 0 10px rgba(255, 0, 110, 0.5))',
                 animation: 'pulseGlow 2s ease-in-out infinite'
               }}>
                 story.will.change.the.world
               </span>
             )}
           </p>
         </div>
        
                 {/* Interactive Buttons */}
         <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
           <div
             className="relative px-12 py-6 text-xl font-bold text-transparent rounded-full"
             style={{
               background: 'transparent',
               border: '2px solid transparent'
             }}
           >
             {/* Empty button space */}
           </div>
           
           <a
             href="mailto:hello@narrativelayers.com"
             className="group relative px-12 py-6 text-xl font-bold text-white overflow-hidden rounded-full no-underline"
             style={{
               background: 'rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(10px)',
               boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)',
               border: '2px solid rgba(255, 255, 255, 0.3)',
               transform: 'translateZ(0)',
               transition: 'all 0.3s ease',
               textDecoration: 'none'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'
               e.currentTarget.style.background = 'rgba(240, 147, 251, 0.2)'
               e.currentTarget.style.boxShadow = '0 10px 40px rgba(240, 147, 251, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)'
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0) scale(1)'
               e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
               e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)'
             }}
           >
             <span className="relative z-10">Contact</span>
           </a>
         </div>
      </div>

             {/* Interactive Light Following Mouse */}
       {mounted && (
         <div
           className="absolute pointer-events-none rounded-full blur-3xl opacity-20"
           style={{
             width: '400px',
             height: '400px',
             background: 'radial-gradient(circle, #667eea, transparent)',
             left: `${mousePosition.x}%`,
             top: `${mousePosition.y}%`,
             transform: 'translate(-50%, -50%)',
             transition: 'all 0.3s ease-out'
           }}
         />
       )}
    </div>
  )

  if (!mounted) {
    return staticVersion
  }

  // Enhanced version with Framer Motion
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {staticVersion}
    </motion.div>
  )
} 