'use client';

import React, { useState, useEffect, useCallback, useRef, startTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyRound, LogOut, PlusCircle, LayoutDashboard,
  Search, FileText, Menu, X, Home, PhoneCall, Info
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change (skip initial mount)
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      startTransition(() => setMenuOpen(false));
    } else {
      isMounted.current = true;
    }
  }, [pathname]);

  // Close menu if window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    setMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const baseLinks = [
    { href: '/properties', label: 'Browse Homes', icon: <Search className="w-4 h-4" /> },
    { href: '/about',      label: 'About Us',    icon: <Info className="w-4 h-4" /> },
    { href: '/contact',    label: 'Contact',     icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const landlordLinks = [
    { href: '/properties/manage', label: 'Manage Listings', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/properties/add',    label: 'Add Listing',     icon: <PlusCircle className="w-4 h-4" /> },
  ];

  const tenantLinks = [
    { href: '/my-requests', label: 'My Requests', icon: <FileText className="w-4 h-4" /> },
  ];

  const roleLinks =
    user?.role === 'landlord'
      ? landlordLinks
      : user?.role === 'tenant'
      ? tenantLinks
      : [];

  const allLinks = [...baseLinks, ...roleLinks];

  const drawerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.28, ease: 'easeOut' as const },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.04, duration: 0.22, ease: 'easeOut' as const },
    }),
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 font-sans transition-all duration-300 ${
          scrolled
            ? 'bg-white/97 backdrop-blur-lg shadow-md border-b border-slate-100'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-100'
        }`}
        style={{ isolation: 'isolate' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Brand Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors flex-shrink-0"
            >
              <KeyRound className="w-6 h-6 stroke-[2.5]" />
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                Next<span className="text-indigo-600">Key</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden md:flex items-center gap-6">
              {allLinks.map(({ href, label, icon }) => (
                <div key={href} className="relative">
                  <Link
                    href={href}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-indigo-600 ${
                      isActive(href) ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    <span className={isActive(href) ? 'text-indigo-600' : 'text-slate-400'}>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                  {isActive(href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── Desktop Auth Area ── */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none bg-indigo-50 px-1.5 py-0.5 rounded-full inline-block mt-0.5 max-w-fit ml-auto">
                      {user.role}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="h-6 w-px bg-slate-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">
                    Sign In
                  </Link>
                  <Link href="/register" className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-sm transition-colors">
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile: right-side auth + hamburger ── */}
            <div className="flex md:hidden items-center gap-2">
              {user ? (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-sm shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1.5 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Hamburger button — kept simple for maximum reliability */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-slate-100 bg-white shadow-lg"
            >
              <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">

                {/* Nav links */}
                {allLinks.map(({ href, label, icon }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive(href)
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className={isActive(href) ? 'text-indigo-600' : 'text-slate-400'}>
                        {icon}
                      </span>
                      {label}
                      {isActive(href) && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="h-px bg-slate-100 my-2" />

                {/* Auth section */}
                {user ? (
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded-full">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-1 pb-2">
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                    >
                      <Home className="w-4 h-4" />
                      Get Started — It&apos;s Free
                    </Link>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile drawer backdrop — closes on tap */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
