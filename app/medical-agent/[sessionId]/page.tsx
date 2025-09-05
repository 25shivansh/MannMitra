"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import Vapi from '@vapi-ai/web';
//import vapi from "@vapi-ai/web";


interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}


export default function MedicalAgentPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connected");
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Debug: Log all env vars to see what's available
    console.log("=== ENV DEBUG ===");
    console.log("NEXT_PUBLIC_VAPI_API_KEY:", process.env.NEXT_PUBLIC_VAPI_API_KEY);
    console.log("NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID:", process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    console.log("All NEXT_PUBLIC vars:", Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
    console.log("==================");
    
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (!apiKey) {
      console.error("Vapi API key is missing. Set NEXT_PUBLIC_VAPI_API_KEY.");
      return;
    }

    try {
      vapiRef.current = new Vapi(apiKey);

      vapiRef.current.on('call-start', () => {
        console.log('Call started');
        setIsCallActive(true);
        setConnectionStatus("Voice Call Active");
      });

      vapiRef.current.on('call-end', () => {
        console.log('Call ended');
        setIsCallActive(false);
        setConnectionStatus("Connected");
      });

      vapiRef.current.on('message', (message: any) => {
        if (message?.type === 'transcript') {
          console.log(`${message.role}: ${message.transcript}`);
        }
      });
    } catch (err) {
      console.error('Failed to initialize Vapi:', err);
    }

    return () => {
      try {
        // Best effort to stop an active call on unmount
        vapiRef.current?.stop?.();
      } catch {}
    };
  }, []);

  useEffect(() => {
    // Initialize session with welcome message
    const welcomeMessage: Message = {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Medical Voice Agent. I'm ready to assist you with voice interaction. You can speak to me or use the voice call feature for real-time conversation.",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    
    // Simulate connection status
    const interval = setInterval(() => {
      setConnectionStatus(isConnected ? "Connected" : "Disconnected");
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand your concern. Let me help you with that. Can you provide more details about your symptoms?",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
  };

  const toggleCall = () => {
    // Deprecated: kept for potential future secondary toggle
    if (isCallActive) {
      try { vapiRef.current?.stop?.(); } catch (e) { console.error(e); }
    } else {
      startCall();
    }
  };

  const startCall = async () => {
    // Debug: Log the actual values being used
    console.log("=== START CALL DEBUG ===");
    console.log("API Key:", process.env.NEXT_PUBLIC_VAPI_API_KEY);
    console.log("Assistant ID:", process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
    console.log("========================");
    
    const assistantId = process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;
    if (!assistantId) {
      console.error("Vapi assistant id is missing. Set NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID.");
      return;
    }

    try {
      // Ensure mic permission prompt occurs in user gesture
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (permErr) {
        console.error('Microphone permission denied or unavailable:', permErr);
        return;
      }

      await vapiRef.current?.start(assistantId);
    } catch (err) {
      console.error('Failed to start Vapi call:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F0E] to-[#111827] relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F0E]/50 to-[#111827]/50"></div>
      
      {/* Main Content */}
      <div className="relative z-10 px-6 pt-32 pb-8 max-w-4xl mx-auto">
        {/* Connection Status Bar */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-gray-300 font-medium">Status: {connectionStatus}</span>
          </div>
          <div className="text-gray-400 text-sm">
            Session: <span className="text-green-300 font-mono">{sessionId}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent mb-4">
            AI Medical Voice Agent
          </h1>
          <p className="text-gray-400 text-lg">
            Voice-Enabled Medical Assistant
          </p>
        </div>

        {/* Chat Container */}
        <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-700/50 p-6 mb-6">
          {/* Messages */}
          <div className="h-96 overflow-y-auto mb-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-green-300 to-teal-400 text-gray-900"
                      : "bg-gray-800/50 text-gray-200 border border-gray-700/50"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 text-gray-200 border border-gray-700/50 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or health concern..."
              className="flex-1 bg-gray-800/50 border-gray-700/50 text-gray-200 placeholder-gray-500 focus:border-green-300/50"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-green-300 to-teal-400 text-gray-900 hover:shadow-[0_0_15px_#34D399] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Voice Controls - Primary Focus */}
        <div className="space-y-6">
          {/* Main Voice Call Button */}
          <div className="text-center">
            <Button
              onClick={() => (isCallActive ? vapiRef.current?.stop?.() : startCall())}
              size="lg"
              className={`w-32 h-32 rounded-full text-lg font-semibold transition-all duration-300 ${
                isCallActive 
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]" 
                  : "bg-gradient-to-r from-green-300 to-teal-400 text-gray-900 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]"
              }`}
            >
              {isCallActive ? (
                <div className="flex flex-col items-center">
                  <PhoneOff className="w-8 h-8 mb-2" />
                  <span>End Call</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 mb-2" />
                  <span>Start Voice Call</span>
                </div>
              )}
            </Button>
            <p className="text-gray-400 text-sm mt-3">
              {isCallActive ? "Voice call is active" : "Click to start voice conversation"}
            </p>
          </div>

          {/* Secondary Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "outline"}
              size="lg"
              className={`${
                isRecording 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "border-gray-700/50 text-gray-300 hover:bg-gray-800/50"
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
              {isRecording ? "Stop Recording" : "Voice Input"}
            </Button>
          </div>
        </div>

        {/* Voice Status Indicator */}
        {isCallActive && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">Voice call in progress</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
