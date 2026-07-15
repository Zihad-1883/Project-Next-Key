'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import axios from 'axios';
import { 
  Loader2, MapPin, BedDouble, Bath, Home, ArrowLeft, Mail, 
  ShieldAlert, CheckCircle2, Calendar, MessageSquare, AlertCircle
} from 'lucide-react';

interface LandlordInfo {
  id: string;
  name: string;
  email: string;
}

interface PropertyDetails {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  landlord: LandlordInfo | null;
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Rental request form inputs
  const [startDate, setStartDate] = useState('');
  const [message, setMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/properties/${id}`);
        if (response.data.success) {
          setProperty(response.data.property);
        }
      } catch (err) {
        console.error('Failed to load property details:', err);
        let errMsg = 'Could not load details for this property listing.';
        if (axios.isAxiosError(err)) {
          errMsg = err.response?.data?.message || errMsg;
        }
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleRequestRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'tenant') {
      setRequestError('Only Tenants are allowed to submit rent booking requests.');
      return;
    }

    if (!startDate) {
      setRequestError('Please select a target moving date.');
      return;
    }

    setRequestLoading(true);
    setRequestError(null);
    setRequestSuccess(false);

    try {
      // POST Request for Phase 6 endpoints
      const response = await api.post('/bookings', {
        propertyId: id,
        moveInDate: startDate,
        personalMessage: message.trim() || `Hi, I am interested in renting your property located at ${property?.location}.`,
      });

      if (response.data.success) {
        setRequestSuccess(true);
        setMessage('');
        setStartDate('');
      }
    } catch (err) {
      console.error('Failed to submit booking request:', err);
      let errMsg = 'Failed to submit rental request. Please try again.';
      if (axios.isAxiosError(err)) {
        errMsg = err.response?.data?.message || errMsg;
      }
      setRequestError(errMsg);
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-650" />
          <p className="text-slate-500 font-medium">Fetching listing data details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
            <ShieldAlert className="w-14 h-14 text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Listing</h3>
            <p className="text-slate-500 mb-6">{error || 'The requested property could not be found.'}</p>
            <button
              onClick={() => router.push('/properties')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/properties')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-semibold mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Listings</span>
        </button>

        {/* Hero Image Showcase banner */}
        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-slate-200 mb-8 bg-slate-100 shadow-sm">
          <picture>
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 shadow-sm border border-slate-100">
            {property.propertyType}
          </div>
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Specifications Gallery */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h1 className="text-3xl font-extrabold text-slate-900 font-display sm:leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-slate-550 text-sm mt-3 pb-6 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{property.location}</span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <Home className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                  <div className="text-slate-400 text-xs font-semibold">Home Type</div>
                  <div className="text-slate-800 text-sm font-bold mt-0.5">{property.propertyType}</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <BedDouble className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                  <div className="text-slate-400 text-xs font-semibold">Bedrooms</div>
                  <div className="text-slate-800 text-sm font-bold mt-0.5">{property.bedrooms} Units</div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <Bath className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                  <div className="text-slate-400 text-xs font-semibold">Bathrooms</div>
                  <div className="text-slate-800 text-sm font-bold mt-0.5">{property.bathrooms} Units</div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-slate-900 font-displayHeading">Property Overview</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{property.shortDescription}</p>
                <div className="border border-indigo-50/50 bg-indigo-50/20 p-5 rounded-2xl text-xs text-indigo-850 font-medium">
                  <strong>Landlord Notes:</strong> Only clean tenants with checkable histories are targeted. Initial security deposits apply.
                </div>
                <h3 className="text-lg font-bold text-slate-900 pt-4 font-displayHeading">Detailed Description</h3>
                <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">{property.detailedDescription}</p>
              </div>
            </div>

            {/* Checklist features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-display mb-4">Included Features & Checklist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  'Fiber Optic Wi-Fi Available',
                  'In-unit Split Air Conditioning',
                  'Active 24/7 Gated Security Guard',
                  'Fitted Modular Kitchen Fixtures',
                  'Continuous Line Gas & Water Feed',
                  'Spacious Balcony/Vista View',
                  'Dedicated Covered Parking Space',
                  'Elevator/Lift Service Operations'
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-650 font-semibold bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Landlord Card & Booking Request Form */}
          <div className="space-y-8">
            {/* Rent Pricing Card */}
            <div className="bg-white rounded-2xl border border-slate-250/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full z-0 pointer-events-none transition-all"></div>
              
              <div className="relative z-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Monthly Rental Cost</span>
                <div className="text-slate-900 font-black text-3xl mt-1.5 flex items-baseline gap-1">
                  BDT {property.price.toLocaleString()}
                  <span className="text-slate-400 text-xs font-semibold normal-case">/ month</span>
                </div>

                <div className="h-px bg-slate-100 my-6"></div>

                {/* Tenant Booking request form */}
                {requestSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h5 className="font-bold text-sm text-emerald-800">Request Sent Successfully!</h5>
                    <p className="text-xs text-emerald-650">The Landlord has been notified. You can review current states in My Requests dashboard.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRequestRental} className="space-y-4">
                    <div className="text-slate-800 text-xs font-bold mb-2">Request Rental Space</div>
                    
                    {requestError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-650 flex items-start gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        <span>{requestError}</span>
                      </div>
                    )}

                    <div>
                      <label htmlFor="startDate" className="block text-xs font-bold text-slate-650 mb-1">
                        Move-in Date Target
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          id="startDate"
                          type="date"
                          required
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="appearance-none block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-650/15 text-slate-800 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-slate-650 mb-1">
                        Message to Landlord (Optional)
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 pt-2.5 flex items-start pointer-events-none text-slate-450">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Introduce yourself, describe occupation, proposed term duration..."
                          className="appearance-none block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-655/15 text-slate-805 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={requestLoading || (!!user && user.role === 'landlord')}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {requestLoading ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting Booking Request...
                        </span>
                      ) : user ? (
                        user.role === 'landlord' ? (
                          'Disabled for Landlords'
                        ) : (
                          'Request Rental / Rent Now'
                        )
                      ) : (
                        'Sign In to Request Rent'
                      )}
                    </button>

                    {user && user.role === 'landlord' && (
                      <div className="text-[10px] text-center text-slate-450 mt-2 font-medium">
                        * Landlords cannot submit rental requests for properties.
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Landlord Contact board details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-4">Listed Landlord</h3>
              {property.landlord ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-display font-black text-lg">
                      {property.landlord.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-905 text-sm">{property.landlord.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Owner Landlord</p>
                    </div>
                  </div>

                  <a
                    href={`mailto:${property.landlord.email}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-450" />
                    <span>Contact via Email</span>
                  </a>
                </div>
              ) : (
                <div className="text-xs text-slate-450 font-medium italic">
                  Landlord coordinates withheld or deleted.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
