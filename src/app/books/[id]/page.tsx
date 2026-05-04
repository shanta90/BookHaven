"use client";

import { useSession } from "@/lib/auth-client";
import { getBookById } from "@/lib/books";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BookOpen, User, Calendar, CheckCircle, ArrowLeft, Bookmark, Star, Share2, Info, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { addToWaitlist, borrowBook } from "@/app/actions/user";

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [book, setBook] = useState<any>(null);
  const [isActing, setIsActing] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please login to view book details");
      router.push(`/login?redirect=/books/${id}`);
    }
  }, [session, isPending, id, router]);

  useEffect(() => {
    if (id) {
      const foundBook = getBookById(id as string);
      setBook(foundBook);
    }
  }, [id]);

  const handleBorrow = async () => {
    setIsActing(true);
    try {
      if (book.available_quantity > 0) {
        await borrowBook(book.id, book.title);
        toast.success(`${book.title} has been successfully borrowed! Check your profile for details.`);
        setBook({ ...book, available_quantity: book.available_quantity - 1 });
      } else {
        await addToWaitlist(book.id, book.title);
        toast.success(`You've been added to the waitlist for ${book.title}.`);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to complete action");
    } finally {
      setIsActing(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="font-bold opacity-50 animate-pulse">Entering the Archives...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Book not found</h2>
        <Link href="/all-books" className="btn btn-primary mt-4">Back to Collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4 py-12 max-w-7xl animate-in fade-in slide-in-from-top-4 duration-1000">
        <Link href="/all-books" className="btn btn-ghost mb-8 gap-2 group hover:bg-primary/5">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Cover Art Section - 5 columns */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass p-4 rounded-[40px] border border-white/20 shadow-2xl overflow-hidden aspect-[3/4]">
                <img 
                  src={book.image_url} 
                  alt={book.title} 
                  className="w-full h-full object-cover rounded-[32px] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                  <div className={`badge badge-lg py-6 px-6 font-black shadow-2xl border-none ${book.available_quantity > 0 ? "bg-success text-success-content" : "bg-error text-error-content"}`}>
                    {book.available_quantity > 0 ? `${book.available_quantity} Copies` : "Out of Stock"}
                  </div>
                  <button className="btn btn-circle btn-lg glass border-white/20 shadow-xl">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section - 7 columns */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="badge badge-primary badge-outline font-black uppercase tracking-widest px-4 py-3">{book.category}</div>
                <div className="flex text-warning">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-warning" />)}
                </div>
                <span className="text-sm font-bold opacity-40">(248 Reviews)</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                {book.title}
              </h1>
              <div className="flex items-center gap-4 py-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img src={`https://ui-avatars.com/api/?name=${book.author}&background=random`} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-40">Written By</p>
                  <p className="text-xl font-bold">{book.author}</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border border-base-content/5 space-y-6">
              <div className="flex items-center gap-2 text-xl font-black">
                <Info className="h-6 w-6 text-primary" />
                <h2>The Narrative</h2>
              </div>
              <p className="text-xl text-base-content/70 leading-relaxed italic font-medium">
                "{book.description}"
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-base-200/50 p-6 rounded-3xl space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Condition</p>
                  <p className="font-bold flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Pristine</p>
                </div>
                <div className="bg-base-200/50 p-6 rounded-3xl space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Format</p>
                  <p className="font-bold flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Hardcover</p>
                </div>
                <div className="bg-base-200/50 p-6 rounded-3xl space-y-1 hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Published</p>
                  <p className="font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-secondary" /> Oct 2023</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                className={`
                  btn btn-primary btn-lg flex-grow h-20 rounded-3xl text-xl font-black shadow-2xl shadow-primary/20 transition-all active:scale-95
                  ${(book.available_quantity <= 0 && !isActing) ? "btn-secondary" : ""}
                `}
                onClick={handleBorrow}
                disabled={isActing}
              >
                {isActing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    {book.available_quantity > 0 ? "Reserve & Borrow" : "Join Waiting List"}
                  </>
                )}
              </button>
              <button className="btn btn-outline btn-lg h-20 px-8 rounded-3xl border-2 hover:bg-neutral hover:border-neutral">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-center sm:text-left text-xs opacity-40 font-bold px-4">
              * Digital delivery available within minutes. Physical copies must be returned within 14 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
