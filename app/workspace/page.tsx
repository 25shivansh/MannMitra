"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddNewSession } from "@/components/AddNewSession";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/contexts/session-context";

export default function WorkspacePage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const router = useRouter();
  const { isAuthenticated, loading } = useSession();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleSessionCreated = (sessionData: any) => {
    setSessions(prev => [sessionData, ...prev]);
    console.log("New session created:", sessionData);
    // You can add additional logic here like redirecting to the session
    // or showing a success message
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F0E] to-[#111827] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E]/50 to-[#111827]/50"></div>
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
           style={{ background: "radial-gradient(closest-side, rgba(45,212,191,0.5), transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
           style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.45), transparent 70%)" }} />
      {/* Subtle dotted grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
           style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      
      <div className="relative z-10 px-6 pt-28 pb-16 max-w-5xl mx-auto">
        <Card className="w-full bg-gray-900/70 backdrop-blur-sm border-gray-700/50 p-10 md:p-12 text-center shadow-[0_0_35px_rgba(52,211,153,0.18)]">
          <div className="w-20 h-20 bg-teal-500/15 rounded-full mx-auto mb-6 border border-teal-400/30 flex items-center justify-center animate-pulse">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent mb-4">
            AI Mental Health Counselor
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Compassionate, private, and evidence-based support. Start a confidential conversation with our AI counselor.
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
            <div className="rounded-lg border border-gray-700/50 bg-gray-800/40 px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-gray-300"><span>🔒</span><span className="text-sm">Private & secure</span></div>
            </div>
            <div className="rounded-lg border border-gray-700/50 bg-gray-800/40 px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-gray-300"><span>🕒</span><span className="text-sm">Available 24/7</span></div>
            </div>
            <div className="rounded-lg border border-gray-700/50 bg-gray-800/40 px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-gray-300"><span>🧭</span><span className="text-sm">Guided next steps</span></div>
            </div>
          </div>

          <AddNewSession onSessionCreated={handleSessionCreated} />

          {/* Subtext */}
          <p className="text-gray-500 text-sm mt-4">You can stop anytime. Your conversations stay on your device session.</p>
        </Card>
      </div>
    </div>
  );
}