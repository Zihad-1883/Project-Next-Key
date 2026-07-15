'use client';

import React from 'react';
import Link from 'next/link';
import { KeyRound, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
              <KeyRound className="w-6 h-6 stroke-[2.5]" />
              <span className="font-display font-extrabold text-xl tracking-tight">
                Next<span className="text-indigo-400">Key</span>
              </span>
            </Link>
            <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
              Connecting tenants with verify landlords across the country under a premium, verified leasing environment. Find your ideal home rental space securely.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="GitHub link" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-650 hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn link" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-650 hover:text-white flex items-center justify-center transition-colors text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Browse Rental Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign In Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Rentals Services */}
          <div>
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Portals & Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/properties/add" className="hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/properties/manage" className="hover:text-white transition-colors">
                  Landlord Dashboard
                </Link>
              </li>
              <li>
                <Link href="/my-requests" className="hover:text-white transition-colors">
                  Tenant Bookings
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Coordinate */}
          <div className="space-y-4">
            <h4 className="text-white text-xs uppercase font-extrabold tracking-widest mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">12/A, Dhanmondi High Road, Dhaka 1209, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>support@nextkey.xyz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-slate-800 my-8"></div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} NextKey Technologies Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for secure renting.
          </p>
        </div>
      </div>
    </footer>
  );
}
