'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import axios from 'axios';
import Link from 'next/link';
import { 
  Calendar, ClipboardList, Loader2, ArrowRight, 
  MapPin, CheckCircle, Clock, AlertTriangle, PhoneCall 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RentalProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
}

interface RentalRequestItem {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  startDate: string;
  endDate: string;
  contactNumber: string;
  createdAt: string;
  property: RentalProperty | null;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' as const },
  }),
};

export default function MyRequestsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [requests, setRequests] = useState<RentalRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }

    const fetchRentals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/rentals/mine');
        if (response.data.success) {
          setRequests(response.data.rentals);
        }
      } catch (err) {
        console.error('Failed to load rental requests:', err);
        let errMsg = 'Failed to fetch your rental requests.';
        if (axios.isAxiosError(err)) {
          errMsg = err.response?.data?.message || errMsg;
        }
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user, authLoading, router]);

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Approved</span>
          </motion.span>
        );
      case 'rejected':
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Declined</span>
          </motion.span>
        );
      default:
        return (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100"
          >
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            <span>Pending Review</span>
          </motion.span>
        );
    }
  };

  if (authLoading || (loading && requests.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-10 h-10 text-indigo-600" />
          </motion.div>
          <p className="text-slate-500 font-medium font-sans">Loading your requests dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex-1 max-w-5xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        {/* Banner Row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              My Rental Requests
            </h1>
            <p className="text-sm text-slate-550 mt-1">
              Track the approval status of listings you requested space in.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <span>Browse More Listings</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-650 font-medium"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Requests Container */}
        {requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto mt-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ClipboardList className="w-16 h-16 text-indigo-200 stroke-[1.5] mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-bold text-slate-905 mb-2 font-display">No Requests Found</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              You haven&apos;t filed any move-in booking requests yet. Browse the Catalog to find your home!
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/properties"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Explore Properties
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {requests.map((request, i) => (
              <motion.div 
                key={request.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -3,
                  boxShadow: '0 8px 24px -6px rgba(99,102,241,0.12)',
                  borderColor: '#c7d2fe',
                }}
                className="bg-white rounded-2xl border border-slate-205/65 p-5 shadow-sm transition-colors duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Left side: Property Details */}
                <div className="flex gap-4 items-center">
                  <motion.div
                    className="w-20 h-20 rounded-xl bg-slate-105 overflow-hidden border border-slate-100 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <picture>
                      <img 
                        src={request.property?.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
                        alt={request.property?.title || 'Property photo'} 
                        className="w-full h-full object-cover"
                      />
                    </picture>
                  </motion.div>

                  <div>
                    {request.property ? (
                      <Link 
                        href={`/properties/${request.property.id}`}
                        className="font-bold text-slate-900 text-base font-display hover:text-indigo-600 transition-colors line-clamp-1"
                        title={request.property.title}
                      >
                        {request.property.title}
                      </Link>
                    ) : (
                      <span className="font-bold text-slate-450 italic text-sm">Property Listing Deleted</span>
                    )}

                    {request.property && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{request.property.location}</span>
                      </div>
                    )}

                    <div className="text-xs font-extrabold text-indigo-600 mt-2">
                      BDT {request.property ? request.property.price.toLocaleString() : '0'}{' '}
                      <span className="text-slate-400 font-medium text-[10px]">/ month</span>
                    </div>
                  </div>
                </div>

                {/* Middle details */}
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-650 py-3 md:py-0 border-t border-b md:border-t-0 md:border-b-0 border-slate-100 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider leading-none mb-0.5">Target Move-in</span>
                      <span>{new Date(request.startDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider leading-none mb-0.5">Phone Contact</span>
                      <span>{request.contactNumber || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Status */}
                <div className="flex items-center justify-between md:justify-end gap-3.5 w-full md:w-auto">
                  <div className="text-[10px] text-slate-400 md:text-right font-medium">
                    Requested on
                    <span className="block text-slate-600 font-bold text-xs md:mt-0.5">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>{getStatusBadge(request.status)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
}
