import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, DocumentTextIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const DOCUMENT_TYPES = {
  'articles_of_incorporation': {
    name: 'Articles of Incorporation',
    description: 'Corporate formation documents',
    estimatedTime: '2-3 business days',
    basePrice: 1500,
    complexity: 'Medium'
  },
  'bylaws': {
    name: 'Corporate Bylaws',
    description: 'Internal governance documents',
    estimatedTime: '1-2 business days',
    basePrice: 1200,
    complexity: 'Medium'
  },
  'employment_agreement': {
    name: 'Employment Agreement',
    description: 'Standard employment contracts',
    estimatedTime: '1 business day',
    basePrice: 800,
    complexity: 'Low'
  },
  'nda': {
    name: 'Non-Disclosure Agreement',
    description: 'Confidentiality agreements',
    estimatedTime: '1 business day',
    basePrice: 500,
    complexity: 'Low'
  },
  'privacy_policy': {
    name: 'Privacy Policy',
    description: 'GDPR/CCPA compliant privacy policies',
    estimatedTime: '2-3 business days',
    basePrice: 1000,
    complexity: 'High'
  },
  'terms_of_service': {
    name: 'Terms of Service',
    description: 'User agreement terms',
    estimatedTime: '2-3 business days',
    basePrice: 900,
    complexity: 'Medium'
  },
  'investment_agreement': {
    name: 'Investment Agreement',
    description: 'Fundraising and investment documents',
    estimatedTime: '3-5 business days',
    basePrice: 2500,
    complexity: 'High'
  },
  'ip_assignment': {
    name: 'IP Assignment Agreement',
    description: 'Intellectual property transfer documents',
    estimatedTime: '1-2 business days',
    basePrice: 750,
    complexity: 'Low'
  }
};

const JURISDICTIONS = {
  'delaware': 'Delaware',
  'california': 'California',
  'new_york': 'New York',
  'massachusetts': 'Massachusetts',
  'texas': 'Texas',
  'federal': 'Federal'
};

export default function GenerateDocument() {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');
  const [parameters, setParameters] = useState({
    companyName: '',
    complexity: 'standard',
    urgent: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!selectedDocType || !selectedJurisdiction) {
      setError('Please select both document type and jurisdiction');
      return;
    }

    if (!parameters.companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/docgen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docType: selectedDocType,
          jurisdiction: selectedJurisdiction,
          parameters: parameters
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate document');
      }

      setGeneratedDocument(data.document);
    } catch (error) {
      console.error('Document generation error:', error);
      setError(error.message || 'Failed to generate document');
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateEstimatedPrice = () => {
    if (!selectedDocType || !selectedJurisdiction) return 0;
    
    const docType = DOCUMENT_TYPES[selectedDocType];
    if (!docType) return 0;

    let price = docType.basePrice;

    // Jurisdiction multipliers
    const jurisdictionMultipliers = {
      'california': 1.2,
      'new_york': 1.15,
      'delaware': 1.0,
      'massachusetts': 1.1,
      'texas': 0.95,
      'federal': 1.3
    };

    price *= jurisdictionMultipliers[selectedJurisdiction] || 1.0;

    // Complexity adjustments
    if (parameters.complexity === 'complex') {
      price *= 1.5;
    } else if (parameters.complexity === 'simple') {
      price *= 0.8;
    }

    if (parameters.urgent) {
      price *= 1.25;
    }

    return Math.round(price);
  };

  return (
    <>
      <Head>
        <title>Generate Legal Document | AI Legal Agents</title>
        <meta name="description" content="Generate AI-powered legal documents with jurisdiction-specific compliance. All documents require attorney approval." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-900">Document Generation</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/review-queue" className="text-gray-600 hover:text-gray-900">
                  Review Queue
                </Link>
                <Link href="/admin-metrics" className="text-gray-600 hover:text-gray-900">
                  Metrics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!generatedDocument ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Generate Legal Document</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Create AI-powered legal documents tailored to your jurisdiction. All documents require attorney approval before completion.
                </p>
              </div>

              {/* Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="space-y-6">
                  {/* Document Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Document Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(DOCUMENT_TYPES).map(([key, docType]) => (
                        <div
                          key={key}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedDocType === key
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedDocType(key)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">{docType.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded ${
                              docType.complexity === 'High' ? 'bg-red-100 text-red-700' :
                              docType.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {docType.complexity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{docType.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{docType.estimatedTime}</span>
                            <span>From ${docType.basePrice.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Jurisdiction Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Jurisdiction
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(JURISDICTIONS).map(([key, name]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedJurisdiction(key)}
                          className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                            selectedJurisdiction === key
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={parameters.companyName}
                        onChange={(e) => setParameters(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complexity Level
                      </label>
                      <select
                        value={parameters.complexity}
                        onChange={(e) => setParameters(prev => ({ ...prev, complexity: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="simple">Simple (-20%)</option>
                        <option value="standard">Standard</option>
                        <option value="complex">Complex (+50%)</option>
                      </select>
                    </div>
                  </div>

                  {/* Urgent Option */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={parameters.urgent}
                      onChange={(e) => setParameters(prev => ({ ...prev, urgent: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                      Rush delivery (+25% fee)
                    </label>
                  </div>

                  {/* Price Estimate */}
                  {selectedDocType && selectedJurisdiction && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Estimated Price:</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${calculateEstimatedPrice().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Final price may vary based on document complexity and review requirements
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !selectedDocType || !selectedJurisdiction}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Document...
                      </div>
                    ) : (
                      'Generate Document'
                    )}
                  </button>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Attorney Review Required</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      All generated documents must be reviewed and approved by a licensed attorney before they can be marked as complete. 
                      This ensures compliance with applicable laws and regulations in your jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Generated Document Result */
            <div className="space-y-6">
              <div className="text-center">
                <CheckIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Generated Successfully</h1>
                <p className="text-gray-600">Your document has been created and queued for attorney review.</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{generatedDocument.typeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jurisdiction:</span>
                        <span className="font-medium">{generatedDocument.jurisdictionName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Pending Review
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Document ID:</span>
                        <span className="font-mono text-xs">{generatedDocument.id}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Pricing</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">${generatedDocument.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">
                          {new Date(generatedDocument.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Completion:</span>
                        <span className="font-medium">
                          {new Date(generatedDocument.estimatedCompletion).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Preview</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                      {generatedDocument.content.substring(0, 500)}...
                    </pre>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Link
                    href="/review-queue"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    View in Review Queue
                  </Link>
                  <button
                    onClick={() => {
                      setGeneratedDocument(null);
                      setSelectedDocType('');
                      setSelectedJurisdiction('');
                      setParameters({ companyName: '', complexity: 'standard', urgent: false });
                    }}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 