"use client";

import Link from "next/link";
import { getFeaturedBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowRight, BookCheck, Clock, Shield, Star, Zap, Sparkles } from "lucide-react";

export default function Home() {
  const featuredBooks = getFeaturedBooks();

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      {/* ── Hero: The Stage ── */}
      <section className="relative min-h-[92vh] flex items-center pt-24">
        <div className="pointer-events-none absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left z-20 glass p-12 rounded-[40px] border-white/50 shadow-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest animate-pulse">
              <Sparkles className="h-4 w-4" />
              Next-Gen Digital Library
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-base-content">
              Your World <br />
              <span className="text-primary italic">Digitized.</span>
            </h1>

            <p className="text-xl md:text-2xl text-base-content/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Join a global community of thinkers. Access premium titles with zero latency and state-of-the-art encryption.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
              <Link href="/all-books" className="btn btn-primary btn-lg rounded-2xl px-12 h-16 text-lg shadow-2xl">
                Explore All
                <ArrowRight className="h-6 w-6 ml-2" />
              </Link>
              <Link href="/register" className="btn btn-ghost btn-lg rounded-2xl px-12 h-16 text-lg border border-base-content/10">
                Get Started
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 grayscale opacity-30">
              <span className="font-bold text-xs uppercase tracking-[0.3em]">Built with</span>
              <div className="flex gap-6 font-black text-2xl italic">
                <span>NEXT.JS</span>
                <span>TAILWIND</span>
                <span>MONGO</span>
              </div>
            </div>
          </div>

          {/* Mosaic: Image depth */}
          <div className="relative hidden lg:block z-10">
            <div className="grid grid-cols-2 gap-6 scale-110 translate-x-12">
              <div className="space-y-6 pt-20">
                <div className="h-[350px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 animate-soft-float">
                  <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                </div>
                <div className="h-[250px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white/10">
                  <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-[250px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white/10">
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                </div>
                <div className="h-[350px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 animate-soft-float [animation-delay:2s]">
                  <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker: Premium Silk Move */}
      <div className="glass border-y border-base-content/5 py-8">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-base-100 to-transparent z-10" />
          <div className="animate-marquee-silk flex items-center">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-8 text-3xl font-black uppercase tracking-tighter opacity-70 italic whitespace-nowrap">
                <div className="flex items-center gap-4"><Zap className="h-8 w-8 text-primary" /> New Releases</div>
                <div className="flex items-center gap-4"><Shield className="h-8 w-8 text-secondary" /> Secure</div>
                <div className="flex items-center gap-4"><Star className="h-8 w-8 text-accent" /> 24/7 Access</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tight text-base-content">The Curator's List</h2>
            <p className="text-xl text-base-content/50 max-w-xl leading-relaxed">Handpicked masterpieces that define genres and spark imagination.</p>
          </div>
          <Link href="/all-books" className="btn btn-outline btn-lg rounded-2xl border-2 px-10 h-16 hover:bg-primary hover:border-primary group">
            Full Archive
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 4 },
          }}
          className="p-20"
        >
          {featuredBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-6">
        <div className="bg-neutral text-neutral-content p-20 rounded-[60px] text-center space-y-10 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-6xl font-black tracking-tight">Ready to start?</h2>
            <p className="text-2xl opacity-60 max-w-2xl mx-auto font-medium leading-relaxed">Join 50,000+ readers who have unlocked the future of knowledge.</p>
            <div className="flex justify-center gap-6 pt-4">
              <Link href="/register" className="btn btn-primary btn-lg rounded-2xl px-12 h-16 text-xl">Sign Up Free</Link>
              <Link href="/login" className="btn btn-ghost btn-lg rounded-2xl px-12 h-16 text-xl border border-white/10">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
