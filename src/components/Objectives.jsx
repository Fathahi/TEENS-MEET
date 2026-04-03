import React from 'react'
import { useReveal } from '../hooks/useReveal'

const About = () => {
  const sectionRef = useReveal()

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      title: 'Mentorship',
      description: 'Learn from prominent scholars and educators who provide deep insights into both academic and moral growth.',
      color: 'emerald'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Networking',
      description: 'Connect with 600+ motivated peers from different campuses, building a community of future leaders.',
      color: 'teal'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Guidance',
      description: 'Participate in specialized sessions focused on career paths, personality development, and moral clarity.',
      color: 'green'
    },
  ]

  const colorClasses = {
    emerald: 'bg-emerald-100 border-emerald-200 text-emerald-600',
    teal: 'bg-teal-100 border-teal-200 text-teal-600',
    green: 'bg-green-100 border-green-200 text-green-600',
  }

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-teal-500/5 blur-[100px] rounded-full -z-10"></div>

      <div ref={sectionRef} className="text-center mb-20 reveal">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-emerald-950">Why Teens Meet?</h2>
        <p className="text-emerald-900/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          The transition from school to campus life is a turning point. Teens Meet is designed to provide 10th-grade graduates with the moral grounding, academic clarity, and leadership skills needed for the next chapter of their lives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <AboutCard key={index} feature={feature} colorClasses={colorClasses} delay={index * 100} />
        ))}
      </div>
    </section>
  )
}

const AboutCard = React.memo(({ feature, colorClasses, delay }) => {
  const ref = useReveal()

  return (
    <div ref={ref} className={`pro-card p-10 rounded-[2.5rem] reveal delay-[${delay}ms] hover:border-emerald-300 transition-all duration-500 bg-white shadow-xl shadow-emerald-500/5 group`}>
      <div className={`w-16 h-16 rounded-2xl ${colorClasses[feature.color]} flex items-center justify-center border-2 mb-8 group-hover:scale-110 group-hover:shadow-emerald-500/20 transition-all duration-300`}>
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-emerald-950 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
      <p className="text-emerald-900/60 text-base leading-relaxed group-hover:text-emerald-900/80 transition-colors">{feature.description}</p>
    </div>
  )
})

AboutCard.displayName = 'AboutCard'

export default About

