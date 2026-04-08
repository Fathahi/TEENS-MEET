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

      <div className="overflow-x-auto rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/5 bg-white/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-600-white">
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Place Name</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Venue</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Date</th>
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
                <td className="px-6 py-5 text-gray-700">{place.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
