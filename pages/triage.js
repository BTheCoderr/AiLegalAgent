import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, ArrowLeftIcon, ClockIcon, CurrencyDollarIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const urgencyColors = {
  'High': 'text-red-600 bg-red-50 border-red-200',
  'Medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Low': 'text-green-600 bg-green-50 border-green-200'
}

const categoryIcons = {
  'Privacy & Data Protection': '🔒',
  'Security & Compliance': '🛡️',
  'Fundraising & Investment': '💰',
  'Employment & Equity': '👥',
  'Intellectual Property': '💡',
  'Corporate Formation & Governance': '🏛️',
  'Contracts & Commercial': '📄',
  'Regulatory & Compliance': '⚖️',
  'General Legal': '📋'
}

const sampleQueries = [
  "We need to become GDPR compliant before expanding to Europe",
  "How do we get SOC 2 certification for enterprise sales?",
  "What legal documents do we need for our Series A round?",
  "How should we structure our employee equity plan?",
  "We need to file a trademark for our company name",
  "Help us incorporate as a Delaware C-Corp"
]

export default function Triage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      })

      if (!response.ok) {
        throw new Error('Failed to classify query')
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to classify your legal query. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery)
    setResult(null)
    setError(null)
  }

  return (
    <>
      <Head>
        <title>Legal Triage | AI Legal Agents</title>
        <meta name="description" content="Get instant classification and cost estimates for your startup legal needs. Smart triage for legal priorities." />
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
                  <ScaleIcon className="h-6 w-6 text-primary-600" />
                  <span className="font-semibold text-secondary-900">Legal Triage</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/chat" className="text-secondary-600 hover:text-secondary-900">
                  AI Assistant
                </Link>
                <Link href="/experts" className="text-secondary-600 hover:text-secondary-900">
                  Expert Network
                </Link>
                <Link href="/pricing" className="btn-primary">
                  Upgrade Plan
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
              <h1 className="heading-2 mb-4">Legal Triage & Classification</h1>
              <p className="text-large text-secondary-600 max-w-2xl mx-auto">
                Get instant classification of your legal needs with cost estimates, urgency levels, and recommended next steps.
              </p>
            </div>

            {/* Triage Form */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 mb-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="query" className="block text-sm font-medium text-secondary-900 mb-2">
                    Describe your legal need or question
                  </label>
                  <textarea
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Example: We need to become GDPR compliant before expanding to Europe..."
                    className="w-full h-32 p-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Analyzing...' : 'Classify Legal Need'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setResult(null)
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

            {/* Sample Queries */}
            {!result && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Try these sample legal questions:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {sampleQueries.map((sampleQuery, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuery(sampleQuery)}
                      className="text-left p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                    >
                      <p className="text-secondary-700 text-sm">{sampleQuery}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Classification Result */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                <div className="flex items-center mb-6">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                  <h2 className="text-xl font-semibold text-secondary-900">Classification Complete</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Primary Classification */}
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Primary Classification</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{categoryIcons[result.classification] || '📋'}</span>
                        <div>
                          <p className="font-medium text-secondary-900">{result.classification}</p>
                          <p className="text-sm text-secondary-600">{result.subcategory}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm text-secondary-600 mr-2">Confidence:</span>
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${result.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-secondary-900 ml-2">
                          {Math.round(result.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Urgency & Priority */}
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Priority Assessment</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-secondary-500 mr-2" />
                        <span className="text-sm text-secondary-600 mr-2">Urgency:</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${urgencyColors[result.urgency] || urgencyColors['Medium']}`}>
                          {result.urgency}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-secondary-500 mr-2" />
                        <span className="text-sm text-secondary-600 mr-2">Est. Cost:</span>
                        <span className="font-medium text-secondary-900">{result.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="border-t border-secondary-200 pt-6">
                  <h3 className="font-semibold text-secondary-900 mb-3">Recommended Next Steps</h3>
                  <p className="text-secondary-700 mb-4">{result.recommendedAction}</p>
                  
                  <div className="flex space-x-4">
                    <Link href="/experts" className="btn-primary">
                      Find Expert Lawyer
                    </Link>
                    <Link href="/chat" className="btn-secondary">
                      Ask AI Assistant
                    </Link>
                  </div>
                </div>

                {/* Query Display */}
                <div className="border-t border-secondary-200 pt-6 mt-6">
                  <h4 className="font-medium text-secondary-900 mb-2">Your Query:</h4>
                  <p className="text-secondary-700 text-sm bg-secondary-50 p-3 rounded-lg">
                    "{result.query}"
                  </p>
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-12 text-center p-6 bg-white rounded-xl shadow-sm border border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Need More Detailed Analysis?</h3>
              <p className="text-secondary-600 mb-4">
                Our legal triage provides initial classification. For detailed legal analysis and document preparation, 
                connect with our expert lawyers or use our AI legal assistant.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/chat" className="btn-secondary">
                  AI Legal Assistant
                </Link>
                <Link href="/experts" className="btn-primary">
                  Book Expert Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 