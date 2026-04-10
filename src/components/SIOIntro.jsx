import { useReveal } from '../hooks/useReveal'

const SIOIntro = () => {
  const headerRef = useReveal()
  const contentRef = useReveal()

  return (
    <section id="sio" className="py-24 px-6 relative overflow-hidden bg-emerald-950">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center mb-16">

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Know the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Organizers</span>
          </h2>
          <p className="text-emerald-300/70 text-lg max-w-xl mx-auto">
            Students Islamic Organisation of India
          </p>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="reveal delay-[100ms] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Description */}
          <div className="space-y-6">
            <p className="text-emerald-100/80 text-lg leading-relaxed">
              <span className="text-white font-bold">SIO of India</span> is a pan-India student organisation committed to the intellectual, moral, and spiritual development of Muslim youth. Founded on the principles of Islam, SIO works to build a generation of confident, knowledgeable, and socially responsible leaders.
            </p>
            <p className="text-emerald-100/80 text-lg leading-relaxed">
              Through programs like <span className="text-emerald-300 font-semibold">Teens Meet</span>, SIO reaches thousands of students at critical turning points in their lives — equipping them with Islamic wisdom, academic clarity, and the vision to make a difference.
            </p>
            <a
              href="https://sioindia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              Learn More About SIO
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '1982', label: 'Founded' },
              { value: '28+', label: 'States' },
              { value: '100K+', label: 'Members' },
              { value: '40+', label: 'Years of Service' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.value}</p>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SIOIntro
