import React from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

const Hero = () => {
  const contentRef = useReveal()
  const bgImage = '/main/teensmeet.png'

  return (
    <header id="home" className="relative min-h-screen flex items-end justify-center overflow-hidden pb-10 md:pb-16">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <img
            src={bgImage}
            alt="Teens Meet 2026"
            className="w-full h-full object-cover object-center"
          />
          {/* Enhanced readability overlays */}
          <div className="absolute inset-0 bg-emerald-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-transparent to-emerald-950/90"></div>
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <motion.div
          ref={contentRef}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="reveal"
        >
          {/* Location Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-md text-[10px] md:text-xs font-bold text-emerald-100 mb-6 hover:bg-emerald-500/20 transition-all duration-300 uppercase tracking-[0.2em]">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Kozhikode District &bull; May 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="font-outfit font-black text-5xl sm:text-7xl md:text-9xl lg:text-[9rem] tracking-tighter leading-none text-white uppercase mb-2 drop-shadow-2xl">
            TEENS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400">
              MEET
            </span>
          </h1>
          <p className="text-emerald-300 font-outfit font-bold text-lg md:text-xl tracking-[0.3em] uppercase mb-4">
            2026
          </p>

          {/* Stats Bar */}
          <div className="hero-stats flex flex-nowrap justify-center gap-3 sm:gap-8 md:gap-16 mb-10 px-2 w-full">
            <div className="stat text-center flex-1 min-w-0">
              <div className="stat-number text-2xl sm:text-5xl md:text-6xl font-extrabold text-white mb-0.5 tracking-tighter font-outfit">
                600+
              </div>
              <div className="stat-label text-emerald-400 text-[9px] md:text-xs font-black uppercase tracking-[0.15em] opacity-80">
                Students
              </div>
            </div>
            <div className="stat text-center flex-1 min-w-0 border-x border-white/10 px-2 sm:px-8 md:px-16">
              <div className="stat-number text-2xl sm:text-5xl md:text-6xl font-extrabold text-white mb-0.5 tracking-tighter font-outfit">
                100+
              </div>
              <div className="stat-label text-emerald-400 text-[9px] md:text-xs font-black uppercase tracking-[0.15em] opacity-80">
                Guests
              </div>
            </div>
            <div className="stat text-center flex-1 min-w-0 border-r border-white/10 pr-2 sm:pr-8 md:pr-16">
              <div className="stat-number text-2xl sm:text-5xl md:text-6xl font-extrabold text-white mb-0.5 tracking-tighter font-outfit">
                60+
              </div>
              <div className="stat-label text-emerald-400 text-[9px] md:text-xs font-black uppercase tracking-[0.15em] opacity-80">
                Mentors
              </div>
            </div>
            <div className="stat text-center flex-1 min-w-0">
              <div className="stat-number text-2xl sm:text-5xl md:text-6xl font-extrabold text-white mb-0.5 tracking-tighter font-outfit">
                6
              </div>
              <div className="stat-label text-emerald-400 text-[9px] md:text-xs font-black uppercase tracking-[0.15em] opacity-80">
                Places
              </div>
            </div>
          </div>

          {/* Subheader */}
          <p className="text-lg md:text-xl text-emerald-50/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            A program for 10th-grade graduates combining Islamic values with academic and life guidance. 
            Register with 600+ peers for a life-changing experience.
          </p>

          {/* CTAs - Optimized Horizontal Layout: [Schedule] [Register] [Invite] */}
          <div className="flex flex-row flex-nowrap justify-center gap-1.5 md:gap-5 mt-6 md:mt-12">
            <a
              href="#schedule"
              className="px-2 md:px-8 py-2.5 md:py-5 rounded-lg md:rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all text-[9px] md:text-lg font-bold text-white/80 hover:-translate-y-1 active:scale-95 text-center flex-1"
            >
              View Schedule
            </a>
            <a
              href="#register"
              className="px-2 md:px-12 py-2.5 md:py-5 rounded-lg md:rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[9px] md:text-lg transition-all duration-300 shadow-xl md:shadow-2xl shadow-emerald-500/20 md:shadow-emerald-500/30 hover:-translate-y-1 active:scale-95 text-center flex-1"
            >
              Register Now
            </a>
            <a
              href="#invite"
              className="px-2 md:px-12 py-2.5 md:py-5 rounded-lg md:rounded-2xl border-2 border-emerald-400/50 bg-emerald-500/10 backdrop-blur-md hover:bg-emerald-500/20 hover:border-emerald-400 transition-all text-[9px] md:text-lg font-bold text-emerald-50 shadow-lg md:shadow-xl hover:-translate-y-1 active:scale-95 text-center flex-1"
            >
              Invite Friends
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-emerald-400/50 to-transparent"></div>
      </motion.div>
    </header>
  )
}

export default Hero
