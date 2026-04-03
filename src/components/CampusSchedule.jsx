import { useState, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const CAMPUSES = [
  { name: 'Campus 1', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Campus 2', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Campus 3', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Campus 4', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Campus 5', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
  { name: 'Campus 6', location: '[Insert Place Name]', date: '[Insert Date]', time: '9:00 AM - 5:00 PM' },
]

const CampusSchedule = () => {
  const headerRef = useReveal()

  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={headerRef} className="mb-16 reveal text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Campus & Schedule</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Find your nearest location and join us for an inspiring day. Each campus is limited to 100 students to ensure personalized attention.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/5 bg-white/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Campus Name</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Location</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Date</th>
              <th className="px-6 py-5 font-bold uppercase tracking-wider text-sm">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {CAMPUSES.map((campus, index) => (
              <tr 
                key={index} 
                className="hover:bg-emerald-50/50 transition-colors duration-200 group"
              >
                <td className="px-6 py-5 font-semibold text-emerald-900 group-hover:text-emerald-600">{campus.name}</td>
                <td className="px-6 py-5 text-gray-700">{campus.location}</td>
                <td className="px-6 py-5 text-gray-700">{campus.date}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {campus.time}
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

export default memo(CampusSchedule)
