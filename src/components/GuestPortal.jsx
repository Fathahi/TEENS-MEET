import { useReveal } from '../hooks/useReveal';
import { memo } from 'react';

import abdulVahidImg from '/guests/abdul_vahid.png';
import sahelBasImg from '/guests/sahel_bas.png';
import raheemKcImg from '/guests/raheem_kc.png';
import ameenNasihImg from '/guests/ameen_nasih.png';

const GUESTS = [
  {
    name: 'Adv. Abdul Vahid',
    role: 'President, SIO Kerala',
    image: abdulVahidImg,
    description: 'Leading the Students Islamic Organisation of India, Kerala unit, with vision and excellence.'
  },
  {
    name: 'Sahel Bas',
    role: 'Secretary, SIO Kerala',
    image: sahelBasImg,
    description: 'Driving student empowerment and community growth across Kerala as SIO State Secretary.'
  },
  {
    name: 'Abdu Raheem KC',
    role: 'President, SIO Kozhikode',
    image: raheemKcImg,
    description: 'Leading the SIO Kozhikode district with a strong commitment to youth development.'
  },
  {
    name: 'Ameen Nasih',
    role: 'Secretary, SIO Kozhikode',
    image: ameenNasihImg,
    description: 'Organizing and inspiring the next generation of student leaders across Kozhikode.'
  }
];

const GuestPortal = () => {
  const headerRef = useReveal();

  return (
    <section id="guests" className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-200">
            Guest Portal
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-emerald-950">
            Our Distinguished <span className="text-emerald-600">Guests</span>
          </h2>
          <p className="text-emerald-900/60 max-w-2xl mx-auto text-lg font-medium">
            Learn from prominent scholars and community leaders who are here to inspire and guide your future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GUESTS.map((guest, index) => (
            <GuestCard key={index} guest={guest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GuestCard = ({ guest, index }) => {
  const cardRef = useReveal();

  return (
    <div
      ref={cardRef}
      className="reveal pro-card p-6 rounded-[2.5rem] bg-white border-emerald-100 shadow-xl shadow-emerald-900/5 group hover:border-emerald-300 transition-all duration-500 flex flex-col items-center text-center"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-50 shadow-lg group-hover:border-emerald-200 transition-colors duration-500">
          <img
            src={guest.image}
            alt={guest.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute -bottom-2 right-0 bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-white">
          <i className="fas fa-star"></i>
        </div>
      </div>

      <h3 className="text-xl font-bold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
        {guest.name}
      </h3>
      <p className="text-emerald-600 font-bold text-sm uppercase tracking-wide mb-4">
        {guest.role}
      </p>
      <p className="text-sm text-emerald-900/60 leading-relaxed italic">
        "{guest.description}"
      </p>

      <div className="mt-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
          <i className="fab fa-twitter text-sm"></i>
        </button>
        <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
          <i className="fab fa-linkedin-in text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default memo(GuestPortal);
