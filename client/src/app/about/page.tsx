'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Sparkles, Building2, Users2, Landmark, Trophy } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    { title: 'Verified Security', desc: 'No fake listings, no phantom agents. We audit and check active owners so your keys correspond to authentic assets.', icon: ShieldCheck },
    { title: 'Transparent Costings', desc: 'Brokers commissions are locked out. Standard utility bounds and pricing deposits are clearly projected upfront.', icon: Landmark },
    { title: 'Simplicity Redefined', desc: 'Select target move-in dates and submit booking requests directly to landlords in less than 2 minutes.', icon: Sparkles }
  ];

  const milestones = [
    { val: '2024', label: 'Company Foundation', icon: Building2 },
    { val: '15,000+', label: 'Successful Matches', icon: Users2 },
    { val: '64+', label: 'Districts Reached', icon: Trophy }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="bg-slate-900 py-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-4">
            <span className="text-indigo-400 text-[10px] tracking-widest font-black uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25">
              NextKey Corporate Roots
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Shaping Secure Space Rentals
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-xl mx-auto">
              We started with a single ambition: to clean up the rental search chaos and empower tenants with verified landlord listings.
            </p>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-909 font-display">Our Core Pillars</h2>
            <p className="text-slate-500 text-xs mt-1">NextKey runs on values structured to verify and simplify daily leasing interactions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-205/80 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-805 text-sm sm:text-base font-display">{pil.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xs">{pil.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side: Images */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <picture>
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
                  alt="Team collabs"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>

            {/* Right side: Texts context */}
            <div className="space-y-6">
              <span className="text-indigo-605 text-[10px] uppercase font-black tracking-widest">Our Journey</span>
              <h2 className="text-3xl font-extrabold text-slate-905 font-display">Solving Real Estate Mismatches</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Finding rooms, sublets or apartments historically demanded walking under streets scanning placards or navigating scam-ridden community forums. Over 40% of renters encountered mismatch listings or uncooperative brokers. 
              </p>
              <p className="text-slate-605 text-xs sm:text-sm leading-relaxed">
                NextKey resolves this by deploying structured verification. Landlords submit coordinate proofs, pricing criteria, bedroom specifications and photos. Tenants query results in real-time, submit bookings directly, and manage all rental logs.
              </p>
            </div>

          </div>
        </section>

        {/* Milestones counter metrics */}
        <section className="py-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((ms, idx) => {
              const Icon = ms.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center space-y-3">
                  <Icon className="w-8 h-8 text-indigo-600 mx-auto" />
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">{ms.val}</div>
                  <div className="text-slate-450 text-[10px] uppercase tracking-widest font-extrabold">{ms.label}</div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
