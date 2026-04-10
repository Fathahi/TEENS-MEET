import { memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const Stats = () => {
  const ref = useReveal()

  const stats = [
    { value: '2,000+', label: 'Delegates' },
    { value: '50+', label: 'Guests' },
    { value: '20+', label: 'Programs' },
    { value: '05+', label: 'Stages' },
  ]

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-6 mb-32 reveal" aria-label="Event statistics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </section>
  )
}

const StatCard = memo(({ stat }) => (
  <div className="pro-card p-6 md:p-10 rounded-3xl text-center group hover:bg-emerald-500/5 transition-all duration-500 border-white/5">
    <p 
      className="text-5xl md:text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-500 font-outfit tracking-tighter" 
      aria-label={stat.value}
    >
      {stat.value}
    </p>
    <p className="text-[10px] md:text-xs text-emerald-400 uppercase tracking-[0.2em] font-black opacity-70 group-hover:opacity-100 transition-all">
      {stat.label}
    </p>
  </div>
))

StatCard.displayName = 'StatCard'

export default Stats

