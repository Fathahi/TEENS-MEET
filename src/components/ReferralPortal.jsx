import { useState, memo } from 'react'
import { supabase } from '../utils/supabase'
import { useReveal } from '../hooks/useReveal'

const ReferralPortal = () => {
  const portalRef = useReveal()
  const [userData, setUserData] = useState(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${userData?.referralCode || ''}`

  const fetchStats = async (e) => {
    e.preventDefault()
    if (!phone) return

    setLoading(true)
    setError('')
    if (!supabase) {
      setError('Database not configured. Please check your .env file.')
      setLoading(false)
      return
    }

    try {
      // 1. Fetch user by phone
      const { data: user, error: userError } = await supabase
        .from('registrations')
        .select('*')
        .eq('phone', phone)
        .maybeSingle();

      if (userError) throw userError;

      if (!user) {
        setError('User not found. Have you registered yet?');
        return;
      }

      // 2. Fetch referral count
      const { count, error: countError } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', user.referral_code);

      if (countError) throw countError;

      setUserData({
        name: user.full_name,
        referralCode: user.referral_code,
        referralCount: count || 0
      });

    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not connect to the database. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleShare = () => {
    if (!userData) return
    const message = `Register for TEENS MEET 🚀\nUse my referral code: ${userData.referralCode}\nRegister here: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <section id="invite" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Decorative background elements for more "color" */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
      <div className="max-w-4xl mx-auto">
          <div ref={portalRef} className="reveal pro-card p-8 md:p-12 rounded-[2.5rem] border-emerald-200 shadow-2xl shadow-emerald-500/10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none"></div>
            
            <div className="relative text-center mb-10">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-emerald-500/20 animate-bounce">
                <span className="flex h-2 w-2 rounded-full bg-white animate-ping"></span>
                Big Rewards Await! 🎁
              </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center w-full">
              <span className="gradient-text">Unlock the Prizes!</span> <span>🚀</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Bring your friends along— <span className="text-emerald-600 font-bold italic">Top referrers win exclusive prizes!</span> 🎁. 
              Enter your registered mobile number to start your streak.
            </p>
          </div>

          {!userData ? (
            <form onSubmit={fetchStats} className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter your registered phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Go'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            </form>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Your Referral Code</p>
                  <p className="text-4xl font-black text-emerald-900 tracking-widest">{userData.referralCode}</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                  <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">Total Referrals</p>
                  <p className="text-4xl font-black text-emerald-900">{userData.referralCount}</p>
                </div>
              </div>


              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleShare}
                  className="flex-1 btn-primary py-4 rounded-xl flex items-center justify-center gap-3 font-bold"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.914 3.162.915 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.29 8.12c-.144.405-.838.774-1.149.822-.309.048-.61.063-1.013-.067-.24-.077-.542-.165-1.01-.358-1.992-.83-3.272-2.834-3.371-2.969-.099-.136-.736-.937-.736-1.78s.434-1.26.588-1.428c.154-.167.336-.21.448-.21s.224.013.322.018c.101.006.237-.038.371.285.14.336.475 1.156.516 1.24.041.085.068.184.01.299-.056.115-.111.189-.221.312-.112.126-.236.281-.336.377-.113.109-.23.23-.099.44.13.224.58 1.002.94 1.341.464.436.858.572 1.076.666s.416.036.568-.139c.15-.175.643-.746.815-.999.172-.255.344-.213.58-.126.236.087 1.493.704 1.751.833s.43.19.493.3c.062.11.062.636-.082 1.041z" />
                  </svg>
                  Share via WhatsApp
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-3 ${copied
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-emerald-100 text-emerald-700 hover:bg-emerald-50'
                    }`}
                >
                  {copied ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Link
                    </>
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setUserData(null)}
                  className="text-gray-400 text-sm font-medium hover:text-emerald-600 transition-colors"
                >
                  ← Use a different phone number
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(ReferralPortal)
