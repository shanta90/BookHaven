"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Mail, Lock, User, UserPlus, BookOpen, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const image = "";
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp.email({
        email,
        password,
        name,
        image: image || `https://ui-avatars.com/api/?name=${name}`,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "Failed to register");
      } else {
        toast.success("Account created! Please login.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-base-200 py-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-base-100 rounded-[40px] shadow-3xl overflow-hidden border border-base-content/5 z-10">
        
        {/* Left Side: Brand Block */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-neutral text-neutral-content relative overflow-hidden order-last">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />
          
          <div className="relative z-10 space-y-10">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-secondary p-3 rounded-2xl shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform">
                <BookOpen className="text-white h-8 w-8" />
              </div>
              <span className="text-4xl font-black tracking-tighter">BookHaven</span>
            </Link>
            
            <div className="space-y-6">
              <h2 className="text-6xl font-black leading-[0.9] tracking-tight">
                Join the <br /> <span className="text-secondary italic">Movement.</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Access to 1M+ Premium Titles",
                  "Cross-device Synchronization",
                  "Secure Biometric Integration",
                  "Exclusive Community Events"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-bold opacity-60">
                    <CheckCircle2 className="h-6 w-6 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-md">
            <p className="text-sm font-bold opacity-70 italic leading-relaxed">
              &quot;The most intuitive digital library I&apos;ve ever used. The transition between devices is absolutely seamless.&quot;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Sarah Jenkins</p>
                <p className="text-[10px] opacity-40 font-bold uppercase">PhD Scholar, Oxford</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-base-content">Create Account</h1>
              <p className="text-base-content/40 font-bold uppercase text-xs tracking-[0.2em]">Start your 14-day free trial</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-black text-xs uppercase tracking-widest opacity-40">Full Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/20 z-10 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full h-14 pl-12 bg-base-200 border-transparent focus:border-secondary focus:bg-base-100 rounded-2xl font-bold transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-black text-xs uppercase tracking-widest opacity-40">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/20 z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="input input-bordered w-full h-14 pl-12 bg-base-200 border-transparent focus:border-secondary focus:bg-base-100 rounded-2xl font-bold transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-black text-xs uppercase tracking-widest opacity-40">Password</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/20 z-10 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full h-14 pl-12 bg-base-200 border-transparent focus:border-secondary focus:bg-base-100 rounded-2xl font-bold transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="btn btn-secondary btn-lg w-full h-16 rounded-2xl shadow-2xl shadow-secondary/20 group mt-4" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm" /> : (
                  <>
                    <span className="text-lg">Create Account</span>
                    <UserPlus className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-base-content/5" />
              <span className="text-[10px] font-black text-base-content/20 uppercase tracking-[0.3em]">Or use social</span>
              <div className="flex-1 h-px bg-base-content/5" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full h-16 rounded-2xl border-2 border-base-content/5 flex items-center justify-center gap-4 hover:bg-base-200 transition-all active:scale-[0.98] font-bold text-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>

            <p className="text-center text-sm font-bold text-base-content/30">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary hover:underline ml-1">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
