'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PropertyListItem {
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

interface PropertyCardProps {
  property: PropertyListItem;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col h-full font-sans"
    >
      {/* Property Image Cover */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <picture>
          <img
            src={property.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />
        </picture>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <motion.div
          className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 uppercase tracking-wider shadow-sm border border-slate-100/50"
          whileHover={{ scale: 1.06 }}
        >
          {property.propertyType}
        </motion.div>

        {/* Price badge on image */}
        <motion.div
          className="absolute bottom-3 right-3 bg-indigo-600/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 8 }}
          whileInView={{ y: 0 }}
        >
          BDT {property.price.toLocaleString()}
        </motion.div>
      </div>

      {/* Property Details Info Column */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Tag */}
          <div className="text-indigo-650 font-extrabold text-base mb-1">
            BDT {property.price.toLocaleString()}
            <span className="text-slate-400 font-semibold text-xs lowercase"> / month</span>
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-slate-900 text-base line-clamp-1 font-display group-hover:text-indigo-600 transition-colors"
            title={property.title}
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 mb-2.5">
            <motion.div whileHover={{ scale: 1.2 }}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
            </motion.div>
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Short descriptors */}
          <p className="text-slate-550 text-xs line-clamp-2 leading-relaxed mb-4">
            {property.shortDescription}
          </p>
        </div>

        <div>
          {/* Room count Specifications */}
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-650 border-t border-slate-100 pt-3.5 mb-3.5">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
          </div>

          {/* Call-to-action button */}
          <Link
            href={`/properties/${property.id}`}
            className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer group/btn"
          >
            <span>View Details</span>
            <motion.div
              className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse h-full flex flex-col justify-between"
    >
      <div>
        <div className="w-full aspect-[4/3] bg-slate-200 rounded-xl mb-3" />
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-1" />
        <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
        </div>
      </div>
      <div>
        <div className="h-px bg-slate-100 my-3.5" />
        <div className="flex gap-4">
          <div className="h-3 bg-slate-200 rounded w-1/4" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
        <div className="h-9 bg-slate-150 rounded-xl w-full mt-3.5" />
      </div>
    </motion.div>
  );
}
