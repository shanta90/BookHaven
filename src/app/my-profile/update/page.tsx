"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { User, Image, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login?redirect=/my-profile/update");
      } else {
        setName(session.user.name);
        setImage(session.user.image || "");
      }
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await updateUser({
        name,
        image
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/my-profile");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Link href="/my-profile" className="btn btn-ghost mb-8 gap-2 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Profile
      </Link>

      <div className="card bg-base-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-primary p-8 text-primary-content text-center">
          <h1 className="text-3xl font-bold mb-2">Update Profile</h1>
          <p className="opacity-80">Keep your information up to date</p>
        </div>
        
        <form onSubmit={handleUpdate} className="card-body gap-6">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary ring ring-primary/20 ring-offset-4 ring-offset-base-100">
                <img 
                  src={image || `https://ui-avatars.com/api/?name=${name}`} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Image className="text-white h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Display Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full pl-10 h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Profile Image URL</span>
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full pl-10 h-12"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button 
              className={`btn btn-primary btn-lg shadow-2xl shadow-primary/10 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {!loading && <Save className="h-5 w-5 mr-2" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
