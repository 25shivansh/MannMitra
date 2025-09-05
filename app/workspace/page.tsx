"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddNewSession } from "@/components/AddNewSession";
import React, { useState } from "react";

export default function WorkspacePage() {
  const [sessions, setSessions] = useState<any[]>([]);

  const handleSessionCreated = (sessionData: any) => {
    setSessions(prev => [sessionData, ...prev]);
    console.log("New session created:", sessionData);
    // You can add additional logic here like redirecting to the session
    // or showing a success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F0E] to-[#111827] relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E]/50 to-[#111827]/50"></div>
      
      {/* Main Content - Add top padding to account for fixed header */}
      <div className="relative z-10 px-6 pt-24 pb-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent mb-4">
              Your AI Medical Voice Agent
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Experience personalized healthcare with our advanced AI specialists. Get instant medical insights and consultations tailored to your needs.
            </p>
            <AddNewSession onSessionCreated={handleSessionCreated} />
          </Card>
        </div>

        {/* AI Specialist Doctors Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent text-center mb-8">
            AI Specialist Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Chen",
                specialization: "Cardiology Specialist",
                description: "Expert in heart health and cardiovascular diagnostics with 15+ years of experience.",
                agentPrompt:"You are a friendly and approachable Mental Health Expert and offer helpful suggestion or next steps in a calm and caring tone."
              },
              {
                name: "Dr. Michael Rodriguez",
                specialization: "Neurology Expert",
                description: "Specialized in brain and nervous system disorders, providing comprehensive neurological care."
                
              },
              {
                name: "Dr. Emily Watson",
                specialization: "Pediatrics Specialist",
                description: "Dedicated to children's health with expertise in developmental and behavioral medicine."
              },
              {
                name: "Dr. James Park",
                specialization: "Dermatology Expert",
                description: "Advanced skin care specialist focusing on both medical and cosmetic dermatology."
              },
              {
                name: "Dr. Lisa Thompson",
                specialization: "Mental Health",
                description: "Psychiatry and psychology expert helping with anxiety, depression, and mental wellness."
              },
              {
                name: "Dr. David Kumar",
                specialization: "Emergency Medicine",
                description: "Critical care specialist providing immediate medical attention and emergency diagnostics."
              }
            ].map((doctor, index) => (
              <Card key={index} className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 p-6 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4 border-2 border-green-300/30 flex items-center justify-center">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <h3 className="text-green-300 font-semibold text-lg mb-2">{doctor.name}</h3>
                  <p className="text-gray-200 font-medium mb-3">{doctor.specialization}</p>
                  <p className="text-gray-400 text-sm mb-4">{doctor.description}</p>
                  <AddNewSession onSessionCreated={handleSessionCreated} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Consultations Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent text-center mb-8">
            Recent Consultations
          </h2>
          <Card className="bg-gradient-to-br from-slate-900 to-gray-900 border-gray-700/50 p-12 text-center">
            <div className="w-16 h-16 bg-teal-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <span className="text-2xl text-teal-300">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Recent Consultations</h3>
            <p className="text-gray-400 mb-6">Start your first consultation to see your medical history here.</p>
            <AddNewSession onSessionCreated={handleSessionCreated} />
          </Card>
        </div>
      </div>
    </div>
  );
}