'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorEffects() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // Create all springs at top level to avoid conditional hook calls
  const trailXSpring = useSpring(cursorX, { damping: 30, stiffness: 200 })
  const trailYSpring = useSpring(cursorY, { damping: 30, stiffness: 200 })
  const textXSpring = useSpring(cursorX, { damping: 20, stiffness: 300 })
  const textYSpring = useSpring(cursorY, { damping: 20, stiffness: 300 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('magnetic')) {
        setIsHovering(true)
        setCursorText(target.dataset.cursor || '')
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')
    }

    window.addEventListener('mousemove', moveCursor)
    
    // Add event listeners to magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic')
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      magneticElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-40"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl"
          animate={{
            scale: isHovering ? 1.2 : 0.8,
            opacity: isHovering ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Cursor Text */}
      {cursorText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 text-white font-medium px-3 py-1 bg-black/80 rounded-full text-sm"
          style={{
            x: textXSpring,
            y: textYSpring,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  )
} 