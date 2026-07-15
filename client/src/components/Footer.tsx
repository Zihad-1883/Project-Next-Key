'use client';

import React from 'react';
import Link from 'next/link';
import { KeyRound, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export default function Footer() {
  const quickLinks = [
    { href: '/properties', label: 'Browse Rental Properties' },
    { href: '/about',      label: 'About Us' },
    { href: '/contact',    label: 'Contact Support' },
    { href: '/login',      label: 'Sign In Account' },
  ];

  const serviceLinks = [
    { href: '/properties/add',    label: 'List Your Property' },
    { href: '/properties/manage', label: 'Landlord Dashboard' },
    { href: '/my-requests',       label: 'Tenant Bookings' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          {/* Column 1: Brand & Description */}
          <motion.div variants={fadeUp} custom={0} className="space-y-4">
            <motion.div whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Link href="/" className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
                <motion.div whileHover={{ rotate: -15 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <KeyRound className="w-6 h-6 stroke-[2.5]" />
                </motion.div>
                <span className="font-display font-extrabold text-xl tracking-tight">
                  Next<span className="text-indigo-400">Key</span>
                </span>
              </Link>
            </motion.div>
            <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
              Connecting tenants with verify landlords across the country under a premium, verified leasing environment. Find your ideal home rental space securely.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <motion.a
                href="#"
                aria-label="GitHub link"
                whileHover={{ scale: 1.15, backgroundColor: '#4f46e5' }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              {/* LinkedIn */}
              <motion.a
                href="#"
                aria-label="LinkedIn link"
                whileHover={{ scale: 1.15, backgroundColor: '#4f46e5' }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={fadeUp} custom={1}>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              {quickLinks.map(({ href, label }) => (
                <motion.li key={href} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link href={href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-0.5 text-indigo-400" />
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={fadeUp} custom={2}>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Portals & Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              {serviceLinks.map(({ href, label }) => (
                <motion.li key={href} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <Link href={href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-0.5 text-indigo-400" />
                    {label}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    import('react-hot-toast').then(({ default: toast }) => {
                      toast.success(
                        'Security Guarantee: 100% verified lease agreements & background-verified landlords.',
                        { icon: '🛡️', duration: 4000 }
                      );
                    });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-0.5 text-indigo-400" />
                  Security Guarantee
                </button>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={fadeUp} custom={3} className="space-y-4">
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <motion.li className="flex items-start gap-2.5" whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">12/A, Dhanmondi High Road, Dhaka 1209, Bangladesh</span>
              </motion.li>
              <motion.li className="flex items-center gap-2.5" whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+880 1712-345678</span>
              </motion.li>
              <motion.li className="flex items-center gap-2.5" whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>support@nextkey.xyz</span>
              </motion.li>
            </ul>
          </motion.div>

        </motion.div>

        <motion.div
          className="h-px bg-slate-800 my-8"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        {/* Bottom copyright */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-slate-500 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© {new Date().getFullYear()} NextKey Technologies Ltd. All rights reserved.</p>
          <motion.p
            className="flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </motion.span>{' '}
            for secure renting.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
