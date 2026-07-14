'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, ArrowUpRight } from 'lucide-react';

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
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col h-full font-sans">
      {/* Property Image Cover */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <picture>
          <img
            src={property.imageUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </picture>
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 uppercase tracking-wider shadow-sm border border-slate-100/50">
          {property.propertyType}
        </div>
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
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
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
            className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 bg-indigo-50 hover:bg-indigo-650 text-indigo-600 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-pulse h-full flex flex-col justify-between">
      <div>
        <div className="w-full aspect-[4/3] bg-slate-200 rounded-xl mb-3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-1"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-200 rounded w-full"></div>
          <div className="h-3 bg-slate-200 rounded w-4/5"></div>
        </div>
      </div>
      <div>
        <div className="h-px bg-slate-100 my-3.5"></div>
        <div className="flex gap-4">
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="h-9 bg-slate-150 rounded-xl w-full mt-3.5"></div>
      </div>
    </div>
  );
}
