import { BookOpen, Globe, Mail, Share2, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-2.5 rounded-2xl shadow-2xl">
                <BookOpen className="text-white h-7 w-7" />
              </div>
              <span className="text-3xl font-black tracking-tighter">BookHaven</span>
            </div>
            <p className="text-neutral-content/50 text-lg leading-relaxed font-medium">
              Empowering global thinkers through a digitized ecosystem of curated knowledge.
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="hover:text-primary transition-all hover:-translate-y-1 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Archives</h4>
            <ul className="space-y-4 text-neutral-content/50 font-bold">
              <li><Link href="/all-books" className="hover:text-primary transition-colors">Everything</Link></li>
              <li><Link href="/all-books?category=Tech" className="hover:text-primary transition-colors">Tech Stack</Link></li>
              <li><Link href="/all-books?category=Science" className="hover:text-primary transition-colors">Science & Biology</Link></li>
              <li><Link href="/all-books?category=Story" className="hover:text-primary transition-colors">Fiction & Soul</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Headquarters</h4>
            <ul className="space-y-6 text-neutral-content/50 font-bold">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <span className="leading-tight">123 Library Lane, Knowledge City, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <span>support@bookhaven.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Newsletter</h4>
            <p className="text-neutral-content/50 text-sm font-medium leading-relaxed">
              Curated arrivals and tech updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input input-bordered w-full h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary text-sm font-bold placeholder:opacity-30"
              />
              <button className="btn btn-primary h-14 w-14 rounded-2xl shrink-0 shadow-2xl shadow-primary/20">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5 my-20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-content/30 font-bold uppercase tracking-widest">
          <p>© 2024 BookHaven. Digital Library Ecosystem.</p>
          <div className="flex gap-12">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
