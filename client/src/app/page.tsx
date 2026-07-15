'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import PropertyCard, { PropertyCardSkeleton } from '@/components/PropertyCard';
import { 
  Building2, Search, ArrowRight, Home as HomeIcon, Key, ShieldCheck, 
  ChevronDown, ChevronUp, Star, Award, Users, HelpCircle 
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
}

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
];

export default function Home() {
  const router = useRouter();
  
  // Search query inputs
  const [searchTerm, setSearchTerm] = useState('');
  
  // Slide indicator
  const [activeSlide, setActiveSlide] = useState(0);

  // Latest properties
  const [latestListings, setLatestListings] = useState<Property[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  // FAQ Accordion Index states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Fetch frontpage highlighted listings
  useEffect(() => {
    const fetchLatest = async () => {
      setListingsLoading(true);
      try {
        const response = await api.get('/properties?limit=4');
        if (response.data.success) {
          setLatestListings(response.data.properties);
        }
      } catch (err) {
        console.error('Failed to query cover listings:', err);
      } finally {
        setListingsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/properties');
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Static options lists
  const categories = [
    { title: 'Apartments', type: 'Apartment', count: '1,240+ properties', desc: 'Secure family luxury apartments', icon: Building2 },
    { title: 'Studios/Flats', type: 'Studio', count: '850+ properties', desc: 'Comfy studios for young professionals', icon: HomeIcon },
    { title: 'Single Rooms', type: 'Room', count: '1,980+ properties', desc: 'Affordable sublets for students', icon: Users },
    { title: 'Duplex Villas', type: 'Villa', count: '310+ properties', desc: 'Spacious villas with yard lawns', icon: Award }
  ];

  const workflowSteps = [
    { index: '01', title: 'Browse Verified Homes', desc: 'Query listings using local search boundaries, price categories, and bedroom capacity filter selectors.', icon: Search },
    { index: '02', title: 'Submit Rent booking', desc: 'Tentatively pick target move-in dates, configure contact coordinates and request direct landlord responses.', icon: Key },
    { index: '03', title: 'Unlock Verified Keys', desc: 'Complete identity validation, get details approved by landlords, and sign premium online files.', icon: ShieldCheck }
  ];

  const testimonials = [
    { name: 'Afif Hossain', role: 'CSE Student, BUET', text: '“Finding shared sublet rooms near campus used to be a mess of roadside leaflets. With NextKey, I secured a fully checked studio in 24 hours online!”', rating: 5 },
    { name: 'Tasnim Rahman', role: 'Dhanmondi Landlord', text: '“The portfolio pricing distribution bar charts give me real-time ideas. Screening reliable student profiles has never been this stress-free.”', rating: 5 },
    { name: 'Zihad Chowdhury', role: 'Bank Executive', text: '“The star rating feedback feed helps separate the bad flats from premium ones. NextKey booking requests make rent deals extremely secure.”', rating: 5 }
  ];

  const faqs = [
    { q: 'Are all listed properties verified?', a: 'Yes. Every listing posted is audited against landlord identity criteria. We check lease coordinates and enforce standard photo parameters before publishing.' },
    { q: 'How do I submit a rental request?', a: 'Simply navigate to any listing page details, select your target move-in date on the sidebar card, input your contact number, and submit. The property owner will review it instantly.' },
    { q: 'What is the role of the star rating reviews?', a: 'Only verified tenants who have submitted rental requests can submit star ratings and descriptions, protecting feedback from bots/spam.' },
    { q: 'Does NextKey charge landlords for adding listings?', a: 'Listing properties on NextKey is fully free for verify landlords. Standard landlord management limits apply based on accounts verification status.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      {/* SECTION 1: HERO CONTAINER WITH SLIDER & SEARCH BAR */}
      <section className="relative w-full h-[620px] overflow-hidden bg-slate-900 text-white flex items-center justify-center">
        {/* Background images loop */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
              idx === activeSlide ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}

        {/* Hero Overlay Context */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-500/30">
            Secure Home Rental Solutions
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-tight max-w-3xl mx-auto">
            Your Next Home, <span className="text-indigo-400">Secured</span>.
          </h1>
          
          <p className="text-slate-205 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Find premium luxury apartments, comfy student sublet rooms, or studio flats with verified landlords and zero broker fees.
          </p>

          {/* Search bar widget */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl p-2.5 shadow-xl flex items-center gap-2 border border-slate-100">
            <div className="relative flex-grow pl-3 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find by location, title or property type (e.g. Dhanmondi, Studio)..."
                className="w-full bg-transparent pl-7 pr-3 py-2 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 2: CATEGORY OPTIONS GRID */}
      <section className="py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-indigo-600 text-[10px] uppercase font-black tracking-widest">Property Categories</span>
          <h2 className="text-3xl font-extrabold text-slate-905 font-display mt-2">Explore By Real Estate Style</h2>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">Filter active rentals instantaneously matching your lifestyle specifications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link 
                key={idx}
                href={`/properties?type=${cat.type}`}
                className="bg-white rounded-2xl border border-slate-205/70 p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group cursor-pointer block"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-605 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mt-5 font-display">{cat.title}</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{cat.desc}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 mt-4">
                  <span>{cat.count}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: PROCESS WORKFLOW MAP (HOW IT WORKS) */}
      <section className="bg-slate-900 py-20 text-white w-full border-t border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto mb-16">
            <span className="text-indigo-400 text-[10px] uppercase font-black tracking-widest">Leasing Workflow</span>
            <h2 className="text-3xl font-extrabold font-display mt-2 text-white">How NextKey Works</h2>
            <p className="text-slate-400 text-xs mt-1">Get verified lease agreements configured in 3 easy milestones.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center space-y-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 text-xl font-bold group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-indigo-500 font-extrabold text-[10px] tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full mt-2">
                    STEP {step.index}
                  </span>
                  <h3 className="font-extrabold text-white text-base font-display">{step.title}</h3>
                  <p className="text-slate-400 text-xs max-w-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: HIGHLIGHTS LISTINGS CAROUSEL */}
      <section className="py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-indigo-600 text-[10px] uppercase font-black tracking-widest">Featured Stays</span>
            <h2 className="text-3xl font-extrabold text-slate-905 font-display mt-2">Highlights Listings</h2>
            <p className="text-slate-500 text-xs mt-1">Directly vetted properties listed by verified landlord members.</p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-650 hover:text-indigo-800 transition-colors"
          >
            <span>Explore All Catalog Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {listingsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((skeleton) => (
              <PropertyCardSkeleton key={skeleton} />
            ))}
          </div>
        ) : latestListings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-slate-800 text-sm">No Properties Found</h3>
            <p className="text-slate-500 text-xs mt-1">There are no listing files published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5: STATS COUNTER BANNER */}
      <section className="bg-indigo-900 py-16 text-white text-center w-full border-t border-indigo-950 font-display relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-805 rounded-full opacity-35 filter blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">5,000+</div>
            <div className="text-indigo-200 text-2xs uppercase tracking-widest mt-1.5 font-bold">Vetted Stays</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">2,500+</div>
            <div className="text-indigo-200 text-2xs uppercase tracking-widest mt-1.5 font-bold">Happy Renters</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">1m</div>
            <div className="text-indigo-200 text-2xs uppercase tracking-widest mt-1.5 font-bold">Match Time</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">24/7</div>
            <div className="text-indigo-200 text-2xs uppercase tracking-widest mt-1.5 font-bold">Priority Care</div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIAL GRID */}
      <section className="py-20 bg-white w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto mb-12">
            <span className="text-indigo-650 text-[10px] uppercase font-black tracking-widest">Platform Reviews</span>
            <h2 className="text-3xl font-extrabold text-slate-905 font-display mt-2 font-display">Renter Testimonials</h2>
            <p className="text-slate-500 text-xs mt-1">See how NextKey simplifies rent search workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-400 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-650 text-xs italic leading-relaxed">{test.text}</p>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-slate-200/60 mt-6">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{test.name}</h4>
                    <span className="text-[10px] text-slate-450 font-semibold">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQS ACCORDION */}
      <section className="py-20 max-w-3xl mx-auto w-full px-4 text-slate-800">
        <div className="text-center mb-10">
          <HelpCircle className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-slate-905 font-display font-displayHeading">Leasing Support FAQs</h2>
          <p className="text-slate-500 text-xs mt-1">Find absolute coordinates to target inquiries before placing request forms.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-colors duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out px-5 text-xs text-slate-500 leading-relaxed ${
                  activeFaq === idx ? 'pb-4 max-h-[200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
