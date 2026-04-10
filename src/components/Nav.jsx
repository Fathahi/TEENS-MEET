import { useState, useEffect, useCallback, useMemo } from 'react'
import { smoothScrollTo } from '../utils/smoothScroll'
import { getImagePath } from '../utils/imagePath'
import GradualBlur from './GradualBlur'

const SECTIONS = ['home', 'about', 'schedule', 'guests', 'register', 'invite', 'sio']
const SCROLL_OFFSET = 100

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    smoothScrollTo(sectionId, 80)
  }, [])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET

      for (const section of SECTIONS) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e) => {
      if (!e.target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const navLinks = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'guests', label: 'Guests' },
    { id: 'register', label: 'Register' },
    { id: 'invite', label: 'Invite' },
    { id: 'sio', label: 'Organizers' },
  ], [])

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 w-full z-[100000] bg-white/80 backdrop-blur-md border-b border-emerald-100" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Left */}
          <a
            href="#home"
            className="flex flex-col focus:outline-none leading-none"
            aria-label="Go to home section"
          >
            <span className="text-2xl font-display font-black text-emerald-600 tracking-tighter uppercase">TEENS MEET </span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em] mt-0.5"></span>
          </a>

          {/* Navigation Links - Center (Flex grow to handle space) */}
          <div className="flex-1 hidden min-[1100px]:flex justify-center gap-6 items-center text-[13px] font-semibold text-emerald-900/70">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`hover:text-emerald-600 transition-colors focus:outline-none px-1 whitespace-nowrap ${activeSection === link.id ? 'text-emerald-600' : ''
                  }`}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Navigation Links - Reduced display for mid-size screens */}
          <div className="flex-1 flex min-[1100px]:hidden justify-center gap-4 items-center text-[12px] font-semibold text-emerald-900/60">
             {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`hover:text-emerald-600 transition-colors focus:outline-none whitespace-nowrap ${activeSection === link.id ? 'text-emerald-600' : ''
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Right */}
          <div className="flex items-center gap-4">
            <a
              href="#invite"
              onClick={(e) => handleNavClick(e, 'invite')}
              className="hidden min-[1100px]:flex h-11 items-center px-6 rounded-xl border-2 border-emerald-400/20 text-emerald-600 font-bold text-sm hover:bg-emerald-50 transition-all focus:outline-none"
              aria-label="Invite friends to Teens Meet 2026"
            >
              Invite Friends
            </a>
            <a
              href="#register"
              onClick={(e) => handleNavClick(e, 'register')}
              className="btn-primary h-11 flex items-center px-8 rounded-xl font-bold tracking-wide focus:outline-none shadow-lg shadow-emerald-500/20"
              aria-label="Register for Teens Meet 2026"
            >
              Register Now
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Header - Visible by default, hidden on large screens */}
      <nav className="lg:hidden fixed top-0 w-full z-[100000] bg-white/90 backdrop-blur-md border-b border-emerald-100" role="navigation" aria-label="Mobile navigation">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex flex-col focus:outline-none leading-none"
            aria-label="Go to home section"
          >
            <span className="text-lg font-display font-black text-emerald-600 tracking-tighter uppercase">TEENS MEET

            </span>
          </a>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="#register"
              onClick={(e) => handleNavClick(e, 'register')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm"
            >
              Register
            </a>
            <a
              href="#invite"
              onClick={(e) => handleNavClick(e, 'invite')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100"
            >
              Invite
            </a>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`burger ml-2 relative z-[100002] focus:outline-none ${isMenuOpen ? 'active' : ''}`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Move outside nav to prevent clipping */}
      <div
        className={`fixed inset-0 bg-emerald-500/10/20 backdrop-blur-sm transition-opacity duration-300 z-[100000] ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Slide Panel - Use h-[100dvh] and move outside nav */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-80 max-w-[85vw] bg-white backdrop-blur-xl border-l border-emerald-100 shadow-2xl z-[100001] transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="px-8 py-20 flex flex-col gap-6 h-full overflow-y-auto">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-xl font-bold transition-colors focus:outline-none py-2 ${activeSection === link.id ? 'text-emerald-600' : 'text-emerald-950 hover:text-emerald-600'
                }`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleNavClick(e, 'register')}
            className="btn-primary-white font-bold tracking-wide focus:outline-none text-center mt-6 shadow-xl shadow-emerald-500/20"
            aria-label="Register for Teens Meet 2026"
          >
            Register Now
          </a>
        </div>
      </div>
    </>
  )
}

export default Nav

