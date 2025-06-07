import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ScaleIcon, PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const suggestedQuestions = [
  "How do I make my startup GDPR compliant?",
  "What are the SOC 2 Type II requirements?",
  "Generate a privacy policy for my SaaS startup",
  "What legal docs do I need for Series A fundraising?",
  "How to structure employee equity agreements?",
  "What are the key terms for a customer contract?",
  "How to protect my startup's intellectual property?",
  "What compliance requirements do I need for enterprise sales?"
]

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI Legal Compliance Assistant, specialized in helping startups navigate complex legal requirements. I can help you with GDPR compliance, SOC 2 certification, privacy policies, fundraising documents, and more. What legal challenge can I help you solve today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const aiMessage = {
        id: Date.now(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: Date.now(),
        type: 'ai',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact our support team for immediate assistance.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInputValue(question)
  }

  return (
    <>
      <Head>
        <title>AI Legal Compliance Assistant | AI Legal Agents</title>
        <meta name="description" content="Get instant legal guidance for your startup. Ask about GDPR, SOC 2, privacy policies, fundraising, and more." />
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
                  <span className="font-semibold text-secondary-900">AI Legal Compliance Assistant</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-secondary-600">Free Trial: 7 days remaining</span>
                <Link href="/pricing" className="btn-primary text-sm">
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Chat Container */}
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Popular Legal Questions</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-left p-4 bg-white rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                    >
                      <p className="text-secondary-700 text-sm">{question}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 mb-6">
              <div className="h-96 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${message.type === 'user' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-900'} rounded-lg p-4`}>
                      <div className="flex items-start space-x-3">
                        {message.type === 'ai' && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                              <ScaleIcon className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-primary-200' : 'text-secondary-500'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary-100 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <ScaleIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="border-t border-secondary-200 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about GDPR, SOC 2, privacy policies, fundraising docs..."
                    className="flex-1 p-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
                <p className="text-xs text-secondary-500 mt-2">
                  ⚠️ AI responses are for informational purposes only and do not constitute legal advice. 
                  Consult with qualified attorneys for specific legal matters.
                </p>
              </div>
            </div>

            {/* Call-to-Action */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Need Expert Review?</h3>
              <p className="text-secondary-600 mb-4">
                Connect with our network of startup lawyers for personalized guidance on complex legal matters.
              </p>
              <Link href="/experts" className="btn-primary">
                Browse Expert Network
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 