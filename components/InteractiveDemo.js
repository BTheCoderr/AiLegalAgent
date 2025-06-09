import { useState } from 'react';
import Link from 'next/link';

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "AI Legal Q&A",
      description: "Ask complex legal questions and get instant, cited answers",
      example: "What are Massachusetts LLC formation requirements?",
      action: "Try asking about GDPR compliance, employment law, or corporate formation",
      link: "/ask-ai",
      color: "bg-blue-500"
    },
    {
      title: "Smart Case Triage", 
      description: "Automatically classify and prioritize legal issues",
      example: "I need help with an employment contract dispute",
      action: "See how we classify and route different legal scenarios",
      link: "/triage",
      color: "bg-green-500"
    },
    {
      title: "Document Generation",
      description: "Generate MA/RI/CT-specific legal documents with pricing",
      example: "Create an NDA for a Boston tech startup - $500",
      action: "Generate NDAs, employment agreements, privacy policies",
      link: "/generate-document", 
      color: "bg-purple-500"
    },
    {
      title: "Attorney Review Queue",
      description: "Human-in-loop compliance with jurisdiction tracking",
      example: "All documents require licensed attorney approval",
      action: "See the complete approval workflow in action",
      link: "/review-queue",
      color: "bg-orange-500"
    },
    {
      title: "Admin Analytics",
      description: "Real-time metrics and performance dashboards", 
      example: "Track cases triaged, documents generated, approval rates",
      action: "View comprehensive business metrics and KPIs",
      link: "/admin-metrics",
      color: "bg-indigo-500"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const currentStepData = demoSteps[currentStep];

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
      {!isPlaying ? (
        // Demo Start Screen
        <div className="text-center">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-opacity-30 transition-all"
                   onClick={startDemo}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white text-lg font-medium">Interactive Demo</p>
              <p className="text-gray-300 text-sm">5 minute walkthrough</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Platform Demo</h3>
          <p className="text-gray-600 mb-4">Experience all 5 core features with real legal scenarios</p>
          <button 
            onClick={startDemo}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Interactive Demo
          </button>
        </div>
      ) : (
        // Interactive Demo Player
        <div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {demoSteps.length}</span>
              <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Step Content */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${currentStepData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-white font-bold text-xl">{currentStep + 1}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h3>
            <p className="text-gray-600 mb-4">{currentStepData.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 mb-2">Example:</p>
              <p className="font-medium text-gray-900">"{currentStepData.example}"</p>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">{currentStepData.action}</p>
          </div>

          {/* Demo Controls */}
          <div className="flex justify-between items-center">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex space-x-3">
              <Link 
                href={currentStepData.link}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try This Feature
              </Link>
              
              {currentStep < demoSteps.length - 1 ? (
                <button 
                  onClick={nextStep}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Next Step →
                </button>
              ) : (
                <Link 
                  href="/ask-ai"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Start Using Platform
                </Link>
              )}
            </div>

            <button 
              onClick={() => setIsPlaying(false)}
              className="px-4 py-2 text-gray-400 hover:text-gray-600"
            >
              Exit Demo
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 