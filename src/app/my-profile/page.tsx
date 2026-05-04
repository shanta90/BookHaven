"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Shield, Edit2, Calendar, BookMarked } from "lucide-react";
import Link from "next/link";
import { getUserStats } from "../actions/user";

interface UserStats {
  borrowedCount: number;
  waitlistCount: number;
  borrowedItems: unknown[];
  waitlistItems: unknown[];
}

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState<UserStats>({ 
    borrowedCount: 0, 
    waitlistCount: 0,
    borrowedItems: [],
    waitlistItems: []
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/my-profile");
    }

    if (session) {
      setStatsLoading(true);
      getUserStats().then((data) => {
        setStats(data as UserStats);
        setStatsLoading(false);
      });
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700">
        <div className="bg-gradient-to-r from-primary to-secondary h-48 relative">
          <div className="absolute -bottom-16 left-8 p-1 bg-base-100 rounded-full shadow-xl">
            <img 
              src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} 
              alt={session.user.name} 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        </div>
        
        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold flex items-center gap-2">
                {session.user.name}
                <Shield className="h-5 w-5 text-primary" />
              </h1>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <Mail className="h-4 w-4" /> {session.user.email}
              </p>
            </div>
            <Link href="/my-profile/update" className="btn btn-primary rounded-xl px-8 shadow-xl">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </div>

          <div className="divider my-8"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold">Display Name</div>
                    <div className="font-bold">{session.user.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl">
                  <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold">Email Address</div>
                    <div className="font-bold">{session.user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-base-200 p-4 rounded-2xl">
                  <div className="bg-accent/10 p-3 rounded-full text-accent">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold">Joined Date</div>
                    <div className="font-bold">May 2024</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b pb-2">Activity Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="card bg-primary/5 p-6 rounded-3xl text-center border border-primary/10">
                  <div className="text-4xl font-black text-primary mb-1">
                    {statsLoading ? <span className="loading loading-dots loading-sm"></span> : stats.borrowedCount}
                  </div>
                  <div className="text-sm font-bold opacity-60">Books Borrowed</div>
                </div>
                <div className="card bg-secondary/5 p-6 rounded-3xl text-center border border-secondary/10">
                  <div className="text-4xl font-black text-secondary mb-1">
                    {statsLoading ? <span className="loading loading-dots loading-sm"></span> : stats.waitlistCount}
                  </div>
                  <div className="text-sm font-bold opacity-60">Waitlist Items</div>
                </div>
              </div>
              <div className="bg-base-200 p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookMarked className="h-6 w-6 text-primary" />
                  <span className="font-bold">Reading Stats</span>
                </div>
                <div className="badge badge-primary">No data yet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
