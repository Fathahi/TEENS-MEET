import React from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

const Gallery = () => {
  const headerRef = useReveal();
  
  const images = [
    {
      src: '/ufuq-landing-page/gallery/photo1.png',
      alt: 'Inspired gathering of teens at Teens Meet 2026',
      span: 'md:col-span-2 md:row-span-2',
      caption: 'Unforgettable Moments'
    },
    {
      src: '/ufuq-landing-page/gallery/photo2.png',
      alt: 'Students engaged in interactive workshops',
      span: 'md:col-span-1 md:row-span-1',
      caption: 'Peer Networking'
    },
    {
      src: '/ufuq-landing-page/gallery/photo3.png',
      alt: 'Charismatic mentor speaking to students',
      span: 'md:col-span-1 md:row-span-1',
      caption: 'Expert Guidance'
    }
  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-mint-50/30">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-emerald-950 uppercase tracking-tighter">
            Experience the <span className="gradient-text text-emerald-600">Vibe</span>
          </h2>
          <p className="text-emerald-900/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Take a look at the energy, inspiration, and community that define Teens Meet. 
            Join 600+ peers for a transformative experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[600px] md:h-[800px]">
          {images.map((img, index) => (
            <GalleryItem key={index} img={img} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ img, index }) => {
  const ref = useReveal();

  return (
    <motion.div
      ref={ref}
      className={`relative group overflow-hidden rounded-[2.5rem] bg-white border border-emerald-100/50 shadow-2xl shadow-emerald-500/5 reveal delay-[${index * 150}ms] ${img.span}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
        <div>
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 block">
            Teens Meet 2026
          </span>
          <h4 className="text-white text-2xl font-bold">
            {img.caption}
          </h4>
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
