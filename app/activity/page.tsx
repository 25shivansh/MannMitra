"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardList, Brain, Activity, Timer, ArrowRight } from "lucide-react";

const ScreeningSelection = () => {
  const router = useRouter();

  const screeningOptions = [
    {
      id: "phq9",
      title: "PHQ-9",
      description: "Depression Screening Questionnaire",
      duration: "5 minutes",
      questions: "9 questions",
      icon: <ClipboardList className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      id: "gad7",
      title: "GAD-7",
      description: "Anxiety Disorder Assessment",
      duration: "3 minutes",
      questions: "7 questions",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      id: "ghq",
      title: "GHQ",
      description: "General Health Questionnaire",
      duration: "10 minutes",
      questions: "12 questions",
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-950",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
  ];

  const handleScreeningSelect = (screeningId: string) => {
    // router.push(**/screening/${screeningId}**);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Mental Health Screening
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Select the assessment that best suits your needs
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screeningOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`relative overflow-hidden border-2 ${option.borderColor} ${option.color} hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    {option.icon}
                    <CardTitle className="text-2xl font-bold">
                      {option.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 mb-6">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      {option.duration}
                    </Badge>
                    <Badge variant="secondary">
                      {option.questions}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full group"
                    size="lg"
                    onClick={() => handleScreeningSelect(option.id)}
                  >
                    Start Assessment
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-600 dark:text-gray-400"
        >
          <p className="text-sm">
            All assessments are confidential and follow healthcare guidelines
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScreeningSelection;
