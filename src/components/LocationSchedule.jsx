import { useState, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const LOCATIONS = [
  { name: 'Location 1', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Location 2', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Location 3', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Location 4', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Location 5', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Location 6', place: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
]

const LocationSchedule = () => {
  const headerRef = useReveal()

  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={headerRef} className="mb-16 reveal text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Location & Schedule</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Find your nearest location and join us for an inspiring day. Each location is limited to 100 students to ensure personalized attention.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/5 bg-white/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Location Name</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Place</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Date</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {LOCATIONS.map((loc, index) => (
              <tr 
                key={index} 
                className="hover:bg-emerald-50/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-5 font-semibold text-emerald-900 group-hover:text-emerald-600">{loc.name}</td>
                <td className="px-6 py-5 text-gray-700">{loc.place}</td>
                <td className="px-6 py-5 text-gray-700">{loc.date}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {loc.time}
                  </span>
                </td>
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
