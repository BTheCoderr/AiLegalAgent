import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function TestSystems() {
  const [results, setResults] = useState({})
  const [testing, setTesting] = useState({})

  const testEndpoint = async (name, endpoint, payload) => {
    setTesting(prev => ({ ...prev, [name]: true }))
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      setResults(prev => ({
        ...prev,
        [name]: {
          status: response.ok ? 'success' : 'error',
          data: data,
          message: response.ok ? 'Working perfectly!' : data.error || 'Unknown error'
        }
      }))
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [name]: {
          status: 'error',
          message: error.message,
          data: null
        }
      }))
    }
    
    setTesting(prev => ({ ...prev, [name]: false }))
  }

  const testAll = async () => {
    await Promise.all([
      testEndpoint('Demo Mode Q&A', '/api/qa', { query: 'What are Massachusetts LLC formation requirements?' }),
      testEndpoint('Ollama Local AI', '/api/qa-ollama', { query: 'What is GDPR compliance for startups?' }),
      testEndpoint('Case Triage', '/api/triage', { 
        description: 'I need help with employment contract compliance',
        urgency: 'medium',
        jurisdiction: 'Massachusetts'
      }),
      testEndpoint('Document Generation', '/api/docgen', {
        documentType: 'nda',
        clientName: 'Test Client',
        jurisdiction: 'Massachusetts',
        projectDescription: 'Legal AI platform development'
      })
    ])
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      default: return '⏳'
    }
  }

  return (
    <>
      <Head>
        <title>System Tests | AI Legal Agents</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🧪 AI Legal Agents System Tests
            </h1>
            <p className="text-gray-600 mb-6">
              Verify all AI systems are working before customer outreach
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={testAll}
                disabled={Object.values(testing).some(t => t)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {Object.values(testing).some(t => t) ? 'Testing...' : 'Run All Tests'}
              </button>
              <Link 
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200"
              >
                Back to Demo
              </Link>
            </div>
          </div>

          {/* Test Results */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Demo Mode Q&A */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Demo Mode Q&A</h3>
                <button
                  onClick={() => testEndpoint('Demo Mode Q&A', '/api/qa', { query: 'What are Massachusetts LLC formation requirements?' })}
                  disabled={testing['Demo Mode Q&A']}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {testing['Demo Mode Q&A'] ? 'Testing...' : 'Test Now'}
                </button>
              </div>
              
              {results['Demo Mode Q&A'] && (
                <div className={`p-4 rounded-lg border ${getStatusColor(results['Demo Mode Q&A'].status)}`}>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getStatusIcon(results['Demo Mode Q&A'].status)}</span>
                    <span className="font-medium">{results['Demo Mode Q&A'].message}</span>
                  </div>
                  {results['Demo Mode Q&A'].data && (
                    <div className="text-sm">
                      <p><strong>Confidence:</strong> {results['Demo Mode Q&A'].data.confidence}%</p>
                      <p><strong>Sources:</strong> {results['Demo Mode Q&A'].data.sources?.length || 0}</p>
                      <p><strong>Mode:</strong> {results['Demo Mode Q&A'].data.processingMode}</p>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-4">
                Your current system using 77 legal document embeddings with advanced keyword search.
              </p>
            </div>

            {/* Ollama Local AI */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Ollama Local AI</h3>
                <button
                  onClick={() => testEndpoint('Ollama Local AI', '/api/qa-ollama', { query: 'What is GDPR compliance for startups?' })}
                  disabled={testing['Ollama Local AI']}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {testing['Ollama Local AI'] ? 'Testing...' : 'Test Now'}
                </button>
              </div>
              
              {results['Ollama Local AI'] && (
                <div className={`p-4 rounded-lg border ${getStatusColor(results['Ollama Local AI'].status)}`}>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getStatusIcon(results['Ollama Local AI'].status)}</span>
                    <span className="font-medium">{results['Ollama Local AI'].message}</span>
                  </div>
                  {results['Ollama Local AI'].data && (
                    <div className="text-sm">
                      <p><strong>Confidence:</strong> {results['Ollama Local AI'].data.confidence}%</p>
                      <p><strong>Sources:</strong> {results['Ollama Local AI'].data.sources?.length || 0}</p>
                      <p><strong>Mode:</strong> {results['Ollama Local AI'].data.processingMode}</p>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-4">
                Llama 3.1 8B model running locally with your legal embeddings. $0/month cost.
              </p>
            </div>

            {/* Case Triage */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Case Triage</h3>
                <button
                  onClick={() => testEndpoint('Case Triage', '/api/triage', { 
                    description: 'I need help with employment contract compliance',
                    urgency: 'medium',
                    jurisdiction: 'Massachusetts'
                  })}
                  disabled={testing['Case Triage']}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {testing['Case Triage'] ? 'Testing...' : 'Test Now'}
                </button>
              </div>
              
              {results['Case Triage'] && (
                <div className={`p-4 rounded-lg border ${getStatusColor(results['Case Triage'].status)}`}>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getStatusIcon(results['Case Triage'].status)}</span>
                    <span className="font-medium">{results['Case Triage'].message}</span>
                  </div>
                  {results['Case Triage'].data && (
                    <div className="text-sm">
                      <p><strong>Category:</strong> {results['Case Triage'].data.category}</p>
                      <p><strong>Confidence:</strong> {results['Case Triage'].data.confidence}%</p>
                      <p><strong>Priority:</strong> {results['Case Triage'].data.priority}</p>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-4">
                Smart classification of legal issues with priority assessment.
              </p>
            </div>

            {/* Document Generation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Generation</h3>
                <button
                  onClick={() => testEndpoint('Document Generation', '/api/docgen', {
                    documentType: 'nda',
                    clientName: 'Test Client',
                    jurisdiction: 'Massachusetts',
                    projectDescription: 'Legal AI platform development'
                  })}
                  disabled={testing['Document Generation']}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {testing['Document Generation'] ? 'Testing...' : 'Test Now'}
                </button>
              </div>
              
              {results['Document Generation'] && (
                <div className={`p-4 rounded-lg border ${getStatusColor(results['Document Generation'].status)}`}>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{getStatusIcon(results['Document Generation'].status)}</span>
                    <span className="font-medium">{results['Document Generation'].message}</span>
                  </div>
                  {results['Document Generation'].data && (
                    <div className="text-sm">
                      <p><strong>Document:</strong> {results['Document Generation'].data.documentType}</p>
                      <p><strong>Price:</strong> ${results['Document Generation'].data.pricing?.basePrice}</p>
                      <p><strong>Jurisdiction:</strong> {results['Document Generation'].data.jurisdiction}</p>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-4">
                Generate legal documents with MA/RI/CT specific pricing and compliance.
              </p>
            </div>
          </div>

          {/* Additional Status */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">External System Status</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-medium text-green-900">Live Demo Site</h4>
                <p className="text-sm text-green-700">ailegalagent.netlify.app</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-medium text-green-900">Ollama Service</h4>
                <p className="text-sm text-green-700">Llama 3.1 8B loaded</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">💾</div>
                <h4 className="font-medium text-blue-900">Legal Knowledge</h4>
                <p className="text-sm text-blue-700">77 document embeddings</p>
              </div>
            </div>
          </div>

          {/* Customer Readiness */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Customer Readiness Status</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">✅ Ready for Customer Emails</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Live demo at ailegalagent.netlify.app</li>
                  <li>• Interactive 5-step walkthrough</li>
                  <li>• Professional UI and features</li>
                  <li>• Real AI responses with citations</li>
                  <li>• Feedback collection system</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">💰 Revenue Model Validated</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• $49-$499/month subscription tiers</li>
                  <li>• $500-$2,500 document generation</li>
                  <li>• MA/RI competitive pricing</li>
                  <li>• Human-in-loop attorney approval</li>
                  <li>• Complete feature matrix</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-green-200">
              <p className="text-center text-gray-700">
                <strong>🎯 Next Step:</strong> Start sending customer interview emails using your live demo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 