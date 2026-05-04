"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { BookOpen, User, LogOut, Menu, Search, Bookmark, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[100] px-4 py-6 md:px-8 pointer-events-none">
      <div className="navbar glass rounded-[32px] shadow-2xl border border-white/20 px-6 pointer-events-auto max-w-7xl mx-auto h-20 transition-all duration-500">
        <div className="navbar-start">
          {/* Mobile Menu Toggle */}
          <div className="dropdown lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle mr-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            {isMenuOpen && (
              <ul className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-base-100 rounded-[24px] w-72 gap-2 border border-base-content/5 animate-in fade-in zoom-in-95">
                <li><Link href="/" className="py-4 px-6 font-bold text-lg rounded-2xl" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                <li><Link href="/all-books" className="py-4 px-6 font-bold text-lg rounded-2xl" onClick={() => setIsMenuOpen(false)}>Archive</Link></li>
                {session && <li><Link href="/my-profile" className="py-4 px-6 font-bold text-lg rounded-2xl" onClick={() => setIsMenuOpen(false)}>My Profile</Link></li>}
              </ul>
            )}
          </div>

          <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="bg-primary p-2.5 rounded-2xl shadow-xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-transform">
              <BookOpen className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-base-content hidden sm:inline">BookHaven</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link href="/" className="px-8 font-black text-sm uppercase tracking-widest hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/all-books" className="px-8 font-black text-sm uppercase tracking-widest hover:text-primary transition-colors">Archive</Link></li>
            {session && <li><Link href="/my-profile" className="px-8 font-black text-sm uppercase tracking-widest hover:text-primary transition-colors">Profile</Link></li>}
          </ul>
        </div>

        <div className="navbar-end gap-4">
          <button className="btn btn-ghost btn-circle hidden md:flex hover:bg-primary/5">
            <Search className="h-5 w-5" />
          </button>
          
          {isPending ? (
            <div className="w-12 h-12 rounded-2xl bg-base-content/5 animate-pulse" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="group relative outline-none">
                <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-primary/10 ring-offset-2 ring-offset-transparent transition-all group-hover:ring-primary/30">
                  <img
                    alt="Profile"
                    src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-6 z-[1] p-3 shadow-3xl menu dropdown-content bg-base-100 rounded-[32px] w-72 border border-base-content/5 gap-2 animate-in fade-in slide-in-from-top-4"
              >
                <div className="px-6 py-4 border-b border-base-content/5 mb-2">
                  <p className="font-black text-lg leading-tight">{session.user.name}</p>
                  <p className="text-xs opacity-40 font-medium truncate">{session.user.email}</p>
                </div>
                <li>
                  <Link href="/my-profile" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 hover:text-primary font-bold transition-all">
                    <User className="h-5 w-5" />
                    Account Settings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-secondary/5 hover:text-secondary font-bold transition-all">
                    <Bookmark className="h-5 w-5" />
                    Saved Books
                  </Link>
                </li>
                <div className="divider my-2 opacity-5"></div>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-2xl text-error hover:bg-error/5 font-bold transition-all">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-ghost px-8 rounded-2xl font-black text-xs uppercase tracking-widest">Login</Link>
              <Link href="/register" className="btn btn-primary px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Join</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
