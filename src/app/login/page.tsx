"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowRight, BookOpen, Sparkles, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password, callbackURL: redirect });
      if (error) {
        toast.error(error.message || "Failed to login");
      } else {
        toast.success("Welcome back!");
        router.push(redirect);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: redirect });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-base-200">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-base-100 rounded-[40px] shadow-3xl overflow-hidden border border-base-content/5 z-10">
        
        {/* Left Side: Visual/Brand */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-neutral text-neutral-content relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10" />
          
          <div className="relative z-10 space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-primary p-3 rounded-2xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                <BookOpen className="text-white h-8 w-8" />
              </div>
              <span className="text-4xl font-black tracking-tighter">BookHaven</span>
            </Link>
            <h2 className="text-6xl font-black leading-[0.9] tracking-tight">
              Unlock the <br /> <span className="text-primary italic">Archive.</span>
            </h2>
            <p className="text-xl opacity-50 font-medium max-w-xs leading-relaxed">
              Experience the next generation of digital literature with our state-of-the-art encryption.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-neutral bg-base-300 overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Joined by 50k+ readers</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="max-w-md mx-auto w-full space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-base-content">Welcome back</h1>
              <p className="text-base-content/40 font-bold uppercase text-xs tracking-[0.2em]">Enter your credentials to access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-black text-xs uppercase tracking-widest opacity-40">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/20 z-10 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="input input-bordered w-full h-16 pl-12 bg-base-200 border-transparent focus:border-primary focus:bg-base-100 rounded-2xl font-bold transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <div className="flex justify-between items-center mb-1">
                  <label className="label py-0">
                    <span className="label-text font-black text-xs uppercase tracking-widest opacity-40">Password</span>
                  </label>
                  <Link href="#" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/20 z-10 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full h-16 pl-12 bg-base-200 border-transparent focus:border-primary focus:bg-base-100 rounded-2xl font-bold transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="checkbox checkbox-primary rounded-lg border-2" />
                  <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest group-hover:text-base-content transition-colors">Remember me</span>
                </label>
              </div>

              <button className="btn btn-primary btn-lg w-full h-16 rounded-2xl shadow-2xl shadow-primary/20 group" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm" /> : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <LogIn className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-base-content/5" />
              <span className="text-[10px] font-black text-base-content/20 uppercase tracking-[0.3em]">Secure Social Access</span>
              <div className="flex-1 h-px bg-base-content/5" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full h-16 rounded-2xl border-2 border-base-content/5 flex items-center justify-center gap-4 hover:bg-base-200 transition-all active:scale-[0.98] font-bold text-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center text-sm font-bold text-base-content/30">
              New here?{" "}
              <Link href="/register" className="text-primary hover:underline ml-1">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
