import { useState, memo, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { supabase } from '../utils/supabase'
import { useReferral } from '../hooks/useReferral'

// Google Form Submission URL
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfUpFD2B--NGYMq7cmuoJ68Y9RTGgkxSs7idk6HptY5QZyTxw/formResponse";

// Google Form Field IDs
const FIELD_IDS = {
  name: 'entry.2092238618',
  phone: 'entry.1556369182',
  school: 'entry.479301265',
  venue: 'entry.1753222212',
  referredBy: 'entry.873073433'
};

const PLACES = [
  'Feroke',
  'City',
  'Kunnamangalam',
  'Mukkam',
  'Meppayyur',
  'Vadakara',
];

const Registration = () => {
  const headerRef = useReveal()
  const formRef = useReveal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const referralCodeFromUrl = useReferral()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    school: '',
    venue: '',
    referredBy: ''
  })

  useEffect(() => {
    if (referralCodeFromUrl) {
      setFormData(prev => ({ ...prev, referredBy: referralCodeFromUrl }))
    }
  }, [referralCodeFromUrl])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!supabase) {
      alert('Database not configured. Please check your .env file.')
      setIsSubmitting(false)
      return
    }

    try {
      // 1. Check if phone already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('registrations')
        .select('phone')
        .eq('phone', formData.phone)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingUser) {
        alert('This phone number is already registered!');
        return;
      }

      // 2. Insert new registration
      const { error: insertError } = await supabase
        .from('registrations')
        .insert([{
          full_name: formData.name,
          phone: formData.phone,
          school: formData.school,
          venue: formData.venue,
          referred_by: formData.referredBy || null
        }]);

      if (insertError) throw insertError;

      setIsSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="register" className="py-24 px-6 bg-emerald-50/30">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-16 reveal text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Register for Teens Meet 2026</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Ready to shape your future? Seats are limited to 100 per place.
            Select your preferred place and fill in your details to register.
          </p>
        </div>

        <div ref={formRef} className="reveal delay-[100ms] pro-card p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-white border-emerald-100 shadow-2xl shadow-emerald-500/10">
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
                <div className="space-y-3">
                  <label htmlFor="place" className="block text-sm font-bold text-emerald-900 ml-1">Preferred Venue</label>
                  <select
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a venue</option>
                    {PLACES.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="referredBy" className="block text-sm font-bold text-emerald-900 ml-1">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referredBy"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleChange}
                  placeholder="Enter referral code if you have one"
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
                We've received your registration for <strong>{formData.venue}</strong>.
                We will contact you soon for further details.
              </p>

              <div className="pt-6 flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    const inviteSection = document.getElementById('invite');
                    if (inviteSection) {
                      inviteSection.scrollIntoView({ behavior: 'smooth' });
                      // We can't easily pass state to the lazy-loaded ReferralPortal 
                      // without complex state management, but the user can now
                      // easily find where to get their code.
                    }
                  }}
                  className="btn-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 group"
                >
                  <span>Get Your Referral Code & Invite Friends</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Register another student
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(Registration)
