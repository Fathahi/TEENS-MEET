import { useState, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const PLACES = [
  { name: 'Feroke',         venue: 'To be announced',         date: 'TBA' },
  { name: 'City',           venue: 'To be announced',         date: 'TBA' },
  { name: 'Kunnamangalam',  venue: 'To be announced',         date: 'TBA' },
  { name: 'Mukkam',         venue: 'To be announced',         date: 'TBA' },
  { name: 'Meppayyur',      venue: 'To be announced',         date: 'TBA' },
  { name: 'Vadakara',       venue: 'To be announced',         date: 'TBA' },
]

const LocationSchedule = () => {
  const headerRef = useReveal()

  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={headerRef} className="mb-16 reveal text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Places & Schedule</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Find your nearest place and join us for an inspiring day. Each place is limited to 100 students to ensure personalized attention.
        </p>
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/5 bg-white/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-500/10">
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm text-emerald-900">Place Name</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm text-emerald-900">Venue</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm text-emerald-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {PLACES.map((place, index) => (
              <tr 
                key={index} 
                className="hover:bg-emerald-50/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-5 font-semibold text-emerald-900 group-hover:text-emerald-600">{place.name}</td>
                <td className="px-6 py-5 text-gray-700 font-medium italic text-emerald-600/70">{place.venue}</td>
                <td className="px-6 py-5 text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{place.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Vertical Cards */}
      <div className="md:hidden space-y-4">
        {PLACES.map((place, index) => (
          <div 
            key={index}
            className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-lg shadow-emerald-500/5"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-emerald-950">{place.name}</h3>
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {place.date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-900/60 font-medium italic">
              <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm truncate">{place.venue}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a 
          href="#register" 
          className="btn-primary inline-block px-10 py-4 rounded-xl font-bold text-lg"
        >
          Secure Your Spot Now
        </a>
      </div>
    </section>
  )
}

export default memo(LocationSchedule)
