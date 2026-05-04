import { Book } from "@/lib/books";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="premium-card group h-[520px] flex flex-col overflow-hidden">
      <figure className="h-72 overflow-hidden relative shrink-0">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 z-10 transition-transform duration-500 group-hover:scale-110">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl ${book.available_quantity > 0 ? "bg-emerald-500" : "bg-rose-500"}`}>
            {book.available_quantity > 0 ? "In Stock" : "Reserved"}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <div className="flex items-center gap-1 text-amber-400">
             <Star className="h-4 w-4 fill-amber-400" />
             <Star className="h-4 w-4 fill-amber-400" />
             <Star className="h-4 w-4 fill-amber-400" />
             <Star className="h-4 w-4 fill-amber-400" />
             <Star className="h-4 w-4 fill-amber-400" />
           </div>
        </div>
      </figure>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex-grow space-y-2">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{book.category}</span>
          <h2 className="text-2xl font-black text-base-content leading-tight line-clamp-2" title={book.title}>
            {book.title}
          </h2>
          <p className="text-sm font-medium text-base-content/40 italic">by {book.author}</p>
        </div>

        <div className="pt-6">
          <Link href={`/books/${book.id}`} className="btn btn-primary w-full h-14 rounded-2xl flex items-center justify-center gap-3">
            <span className="text-sm">View Details</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
