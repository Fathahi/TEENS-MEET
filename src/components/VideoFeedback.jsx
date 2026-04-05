import { useReveal } from '../hooks/useReveal';
import { memo, useRef, useState } from 'react';

const VideoFeedback = () => {
  const headerRef = useReveal();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="feedback-video" className="py-24 px-6 bg-emerald-950 relative overflow-hidden">
      {/* Dynamic background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto text-center">
        <div ref={headerRef} className="mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/5 backdrop-blur-sm">
            Student Feedback
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter">
            They Thought It'd Be <span className="text-emerald-400 font-black">Boring...</span>
          </h2>
          <p className="text-emerald-50/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed italic">
            "We came in with zero expectations — honestly thought it would be just another camp. But it turned out to be one of the best experiences of our lives."
          </p>
        </div>

        <div 
          className="reveal active delay-200 relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm"
          style={{ aspectHeight: '56.25%', position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}
        >
          {/* Custom Video Player */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
            preload="none"
            controls={isPlaying}
            src={`${import.meta.env.BASE_URL}videos/WhatsApp%20Video%202026-04-03%20at%202.57.40%20PM.mp4`}
            poster={`${import.meta.env.BASE_URL}gallery/photo2.png`}
          >
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Overlay */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transform group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Subtle info overlay */}
          <div className="absolute bottom-6 right-8 text-white/40 text-xs font-bold tracking-widest uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Student Feedback • Teens Meet 2025
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-emerald-400/60 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Real Voices
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-heart"></i>
            Genuine Reactions
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(VideoFeedback);
