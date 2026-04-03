import { useState, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

const CAMPUSES = [
  'Campus 1', 'Campus 2', 'Campus 3', 'Campus 4', 'Campus 5', 'Campus 6'
]

const Registration = () => {
  const headerRef = useReveal()
  const formRef = useReveal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    campus: '',
    school: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <section id="register" className="py-24 px-6 bg-emerald-50/30">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-16 reveal text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Teens Meet 2026</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to shape your future? Seats are limited to 100 per campus. 
            Select your preferred location and fill in your details to register.
          </p>
        </div>

        <div ref={formRef} className="reveal delay-[100ms] pro-card p-8 md:p-12 rounded-[2.5rem] bg-white border-emerald-100 shadow-2xl shadow-emerald-500/10">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-bold text-emerald-900 ml-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="block text-sm font-bold text-emerald-900 ml-1">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="campus" className="block text-sm font-bold text-emerald-900 ml-1">Preferred Campus</label>
                  <select
                    id="campus"
                    name="campus"
                    value={formData.campus}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled>Select a campus</option>
                    {CAMPUSES.map(campus => (
                      <option key={campus} value={campus}>{campus}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label htmlFor="school" className="block text-sm font-bold text-emerald-900 ml-1">School Name</label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                    placeholder="Enter school name"
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-bold text-emerald-900 ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 transform active:scale-95 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Registering...' : 'Register for Teens Meet 2026'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-emerald-900">Registration Successful!</h3>
              <p className="text-gray-600 text-lg">
                We've received your registration for <strong>{formData.campus}</strong>. 
                Keep an eye on your phone and email for further updates.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-emerald-600 font-bold hover:underline"
              >
                Register another student
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(Registration)
