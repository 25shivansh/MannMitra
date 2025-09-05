"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, MessageCircle, Heart, Brain, Users } from "lucide-react";

interface AddNewSessionProps {
  onSessionCreated?: (sessionData: any) => void;
}

export function AddNewSession({ onSessionCreated }: AddNewSessionProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: "",
    title: "",
    description: "",
    duration: "30",
    privacy: "private",
    focusArea: "",
  });

  const sessionTypes = [
    {
      value: "therapy",
      label: "Therapy Session",
      description: "One-on-one therapeutic conversation",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      value: "counseling",
      label: "Counseling",
      description: "Guidance and support for life challenges",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      value: "mindfulness",
      label: "Mindfulness",
      description: "Meditation and mindfulness practices",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      value: "group",
      label: "Group Session",
      description: "Shared therapeutic experience",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const focusAreas = [
    "Anxiety & Stress",
    "Depression",
    "Relationships",
    "Self-Esteem",
    "Trauma Recovery",
    "Life Transitions",
    "Career Guidance",
    "Family Issues",
    "Addiction Recovery",
    "Grief & Loss",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create session data
      const sessionId = Date.now().toString();
      const sessionData = {
        ...formData,
        id: sessionId,
        sessionId: sessionId,
        createdAt: new Date().toISOString(),
        status: "active",
      };

      // Call the callback if provided
      onSessionCreated?.(sessionData);
      
      // Reset form
      setFormData({
        sessionType: "",
        title: "",
        description: "",
        duration: "30",
        privacy: "private",
        focusArea: "",
      });
      
      setOpen(false);
      
      // Redirect to medical agent page with sessionId
      router.push(`/medical-agent/${sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.sessionType && formData.title && formData.description;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-300 to-teal-400 text-gray-900 hover:shadow-[0_0_15px_#34D399] rounded-full px-6 py-2 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Consult AI Councellor Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] overflow-y-auto bg-gray-900/95 backdrop-blur-sm border-gray-700/50 mx-4 my-8">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-green-300 via-teal-200 to-purple-300 bg-clip-text text-transparent mb-3">
            Start New Session
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-lg max-w-md mx-auto">
            Create a new therapy or counseling session tailored to your needs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 px-2">
          {/* Session Type Selection */}
          <div className="space-y-4">
            <Label className="text-gray-300 font-medium text-center block text-lg">Session Type</Label>
            <RadioGroup
              value={formData.sessionType}
              onValueChange={(value) => handleInputChange("sessionType", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
            >
              {sessionTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={type.value} id={type.value} className="text-green-300" />
                  <Label
                    htmlFor={type.value}
                    className="flex items-center space-x-2 cursor-pointer flex-1 p-3 rounded-lg border border-gray-700/50 hover:border-green-300/50 transition-colors"
                  >
                    <span className="text-green-300">{type.icon}</span>
                    <div>
                      <div className="font-medium text-gray-200">{type.label}</div>
                      <div className="text-sm text-gray-400">{type.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Session Title */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <Label htmlFor="title" className="text-gray-300 font-medium text-center block text-lg">
              Session Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Weekly Check-in, Anxiety Management"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-gray-800/50 border-gray-700/50 text-gray-200 placeholder-gray-500 focus:border-green-300/50 w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <Label htmlFor="description" className="text-gray-300 font-medium text-center block text-lg">
              What would you like to focus on?
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what you'd like to discuss or work on in this session..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="bg-gray-800/50 border-gray-700/50 text-gray-200 placeholder-gray-500 focus:border-green-300/50 min-h-[120px] w-full resize-none"
            />
          </div>

          {/* Focus Area */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <Label htmlFor="focusArea" className="text-gray-300 font-medium text-center block text-lg">
              Focus Area (Optional)
            </Label>
            <Select
              value={formData.focusArea}
              onValueChange={(value) => handleInputChange("focusArea", value)}
            >
              <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-gray-200 focus:border-green-300/50 w-full">
                <SelectValue placeholder="Select a focus area" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {focusAreas.map((area) => (
                  <SelectItem key={area} value={area} className="text-gray-200 hover:bg-gray-700">
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration and Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-gray-300 font-medium text-center block text-lg">
                Duration (minutes)
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleInputChange("duration", value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-gray-200 focus:border-green-300/50 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="15" className="text-gray-200 hover:bg-gray-700">15 minutes</SelectItem>
                  <SelectItem value="30" className="text-gray-200 hover:bg-gray-700">30 minutes</SelectItem>
                  <SelectItem value="45" className="text-gray-200 hover:bg-gray-700">45 minutes</SelectItem>
                  <SelectItem value="60" className="text-gray-200 hover:bg-gray-700">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300 font-medium text-center block text-lg">Privacy</Label>
              <RadioGroup
                value={formData.privacy}
                onValueChange={(value) => handleInputChange("privacy", value)}
                className="flex justify-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" className="text-green-300" />
                  <Label htmlFor="private" className="text-gray-300 cursor-pointer">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shared" id="shared" className="text-green-300" />
                  <Label htmlFor="shared" className="text-gray-300 cursor-pointer">Shared</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="flex justify-center gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800/50 px-8 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="bg-gradient-to-r from-green-300 to-teal-400 text-gray-900 hover:shadow-[0_0_15px_#34D399] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2"
            >
              {isLoading ? "Creating..." : "Start Session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
