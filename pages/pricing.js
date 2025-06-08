import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    starter: {
      name: 'Starter',
      description: 'Perfect for individual legal needs',
      monthly: 49,
      yearly: 490,
      features: [
        'AI-powered legal Q&A',
        'Basic document generation',
        'Case triage assistance',
        'Email support',
        'Massachusetts, RI, CT focus'
      ]
    },
    professional: {
      name: 'Professional',
      description: 'For attorneys and legal professionals',
      monthly: 149,
      yearly: 1490,
      features: [
        'Everything in Starter',
        'Advanced document review',
        'Priority support',
        'Analytics dashboard',
        'Multi-jurisdiction support',
        'Custom legal workflows'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      description: 'For law firms and legal organizations',
      monthly: 499,
      yearly: 4990,
      features: [
        'Everything in Professional',
        'White-label solution',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees'
      ]
    }
  };

  const jurisdictionPricing = [
    { state: 'Massachusetts', price: '$500 - $2,500', description: 'Primary market - competitive pricing' },
    { state: 'Rhode Island', price: '$500 - $2,500', description: 'Primary market - competitive pricing' },
    { state: 'Connecticut', price: '$525 - $2,625', description: 'Secondary market - slight premium' },
    { state: 'Delaware', price: '$550 - $2,750', description: 'Corporate formation specialist' },
    { state: 'Federal', price: '$650 - $3,250', description: 'Complex federal regulations' }
  ];

  return (
    <>
      <Head>
        <title>Pricing - AI Legal Agents</title>
        <meta name="description" content="Affordable AI-powered legal services for Massachusetts, Rhode Island, and Connecticut" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl">⚖️</span>
                  <span className="text-xl font-bold text-gray-900">AI Legal Agents</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/ask-ai" className="text-gray-700 hover:text-blue-600">Ask AI</Link>
                <Link href="/triage" className="text-gray-700 hover:text-blue-600">Triage</Link>
                <Link href="/generate-document" className="text-gray-700 hover:text-blue-600">Documents</Link>
                <Link href="/pricing" className="text-blue-600 font-medium">Pricing</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Specialized for Massachusetts, Rhode Island, and Connecticut legal markets
            </p>
            
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  Yearly (Save 17%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-lg p-8 ${
                  key === 'professional' ? 'border-2 border-blue-500 relative' : ''
                }`}
              >
                {key === 'professional' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${billingCycle === 'monthly' ? plan.monthly : Math.floor(plan.yearly / 12)}
                    <span className="text-lg text-gray-600">/month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-600">
                      Billed yearly (${plan.yearly})
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-md font-medium ${
                  key === 'professional'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Document Generation Pricing */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Document Generation Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Professional legal documents tailored to your jurisdiction
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jurisdictionPricing.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.state}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {item.price}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-lg p-6 inline-block">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🎯 Focus on Your Local Market
                </h3>
                <p className="text-gray-700">
                  We specialize in Massachusetts, Rhode Island, and Connecticut law
                  <br />
                  with competitive pricing and local expertise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Why focus on Massachusetts, Rhode Island, and Connecticut?
                </h3>
                <p className="text-gray-700">
                  These are our primary markets where we have deep expertise in local laws, 
                  regulations, and court procedures. This allows us to provide more accurate 
                  and relevant legal guidance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do all documents require attorney review?
                </h3>
                <p className="text-gray-700">
                  Yes, all generated documents must be reviewed and approved by licensed 
                  attorneys before completion. This ensures accuracy and compliance with 
                  local legal requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's included in the free trial?
                </h3>
                <p className="text-gray-700">
                  7-day free trial with full access to AI Q&A, case triage, and basic 
                  document generation. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join legal professionals across Massachusetts, Rhode Island, and Connecticut
            </p>
            <div className="space-x-4">
              <Link href="/ask-ai" className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100">
                Start Free Trial
              </Link>
              <Link href="/#demo" className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 