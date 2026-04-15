const Footer = () => {
  return (
    <footer id="contact" className="bg-emerald-950 text-white">
      {/* Slogan Section */}
      <div className="py-20 md:py-32 px-6 border-b border-white/5/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight text-emerald-100/20">
            <div className="hover:text-emerald-400 transition-colors duration-500 cursor-default">Explore. Learn.</div>
            <div className="hover:text-emerald-400 transition-colors duration-500 cursor-default">Lead. Succeed.</div>
            <div className="hover:text-emerald-400 transition-colors duration-500 cursor-default">Shape Your Future.</div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Quick Links */}
            <div>
              <h5 className="text-emerald-400 text-sm uppercase tracking-[0.2em] font-bold mb-8">NAVIGATION</h5>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-4 text-emerald-50/60">
                  <li><a href="#home" className="hover:text-emerald-400 transition-all font-medium">Home</a></li>
                  <li><a href="#about" className="hover:text-emerald-400 transition-all font-medium">About</a></li>
                  <li><a href="#schedule" className="hover:text-emerald-400 transition-all font-medium">Schedule</a></li>
                </ul>
                <ul className="space-y-4 text-emerald-50/60">
                  <li><a href="#register" className="hover:text-emerald-400 transition-all font-medium">Register</a></li>
                  <li><a href="#invite" className="hover:text-emerald-400 transition-all font-medium">Invite</a></li>
                  <li><a href="#sio" className="hover:text-emerald-400 transition-all font-medium">Organizers</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg overflow-hidden">
                    <img src="/sio/sio.jpg" alt="SIO Logo" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-2xl font-bold text-white">SIO Kozhikode</p>
                </div>
                <div className="flex items-start gap-3 text-emerald-50/60">
                  <svg className="w-5 h-5 text-emerald-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  </svg>
                  <p className="font-medium">
                    Calicut House, Near District Co-operative Hospital,<br />
                    Eranhipalam, Calicut, Kerala India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h6 className="text-[10px] uppercase tracking-widest font-bold text-emerald-400/50">CONTACT US</h6>
                  <a href="tel:+919048230551" className="flex items-center gap-3 text-emerald-50/80 hover:text-emerald-400 font-bold transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    +91 90482 30551
                  </a>
                </div>
                <div className="space-y-4">
                  <h6 className="text-[10px] uppercase tracking-widest font-bold text-emerald-400/50">EMAIL</h6>
                  <a href="mailto:siokozhikode@gmail.com" className="flex items-center gap-3 text-emerald-50/80 hover:text-emerald-400 font-bold transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    siokozhikode@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="mt-20 pt-10 border-t border-white/5/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8 text-xs font-bold text-emerald-400/50 uppercase tracking-widest">
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            </div>

            <div className="flex gap-4">
              {[
                {
                  name: 'facebook',
                  url: 'https://www.facebook.com/siokkd',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )
                },
                {
                  name: 'instagram',
                  url: 'https://www.instagram.com/sio_kozhikode/',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/20 transition-all duration-300 shadow-lg shadow-black/20"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-xs font-bold text-emerald-400/30 tracking-widest uppercase">
              &copy; 2026 SIO Kozhikode District
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

