"use client";

import { useState, useMemo } from "react";
import { getBooks, searchBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";
import { Search, Filter, X, Grid, List, SlidersHorizontal, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CATEGORIES = ["All", "Story", "Tech", "Science"];

export default function AllBooksPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return searchBooks(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Page Header */}
      <section className="bg-neutral text-neutral-content pt-32 pb-44 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-content font-bold text-xs uppercase tracking-widest">
              <Sparkles className="h-3 w-3" />
              <span>Discover Knowledge</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">The Library Archive</h1>
            <p className="text-xl opacity-70 leading-relaxed max-w-2xl">
              Browse through our curated collection of over 12,000 digital volumes. 
              Find exactly what you need with our advanced filtering system.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area - Adjusted overlap to prevent search bar collisions */}
      <div className="container mx-auto px-4 -mt-20 pb-24 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Enhanced Sidebar Filter */}
          <aside className={`
            lg:w-80 space-y-8
            fixed lg:relative inset-0 z-[150] lg:z-0 p-6 lg:p-0 bg-base-100 lg:bg-transparent
            ${isSidebarOpen ? 'block overflow-y-auto' : 'hidden lg:block'}
          `}>
            <div className="flex justify-between items-center mb-8 lg:hidden">
              <h2 className="text-2xl font-black">Filters</h2>
              <button className="btn btn-ghost btn-circle" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="glass p-8 rounded-[32px] border border-base-content/5 space-y-8 shadow-xl">
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                  <SlidersHorizontal className="h-4 w-4" />
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button 
                      key={cat}
                      className={`
                        flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all
                        ${selectedCategory === cat 
                          ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-[1.02]' 
                          : 'hover:bg-base-200 text-base-content/70'}
                      `}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <span>{cat}</span>
                      <span className="text-xs opacity-50">120+</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="divider opacity-5"></div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 opacity-60">
                  Availability
                </h3>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" className="checkbox checkbox-primary rounded-lg" />
                    <span className="label-text font-bold opacity-70">Available Now</span>
                  </label>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-[24px] border border-primary/10">
                <p className="text-xs font-bold text-primary mb-2 italic">Librarian's Tip</p>
                <p className="text-xs leading-relaxed opacity-60">
                  Try searching by author name if you can't find a specific title.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Results Grid */}
          <div className="flex-grow space-y-8">
            {/* Search and View Controls */}
            <div className="glass p-4 rounded-[28px] border border-base-content/5 shadow-lg flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search titles, authors, or topics..."
                  className="input w-full pl-14 h-14 rounded-2xl bg-transparent border-none focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  className="btn btn-ghost md:hidden flex-grow"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Filter className="h-5 w-5" />
                </button>
                <div className="join hidden sm:flex">
                  <button className="btn btn-ghost join-item btn-active"><Grid className="h-5 w-5" /></button>
                  <button className="btn btn-ghost join-item"><List className="h-5 w-5" /></button>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex justify-between items-center px-2">
              <p className="font-bold opacity-60 italic">
                Discovering {filteredBooks.length} treasures in {selectedCategory}
              </p>
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="card-hover">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 glass rounded-[40px] border border-dashed border-base-content/10">
                <div className="text-8xl mb-6">🕵️‍♂️</div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">Zero Chapters Found</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                  The archives seem empty for this search. Try broadening your criteria or exploring other categories.
                </p>
                <button 
                  className="btn btn-primary px-10 rounded-2xl"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Reset Discovery
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
