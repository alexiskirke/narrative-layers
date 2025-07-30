'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SimpleHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [titleAnimation, setTitleAnimation] = useState(false)
  const [taglineAnimation, setTaglineAnimation] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
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
        <div className="flex flex-col gap-6 justify-center items-center">
          {/* Logline Generator Link */}
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-10 py-4 text-lg font-semibold text-white overflow-hidden rounded-full cursor-pointer no-underline"
            style={{
              background: 'rgba(102, 126, 234, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 25px rgba(102, 126, 234, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(102, 126, 234, 0.4)',
              transform: 'translateZ(0)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.25)'
              e.currentTarget.style.boxShadow = '0 8px 35px rgba(102, 126, 234, 0.7), inset 0 0 25px rgba(255, 255, 255, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.15)'
              e.currentTarget.style.boxShadow = '0 0 25px rgba(102, 126, 234, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="relative z-10">Login / Register</span>
          </button>
          
          {/* Contact Link */}
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

      {/* Beautiful Modal for Logline Generator */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: 'blur(20px)' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="absolute inset-0 bg-black/60"
            style={{
              background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)'
            }}
          />
          
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-md w-full mx-4 p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false)
                setFormData({ email: '', password: '', confirmPassword: '', name: '' })
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              style={{ fontSize: '20px' }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <h2 
                className="text-3xl font-bold mb-6"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
{isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                {isLogin 
                  ? 'Sign in to your narrative layers account' 
                  : 'Create your narrative layers account'
                }
              </p>
              
              <div className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                    style={{
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                )}
                
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)',

                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)'
                  }}
                  autoFocus
                />
                
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)',

                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)'
                  }}
                />
                
                {!isLogin && (
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm Password"
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                    style={{
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                )}
                
                {/* Error/Success Message */}
                {authMessage && (
                  <div 
                    className={`px-4 py-3 rounded-2xl text-center text-sm font-medium mb-4 ${
                      authMessage.type === 'success' 
                        ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                        : 'bg-red-500/20 border border-red-400/30 text-red-300'
                    }`}
                  >
                    {authMessage.text}
                  </div>
                )}
                
                <button
                  onClick={async () => {
                    setIsLoading(true)
                    setAuthMessage(null)
                    
                    try {
                      const response = await fetch('/api/auth', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          action: isLogin ? 'login' : 'register',
                          ...formData
                        })
                      })
                      
                      const result = await response.json()
                      
                      if (result.success) {
                        setAuthMessage({ type: 'success', text: result.message })
                        // Close modal after a brief delay to show success message
                        setTimeout(() => {
                          setShowModal(false)
                          setFormData({ email: '', password: '', confirmPassword: '', name: '' })
                          setAuthMessage(null)
                        }, 2000)
                      } else {
                        setAuthMessage({ type: 'error', text: result.error })
                      }
                    } catch (error) {
                      setAuthMessage({ type: 'error', text: 'Network error. Please try again.' })
                    } finally {
                      setIsLoading(false)
                    }
                  }}
                  disabled={isLoading}
                  className="w-full px-6 py-4 rounded-2xl font-medium text-white transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading 
                      ? 'rgba(102, 126, 234, 0.5)' 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
{isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
                
                <div className="flex items-center justify-center mt-6">
                  <div className="h-px bg-white/20 flex-1"></div>
                  <span className="px-4 text-gray-400 text-sm">or</span>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
                
                <button
                  onClick={async () => {
                    setIsLogin(!isLogin)
                    setFormData({ email: '', password: '', confirmPassword: '', name: '' })
                  }}
                  className="w-full px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200 mt-4"
                >
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #667eea, #764ba2)'
              }}
            />
            <div 
              className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-15 blur-2xl"
              style={{
                background: 'radial-gradient(circle, #f093fb, #ff006e)'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )

  if (!mounted) {
    return staticVersion
  }

  // Enhanced version with Framer Motion
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {staticVersion}
      </motion.div>
      
      {/* Modal for mounted version */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: 'blur(20px)' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="absolute inset-0 bg-black/60"
            style={{
              background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)'
            }}
          />
          
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-md w-full mx-4 p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false)
                setFormData({ email: '', password: '', confirmPassword: '', name: '' })
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              style={{ fontSize: '20px' }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <h2 
                className="text-3xl font-bold mb-6"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
{isLogin ? 'Welcome Back' : 'Join Us'}
              </h2>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                {isLogin 
                  ? 'Sign in to your narrative layers account' 
                  : 'Create your narrative layers account'
                }
              </p>
              
              <div className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                    style={{
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                )}
                
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)',

                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)'
                  }}
                  autoFocus
                />
                
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password"
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                  style={{
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)',

                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.border = '1px solid rgba(102, 126, 234, 0.3)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)'
                  }}
                />
                
                {!isLogin && (
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm Password"
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                    style={{
                      fontSize: '16px',
                      boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                )}
                
                {/* Error/Success Message */}
                {authMessage && (
                  <div 
                    className={`px-4 py-3 rounded-2xl text-center text-sm font-medium mb-4 ${
                      authMessage.type === 'success' 
                        ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                        : 'bg-red-500/20 border border-red-400/30 text-red-300'
                    }`}
                  >
                    {authMessage.text}
                  </div>
                )}
                
                <button
                  onClick={async () => {
                    setIsLoading(true)
                    setAuthMessage(null)
                    
                    try {
                      const response = await fetch('/api/auth', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          action: isLogin ? 'login' : 'register',
                          ...formData
                        })
                      })
                      
                      const result = await response.json()
                      
                      if (result.success) {
                        setAuthMessage({ type: 'success', text: result.message })
                        // Close modal after a brief delay to show success message
                        setTimeout(() => {
                          setShowModal(false)
                          setFormData({ email: '', password: '', confirmPassword: '', name: '' })
                          setAuthMessage(null)
                        }, 2000)
                      } else {
                        setAuthMessage({ type: 'error', text: result.error })
                      }
                    } catch (error) {
                      setAuthMessage({ type: 'error', text: 'Network error. Please try again.' })
                    } finally {
                      setIsLoading(false)
                    }
                  }}
                  disabled={isLoading}
                  className="w-full px-6 py-4 rounded-2xl font-medium text-white transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading 
                      ? 'rgba(102, 126, 234, 0.5)' 
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
{isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
                
                <div className="flex items-center justify-center mt-6">
                  <div className="h-px bg-white/20 flex-1"></div>
                  <span className="px-4 text-gray-400 text-sm">or</span>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
                
                <button
                  onClick={async () => {
                    setIsLogin(!isLogin)
                    setFormData({ email: '', password: '', confirmPassword: '', name: '' })
                  }}
                  className="w-full px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200 mt-4"
                >
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div 
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #667eea, #764ba2)'
              }}
            />
            <div 
              className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-15 blur-2xl"
              style={{
                background: 'radial-gradient(circle, #f093fb, #ff006e)'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  )
} 