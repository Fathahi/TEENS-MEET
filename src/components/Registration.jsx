import { useState, memo } from 'react'
import { useReveal } from '../hooks/useReveal'

// Google Form Submission URL
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfUpFD2B--NGYMq7cmuoJ68Y9RTGgkxSs7idk6HptY5QZyTxw/formResponse";

// Google Form Field IDs
const FIELD_IDS = {
  name: 'entry.2092238618',
  phone: 'entry.1556369182',
  school: 'entry.479301265',
  place: 'entry.1753222212'
};

const Registration = () => {
  const headerRef = useReveal()
  const formRef = useReveal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    school: '',
    place: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const googleFormData = new FormData();
    googleFormData.append(FIELD_IDS.name, formData.name);
    googleFormData.append(FIELD_IDS.phone, formData.phone);
    googleFormData.append(FIELD_IDS.school, formData.school);
    googleFormData.append(FIELD_IDS.place, formData.place);

    try {
      // no-cors mode is necessary for Google Form POST if you don't have a backend proxy
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                  <label htmlFor="place" className="block text-sm font-bold text-emerald-900 ml-1">Your Place / Location</label>
                  <input
                    type="text"
                    id="place"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    placeholder="Enter your place"
                    className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
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
                We've received your registration for <strong>{formData.place}</strong>. 
                Keep an eye on your phone for further updates.
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
