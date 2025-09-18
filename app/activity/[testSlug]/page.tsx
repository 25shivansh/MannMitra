// This must be a Client Component to use state and handle events
'use client'; 

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { getTestBySlug } from '@/lib/screenings'; // Make sure this path is correct
import type { Answers, ResultData } from '@/types';

export default function ScreeningPage({ params }: { params: Promise<{ testSlug: string }> }) {
  const resolvedParams = use(params);
  const testData = getTestBySlug(resolvedParams.testSlug);
  
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // If the URL slug is invalid, show a 404 page
  if (!testData) {
    notFound();
  }

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/screening/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testSlug: resolvedParams.testSlug,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit screening. Please try again.');
      }

      const data: ResultData = await response.json();
      setResult(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormComplete = Object.keys(answers).length === testData.questions.length;

  // If we have a result, show the result view
  if (result) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">MannMitra</h1>
                  <p className="text-sm text-gray-400">AI-Powered Care, Human-Centered Support</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">About Mann Mitra</a>
                <button className="p-2 text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                  Sign In
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Results Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Your Results</h2>
              <p className="text-xl text-gray-300">{testData.title}</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-gray-300">Total Score</span>
                  <span className="text-2xl font-bold text-teal-400">{result.score}</span>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-3">Interpretation</h3>
                <div className="bg-gray-600 rounded-lg p-4 mb-4">
                  <span className="inline-block bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Severity Level
                  </span>
                  <p className="text-white font-medium">{result.interpretation.severity}</p>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-3">Recommendation</h3>
                <div className="bg-blue-900/50 border border-blue-800 rounded-lg p-4">
                  <p className="text-blue-100">{result.interpretation.recommendation}</p>
                </div>
              </div>
              
              <div className="bg-amber-900/50 border border-amber-800 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-amber-300 font-medium mb-1">Important Disclaimer</h4>
                    <p className="text-amber-100 text-sm">This is a screening tool, not a diagnosis. Please consult a healthcare professional for a formal diagnosis.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setResult(null)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Take Another Assessment
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Otherwise, show the questionnaire form
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">MannMitra</h1>
                <p className="text-sm text-gray-400">AI-Powered Care, Human-Centered Support</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About Mann Mitra</a>
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{testData.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{testData.description}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {testData.questions.map((q: any, index: any) => (
            <div key={q.id} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white leading-relaxed">{q.text}</h3>
              </div>
              
              <div className="space-y-3 ml-12">
                {q.options.map((option: any) => (
                  <label 
                    key={option.value}
                    className="flex items-center p-4 rounded-xl bg-gray-700 hover:bg-gray-650 transition-colors cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option.value}
                      onChange={() => handleAnswerChange(q.id, option.value)}
                      required
                      className="w-5 h-5 text-teal-500 bg-gray-600 border-gray-500 focus:ring-teal-500 focus:ring-2 mr-4"
                    />
                    <span className="text-gray-200 group-hover:text-white transition-colors font-medium">
                      {option.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          {/* Progress indicator */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Progress</span>
              <span className="text-sm text-teal-400 font-medium">
                {Object.keys(answers).length} of {testData.questions.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(answers).length / testData.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/50 border border-red-800 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}
          
          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={!isFormComplete || isLoading}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isFormComplete && !isLoading
                  ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Calculating Your Results...</span>
                </div>
              ) : (
                'Get My Assessment Results'
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}