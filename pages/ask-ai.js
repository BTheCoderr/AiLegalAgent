import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { MagnifyingGlassIcon, ArrowLeftIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon, HandThumbUpIcon, HandThumbDownIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline'

const sampleQuestions = [
  "How do I make my startup GDPR compliant?",
  "What are the requirements for SOC 2 Type II certification?",
  "What legal documents do I need for Series A fundraising?",
  "How should I structure employee stock option plans?",
  "What are the key provisions in a SaaS customer agreement?",
  "How do I protect my startup's intellectual property?",
  "What are the tax implications of different entity structures?",
  "What compliance requirements apply to fintech startups?"
]

const confidenceColors = {
  high: 'text-green-600 bg-green-50 border-green-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
  low: 'text-red-600 bg-red-50 border-red-200'
}

function getConfidenceLevel(score) {
  if (score >= 70) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

function getConfidenceLabel(score) {
  if (score >= 70) return 'High Confidence'
  if (score >= 40) return 'Medium Confidence'
  return 'Low Confidence'
}

export default function AskAI() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch('/api/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })

      if (!res.ok) {
        throw new Error('Failed to get response')
      }

      const data = await res.json()
      setResponse(data)
      
      // Log query for analytics
      logAnalytics(query, data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleQuestion = (question) => {
    setQuery(question)
    setResponse(null)
    setError(null)
  }

  const handleFeedback = async (responseId, isHelpful) => {
    setFeedback(prev => ({ ...prev, [responseId]: isHelpful }))
    
    // Log feedback to analytics
    if (response) {
      logAnalytics(response.query, response, { helpful: isHelpful })
    }
  }

  const logAnalytics = async (query, responseData, feedbackData = null) => {
    try {
      await fetch('/api/analytics/log-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          response: responseData.answer,
          confidence: responseData.confidence,
          sources: responseData.sources,
          feedback: feedbackData,
          processingMode: responseData.processingMode,
          userId: 'demo_user',
          sessionId: `session_${Date.now()}`
        })
      })
    } catch (error) {
      console.error('Failed to log analytics:', error)
    }
  }

  const formatSource = (source) => {
    return {
      displayName: source.filename.replace(/[-_]/g, ' ').replace('.txt', '').replace(/\b\w/g, l => l.toUpperCase()),
      area: Array.isArray(source.legalArea) ? source.legalArea[0] : source.legalArea,
      type: source.documentType,
      complexity: source.complexity,
      relevance: Math.round((source.relevanceScore || 0) * 100)
    }
  }

  return (
    <>
      <Head>
        <title>Ask AI Legal Assistant | AI Legal Agents</title>
        <meta name="description" content="Get instant answers to startup legal questions with AI-powered legal research and source citations." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-bg">
        {/* Header */}
        <nav className="bg-white border-b border-secondary-200">
          <div className="container-custom">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center text-secondary-600 hover:text-secondary-900">
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
                <div className="h-6 w-px bg-secondary-200"></div>
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-6 w-6 text-primary-600" />
                  <span className="font-semibold text-secondary-900">Ask AI Legal Assistant</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/chat" className="text-secondary-600 hover:text-secondary-900">
                  Chat Assistant
                </Link>
                <Link href="/triage" className="text-secondary-600 hover:text-secondary-900">
                  Legal Triage
                </Link>
                <Link href="/experts" className="text-secondary-600 hover:text-secondary-900">
                  Expert Network
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="heading-2 mb-4">AI Legal Research Assistant</h1>
              <p className="text-large text-secondary-600 max-w-3xl mx-auto">
                Get instant answers to complex startup legal questions. Our AI analyzes comprehensive legal documents 
                to provide detailed guidance with source citations and confidence scores.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="query" className="block text-sm font-medium text-secondary-900 mb-2">
                    Ask your startup legal question
                  </label>
                  <div className="relative">
                    <textarea
                      id="query"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Example: What are the key requirements for GDPR compliance when expanding to Europe?"
                      className="w-full h-24 p-4 pr-12 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      disabled={isLoading}
                    />
                    <MagnifyingGlassIcon className="absolute right-4 top-4 h-5 w-5 text-secondary-400" />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                        Researching...
                      </>
                    ) : (
                      <>
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                        Ask AI Assistant
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setResponse(null)
                      setError(null)
                    }}
                    className="btn-secondary px-6 py-3"
                    disabled={isLoading}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Sample Questions */}
            {!response && !isLoading && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Popular startup legal questions:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="text-left p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                    >
                      <p className="text-secondary-700 text-sm">{question}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* AI Response */}
            {response && (
              <div className="space-y-6">
                {/* Main Answer */}
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-secondary-900">AI Research Results</h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${confidenceColors[getConfidenceLevel(response.confidence)]}`}>
                      {getConfidenceLabel(response.confidence)} ({response.confidence}%)
                    </div>
                  </div>
                  
                  <div className="prose prose-secondary max-w-none">
                    <div className="whitespace-pre-wrap text-secondary-700">
                      {response.answer}
                    </div>
                  </div>

                  {/* Query Info */}
                  <div className="mt-6 pt-4 border-t border-secondary-200">
                    <div className="flex items-center justify-between text-sm text-secondary-600">
                      <span>Query: "{response.query}"</span>
                      <span>{response.processingMode} • {new Date(response.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="mt-4 pt-4 border-t border-secondary-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Was this response helpful?</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFeedback(response.timestamp, true)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            feedback[response.timestamp] === true
                              ? 'bg-green-100 text-green-600'
                              : 'bg-secondary-100 text-secondary-600 hover:bg-green-50 hover:text-green-600'
                          }`}
                        >
                          <HandThumbUpIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFeedback(response.timestamp, false)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            feedback[response.timestamp] === false
                              ? 'bg-red-100 text-red-600'
                              : 'bg-secondary-100 text-secondary-600 hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          <HandThumbDownIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Citations */}
                {response.sources && response.sources.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Source Documents ({response.sources.length})
                    </h3>
                    
                    <div className="space-y-4">
                      {response.sources.map((source, index) => {
                        const formatted = formatSource(source)
                        return (
                          <div key={index} className="border border-secondary-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-secondary-900">{formatted.displayName}</h4>
                                <p className="text-sm text-secondary-600">{formatted.type}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-medium text-primary-600">
                                  {formatted.relevance}% relevance
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-xs text-secondary-600">
                              <span className="px-2 py-1 bg-secondary-100 rounded">
                                Legal Area: {formatted.area}
                              </span>
                              <span className="px-2 py-1 bg-secondary-100 rounded">
                                Complexity: {formatted.complexity}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4">Recommended Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                      <span className="text-primary-800">Review the guidance and source documents above</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                      <span className="text-primary-800">
                        <Link href="/triage" className="underline">Use Legal Triage</Link> to classify complexity and get cost estimates
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-3" />
                      <span className="text-primary-800">
                        <Link href="/experts" className="underline">Consult with Expert Lawyers</Link> for implementation guidance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">How AI Legal Research Works</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Knowledge Base</h4>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• 77+ legal document chunks covering startup law</li>
                    <li>• Corporate formation and governance</li>
                    <li>• Employment law and equity compensation</li>
                    <li>• Intellectual property protection</li>
                    <li>• Privacy, data protection, and compliance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">AI Processing</h4>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• Semantic search across legal documents</li>
                    <li>• Source citation and relevance scoring</li>
                    <li>• Confidence assessment and complexity analysis</li>
                    <li>• Startup-specific legal guidance generation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 