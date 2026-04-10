import { useReveal } from '../hooks/useReveal'
import { useEffect, useRef, useState, useMemo } from 'react'
import { throttleRAF } from '../utils/throttle'
import { motion, useMotionValue } from 'framer-motion'

const DRAG_BUFFER = 50
const VELOCITY_THRESHOLD = 500
const GAP = 16
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 }

const Sessions = () => {
  const headerRef = useReveal()
  const containerRef = useRef(null)
  const [itemWidth, setItemWidth] = useState(280)
  const [position, setPosition] = useState(0)
  const x = useMotionValue(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const sessions = useMemo(() => [
    {
      title: 'Islamic Identity',
      description: 'Balancing faith and modern education. Staying grounded in your values while excelling in a rapidly changing world.',
      tag: 'Identity',
      gradient: 'from-emerald-600 to-teal-700',
    },
    {
      title: 'The Art of Career Selection',
      description: 'Beyond the usual Engineering and Medicine. Explore emerging fields and find where your passion meets the world\'s needs.',
      tag: 'Career',
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      title: 'Social Responsibility',
      description: 'Understanding your role in the community. Learn how you can contribute to social justice and community building.',
      tag: 'Social',
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      title: 'Mental Well-being',
      description: 'Building resilience for college life. Practical tools for managing stress and maintaining mental health in a competitive world.',
      tag: 'Wellness',
      gradient: 'from-green-500 to-emerald-600',
    },
  ], [])

  // Update item width on resize
  useEffect(() => {
    const updateWidth = throttleRAF(() => {
      if (containerRef.current && window.innerWidth < 768) {
        const containerWidth = containerRef.current.offsetWidth
        setItemWidth(containerWidth - 48)
      }
    })
    updateWidth()
    window.addEventListener('resize', updateWidth, { passive: true })
    return () => {
      updateWidth.cancel()
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  const trackItemOffset = itemWidth + GAP

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info
    const direction = offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1 : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1 : 0
    if (direction === 0) return
    setPosition(prev => Math.max(0, Math.min(prev + direction, sessions.length - 1)))
  }

  const dragConstraints = { left: -trackItemOffset * Math.max(sessions.length - 1, 0), right: 0 }
  const canGoPrev = position > 0
  const canGoNext = position < sessions.length - 1

  return (
    <section id="sessions" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
      
      <div ref={headerRef} className="text-center mb-16 reveal">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-emerald-950 text-center mx-auto">Featured Sessions</h2>
        <p className="text-emerald-900/60 max-w-2xl mx-auto text-lg font-medium">Learn from the Visionaries. Our sessions are led by renowned scholars and youth icons.</p>
      </div>

      {/* Mobile: Carousel */}
      <div ref={containerRef} className="block md:hidden relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          drag="x"
          dragConstraints={dragConstraints}
          animate={{ x: -(position * trackItemOffset) }}
          transition={SPRING_OPTIONS}
          onDragEnd={handleDragEnd}
        >
          {sessions.map((session, index) => (
            <div key={index} style={{ width: itemWidth, flexShrink: 0 }}>
              <SessionCard session={session} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {sessions.map((session, index) => (
          <SessionCard key={index} session={session} />
        ))}
      </div>
    </section>
  )
}

const SessionCard = ({ session }) => {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal pro-card p-8 rounded-[2.5rem] bg-white border-emerald-100 shadow-xl shadow-emerald-500/5 group hover:border-emerald-300 transition-all duration-500 h-full flex flex-col">
      <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${session.gradient} mb-6`}></div>
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">{session.tag}</span>
      <h3 className="text-2xl font-bold mb-4 text-emerald-950 group-hover:text-emerald-600 transition-colors leading-tight">{session.title}</h3>
      <p className="text-emerald-900/60 text-base leading-relaxed group-hover:text-emerald-900/80 transition-colors">{session.description}</p>
    </div>
  )
}

export default Sessions

