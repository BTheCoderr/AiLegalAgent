import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, ArrowLeftIcon, CheckIcon, XMarkIcon, ClockIcon, DocumentTextIcon, EyeIcon } from '@heroicons/react/24/outline'
import { getMetricsLogger } from '../lib/metrics.js'

// Enhanced mock data with jurisdiction support - in real app this would come from Supabase
const mockReviewItems = [
  {
    id: 1,
    type: 'Privacy Policy',
    clientName: 'TechFlow AI',
    category: 'GDPR Compliance',
    jurisdiction: 'delaware',
    jurisdictionName: 'Delaware',
    status: 'pending',
    priority: 'High',
    submittedAt: '2024-06-07T10:30:00Z',
    lastUpdated: '2024-06-07T10:30:00Z',
    aiConfidence: 0.94,
    description: 'Generated GDPR-compliant privacy policy for SaaS platform expanding to EU market',
    estimatedValue: '$3,500',
    documentUrl: '#',
    complexity: 'High',
    requiresApprovalBeforeComplete: true
  },
  {
    id: 2,
    type: 'Terms of Service',
    clientName: 'DataSync Inc',
    category: 'Commercial Contracts',
    jurisdiction: 'california',
    jurisdictionName: 'California',
    status: 'pending',
    priority: 'Medium',
    submittedAt: '2024-06-07T09:15:00Z',
    lastUpdated: '2024-06-07T09:15:00Z',
    aiConfidence: 0.87,
    description: 'Updated terms of service for B2B SaaS platform with enterprise features',
    estimatedValue: '$2,800',
    documentUrl: '#',
    complexity: 'Medium',
    requiresApprovalBeforeComplete: true
  },
  {
    id: 3,
    type: 'Stock Purchase Agreement',
    clientName: 'InnovateLab',
    category: 'Fundraising',
    jurisdiction: 'delaware',
    jurisdictionName: 'Delaware',
    status: 'approved',
    priority: 'High',
    submittedAt: '2024-06-06T16:45:00Z',
    lastUpdated: '2024-06-07T08:20:00Z',
    aiConfidence: 0.91,
    description: 'Series A stock purchase agreement template with standard terms',
    estimatedValue: '$15,000',
    documentUrl: '#',
    reviewedBy: 'Sarah Mitchell',
    reviewedAt: '2024-06-07T08:20:00Z',
    complexity: 'High',
    requiresApprovalBeforeComplete: true
  },
  {
    id: 4,
    type: 'Employee Equity Plan',
    clientName: 'SecureAPI',
    category: 'Employment',
    jurisdiction: 'new_york',
    jurisdictionName: 'New York',
    status: 'rejected',
    priority: 'Medium',
    submittedAt: '2024-06-06T14:20:00Z',
    lastUpdated: '2024-06-06T18:30:00Z',
    aiConfidence: 0.73,
    description: 'Employee stock option plan for 50-person startup',
    estimatedValue: '$5,200',
    documentUrl: '#',
    reviewedBy: 'Michael Chen',
    reviewedAt: '2024-06-06T18:30:00Z',
    rejectionReason: 'Vesting schedule needs customization for this client',
    complexity: 'Medium',
    requiresApprovalBeforeComplete: true
  },
  {
    id: 5,
    type: 'Articles of Incorporation',
    clientName: 'NeuralNet Dynamics',
    category: 'Corporate Formation',
    jurisdiction: 'delaware',
    jurisdictionName: 'Delaware',
    status: 'pending',
    priority: 'High',
    submittedAt: '2024-06-07T14:22:00Z',
    lastUpdated: '2024-06-07T14:22:00Z',
    aiConfidence: 0.96,
    description: 'Delaware C-Corp formation documents for AI startup',
    estimatedValue: '$1,800',
    documentUrl: '#',
    complexity: 'Medium',
    requiresApprovalBeforeComplete: true
  },
  {
    id: 6,
    type: 'Non-Disclosure Agreement',
    clientName: 'CryptoVault Technologies',
    category: 'Intellectual Property',
    jurisdiction: 'massachusetts',
    jurisdictionName: 'Massachusetts',
    status: 'pending',
    priority: 'Low',
    submittedAt: '2024-06-07T12:18:00Z',
    lastUpdated: '2024-06-07T12:18:00Z',
    aiConfidence: 0.89,
    description: 'Mutual NDA for blockchain technology partnerships',
    estimatedValue: '$650',
    documentUrl: '#',
    complexity: 'Low',
    requiresApprovalBeforeComplete: true
  }
]

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200'
}

const priorityColors = {
  High: 'text-red-600',
  Medium: 'text-yellow-600',
  Low: 'text-green-600'
}

export default function ReviewQueue() {
  const [filter, setFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [reviewItems, setReviewItems] = useState(mockReviewItems)

  const filteredItems = reviewItems.filter(item => {
    if (filter === 'all') return true
    return item.status === filter
  })

  const handleApprove = async (itemId) => {
    const item = reviewItems.find(item => item.id === itemId);
    
    // Log metrics for document status change
    const metricsLogger = getMetricsLogger();
    await metricsLogger.logDocumentStatusChange(
      `doc_${itemId}`, 
      item?.status || 'pending', 
      'approved', 
      'Current Attorney'
    );

    setReviewItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: 'approved',
            reviewedBy: 'Current Attorney',
            reviewedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          }
        : item
    ))
  }

  const handleReject = async (itemId, reason = 'Requires revision') => {
    const item = reviewItems.find(item => item.id === itemId);
    
    // Log metrics for document status change
    const metricsLogger = getMetricsLogger();
    await metricsLogger.logDocumentStatusChange(
      `doc_${itemId}`, 
      item?.status || 'pending', 
      'rejected', 
      'Current Attorney'
    );

    setReviewItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            status: 'rejected',
            reviewedBy: 'Current Attorney',
            reviewedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            rejectionReason: reason
          }
        : item
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const pendingCount = reviewItems.filter(item => item.status === 'pending').length

  return (
    <>
      <Head>
        <title>Review Queue | AI Legal Agents</title>
        <meta name="description" content="Attorney review queue for AI-generated legal documents. Human-in-loop quality assurance." />
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
                  <span className="font-semibold text-secondary-900">Review Queue</span>
                  {pendingCount > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      {pendingCount} pending
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/triage" className="text-secondary-600 hover:text-secondary-900">
                  Triage
                </Link>
                <Link href="/ask-ai" className="text-secondary-600 hover:text-secondary-900">
                  Ask AI
                </Link>
                <Link href="/admin-metrics" className="text-secondary-600 hover:text-secondary-900">
                  Metrics
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
          <div className="max-w-6xl mx-auto">
            
            {/* Header & Stats */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="heading-2 mb-2">Attorney Review Queue</h1>
                <p className="text-secondary-600">Human-in-loop quality assurance for AI-generated legal documents</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border border-secondary-200">
                  <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                  <div className="text-sm text-secondary-600">Pending</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-secondary-200">
                  <div className="text-2xl font-bold text-green-600">
                    {reviewItems.filter(item => item.status === 'approved').length}
                  </div>
                  <div className="text-sm text-secondary-600">Approved</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-secondary-200">
                  <div className="text-2xl font-bold text-red-600">
                    {reviewItems.filter(item => item.status === 'rejected').length}
                  </div>
                  <div className="text-sm text-secondary-600">Rejected</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6">
              <div className="flex space-x-2">
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      filter === status
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-secondary-700 border border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    {status !== 'all' && (
                      <span className="ml-2 text-xs">
                        ({reviewItems.filter(item => item.status === status).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                        <h3 className="font-semibold text-secondary-900">{item.type}</h3>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[item.status]}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                        <span className={`text-sm font-medium ${priorityColors[item.priority]}`}>
                          {item.priority} Priority
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-secondary-600">Client: <span className="font-medium text-secondary-900">{item.clientName}</span></p>
                          <p className="text-sm text-secondary-600">Category: <span className="font-medium text-secondary-900">{item.category}</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary-600">Jurisdiction: <span className="font-medium text-secondary-900">{item.jurisdictionName}</span></p>
                          <p className="text-sm text-secondary-600">Complexity: <span className="font-medium text-secondary-900">{item.complexity}</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-secondary-600">Submitted: <span className="font-medium text-secondary-900">{formatDate(item.submittedAt)}</span></p>
                          <p className="text-sm text-secondary-600">Last Updated: <span className="font-medium text-secondary-900">{formatDate(item.lastUpdated)}</span></p>
                          <p className="text-sm text-secondary-600">Value: <span className="font-medium text-secondary-900">{item.estimatedValue}</span></p>
                        </div>
                      </div>
                      
                      <p className="text-secondary-700 mb-3">{item.description}</p>

                      {/* Compliance Notice */}
                      {item.requiresApprovalBeforeComplete && item.status === 'pending' && (
                        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Attorney Approval Required</p>
                              <p className="text-xs text-yellow-700">This document cannot be marked as complete until reviewed and approved by a licensed attorney.</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-secondary-600">
                        <div className="flex items-center">
                          <span className="mr-2">AI Confidence:</span>
                          <div className="w-20 bg-secondary-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${item.aiConfidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 font-medium">{Math.round(item.aiConfidence * 100)}%</span>
                        </div>
                        <ClockIcon className="h-4 w-4" />
                        <span>{formatDate(item.submittedAt)}</span>
                      </div>

                      {/* Review Info */}
                      {item.status !== 'pending' && (
                        <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
                          <p className="text-sm text-secondary-700">
                            <strong>{item.status === 'approved' ? 'Approved' : 'Rejected'}</strong> by {item.reviewedBy} on {formatDate(item.reviewedAt)}
                          </p>
                          {item.rejectionReason && (
                            <p className="text-sm text-red-700 mt-1">
                              <strong>Reason:</strong> {item.rejectionReason}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 ml-6">
                      <button className="flex items-center px-3 py-2 text-sm text-secondary-600 bg-secondary-50 rounded-lg hover:bg-secondary-100">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      
                      {item.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="flex items-center px-3 py-2 text-sm text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(item.id)}
                            className="flex items-center px-3 py-2 text-sm text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                          >
                            <XMarkIcon className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">No documents to review</h3>
                <p className="text-secondary-600">
                  {filter === 'all' 
                    ? 'All review items will appear here once documents are generated.'
                    : `No ${filter} documents found.`
                  }
                </p>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Human-in-Loop Quality Assurance</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Review Process</h4>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• AI generates legal documents based on client requirements</li>
                    <li>• Documents enter review queue with confidence scores</li>
                    <li>• Expert attorneys review for accuracy and completeness</li>
                    <li>• Approved documents are delivered to clients</li>
                    <li>• Rejected documents are refined and re-submitted</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Quality Metrics</h4>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• Average review time: 2-4 hours</li>
                    <li>• Approval rate: 89%</li>
                    <li>• Client satisfaction: 4.8/5</li>
                    <li>• Cost savings vs traditional: 70%</li>
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