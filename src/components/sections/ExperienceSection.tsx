'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'

function FloatingGeometry() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[-2, 0, 0]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2, 1, -1]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#06b6d4" />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={3} floatIntensity={1}>
        <mesh position={[0, -1, 1]}>
          <torusGeometry args={[0.4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </Float>
      
      <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[1, 0.5, 0.5]}>
          <dodecahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </Float>
    </group>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const experiences = [
    {
      title: "Visual Narratives",
      description: "Immersive storytelling through motion graphics and interactive elements that respond to your presence.",
      icon: "🎨"
    },
    {
      title: "Spatial Computing",
      description: "Three-dimensional interfaces that blur the line between digital and physical reality.",
      icon: "🌐"
    },
    {
      title: "Emotional Design",
      description: "Color palettes and animations that evoke specific feelings and create lasting memories.",
      icon: "💫"
    },
    {
      title: "Future Interfaces",
      description: "Next-generation user experiences that anticipate needs and adapt to behavior patterns.",
      icon: "🚀"
    }
  ]

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="grid grid-cols-12 gap-4 h-full"
          style={{
            background: `
              linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px),
              linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 container mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-space font-bold text-gradient mb-6">
            EXPERIENCES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dive into a world where technology meets artistry, where every interaction
            tells a story, and where the impossible becomes beautifully tangible.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <div className="h-96 mb-16 rounded-2xl overflow-hidden glass">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            
            <FloatingGeometry />
            
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
              className="group"
            >
              <div className="glass-dark rounded-2xl p-8 h-full magnetic transition-all duration-300 hover:scale-105">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {experience.icon}
                </motion.div>
                
                <h3 className="text-2xl font-space font-semibold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {experience.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {experience.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <motion.div
                key={step}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse-glow" />
                {index < 4 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    className="absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-gray-400 mt-6"
          >
            Your journey through the narrative layers begins here
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
} 