import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, ArrowLeftIcon, CheckIcon, StarIcon, ClockIcon, MapPinIcon, AcademicCapIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function SarahMitchellProfile() {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const expert = {
    id: 1,
    name: 'Sarah Mitchell',
    title: 'Partner, Startup Legal',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b1?w=400',
    hourlyRate: '$650',
    experience: '12 years',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 127,
    specializations: ['Series A-C Fundraising', 'GDPR Compliance', 'M&A', 'IP Strategy'],
    background: 'Former BigLaw attorney specializing in venture financing. Helped 200+ startups raise over $2B in funding. Expert in complex regulatory compliance and international expansion.',
    education: 'Stanford Law, Harvard MBA',
    clients: ['Stripe', 'Airbnb', 'Dropbox', 'Coinbase', 'Instacart'],
    languages: ['English', 'Spanish'],
    nextAvailable: '2 days',
    verified: true,
    bio: `Sarah Mitchell is a seasoned startup attorney with over 12 years of experience helping venture-backed companies navigate complex legal challenges. As a former BigLaw partner, she brings enterprise-level expertise to the startup ecosystem.

    She has personally guided over 200 startups through funding rounds totaling more than $2 billion, with a particular focus on Series A through C rounds. Her clients consistently praise her ability to translate complex legal concepts into actionable business advice.

    Sarah's expertise spans multiple practice areas including venture financing, regulatory compliance (particularly GDPR), mergers and acquisitions, and intellectual property strategy. She has deep experience with international expansion, having helped numerous startups successfully enter European and Asian markets.`,
    
    recentCases: [
      {
        title: 'Series B Fundraising',
        company: 'AI Startup (Confidential)',
        amount: '$25M',
        description: 'Led $25M Series B round with complex international investor structure'
      },
      {
        title: 'GDPR Compliance Program',
        company: 'SaaS Platform',
        amount: '$2.1M',
        description: 'Implemented comprehensive GDPR compliance for EU market expansion'
      },
      {
        title: 'M&A Transaction',
        company: 'Fintech Startup',
        amount: '$45M',
        description: 'Advised on $45M acquisition by Fortune 500 financial services company'
      }
    ],

    testimonials: [
      {
        name: 'Alex Chen',
        company: 'TechFlow (YC S23)',
        role: 'CEO & Founder',
        quote: 'Sarah helped us navigate our Series A with incredible expertise. She anticipated issues we never would have thought of and saved us months of back-and-forth with investors.'
      },
      {
        name: 'Maria Rodriguez',
        company: 'DataVault Security',
        role: 'Co-founder & CTO',
        quote: 'The GDPR compliance work Sarah did for us was phenomenal. We launched in Europe 6 months ahead of schedule thanks to her guidance.'
      }
    ]
  }

  return (
    <>
      <Head>
        <title>Sarah Mitchell - Expert Legal Network | AI Legal Agents</title>
        <meta name="description" content="Connect with Sarah Mitchell, experienced startup attorney specializing in fundraising, GDPR compliance, and M&A for venture-backed companies." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-bg">
        {/* Header */}
        <nav className="bg-white border-b border-secondary-200">
          <div className="container-custom">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/experts" className="flex items-center text-secondary-600 hover:text-secondary-900">
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Experts
                </Link>
                <div className="h-6 w-px bg-secondary-200"></div>
                <div className="flex items-center space-x-2">
                  <ScaleIcon className="h-6 w-6 text-primary-600" />
                  <span className="font-semibold text-secondary-900">Expert Profile</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/chat" className="text-secondary-600 hover:text-secondary-900">
                  AI Assistant
                </Link>
                <Link href="/pricing" className="btn-primary">
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Profile Header */}
        <div className="bg-white border-b border-secondary-200">
          <div className="container-custom py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                <div className="relative">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {expert.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="heading-2 mb-2">{expert.name}</h1>
                  <p className="text-large text-secondary-600 mb-3">{expert.title}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(expert.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-secondary-300'
                          }`}
                        />
                      ))}
                      <span className="text-secondary-600 ml-2">
                        {expert.rating} ({expert.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-secondary-600">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {expert.location}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      Available in {expert.nextAvailable}
                    </div>
                    <div className="flex items-center">
                      <GlobeAltIcon className="w-4 h-4 mr-1" />
                      {expert.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-auto lg:text-right">
                <div className="mb-4">
                  <p className="text-3xl font-bold text-secondary-900">{expert.hourlyRate}</p>
                  <p className="text-secondary-600">/hour</p>
                </div>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="btn-primary w-full lg:w-auto"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="card">
                <h2 className="heading-3 mb-4">About Sarah</h2>
                <div className="prose prose-secondary max-w-none">
                  {expert.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-secondary-700 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Recent Cases */}
              <div className="card">
                <h2 className="heading-3 mb-6">Recent Cases</h2>
                <div className="space-y-6">
                  {expert.recentCases.map((case_, index) => (
                    <div key={index} className="border-l-4 border-primary-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-secondary-900">{case_.title}</h3>
                        <span className="text-sm font-medium text-primary-600">{case_.amount}</span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-1">{case_.company}</p>
                      <p className="text-secondary-700">{case_.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="card">
                <h2 className="heading-3 mb-6">Client Testimonials</h2>
                <div className="space-y-6">
                  {expert.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-secondary-50 rounded-lg p-6">
                      <p className="text-secondary-700 mb-4 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-medium text-secondary-900">{testimonial.name}</p>
                        <p className="text-sm text-secondary-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Specializations */}
              <div className="card">
                <h3 className="font-semibold text-secondary-900 mb-4">Specializations</h3>
                <div className="space-y-2">
                  {expert.specializations.map((spec, index) => (
                    <div key={index} className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm">
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="card">
                <h3 className="font-semibold text-secondary-900 mb-4">Experience</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <AcademicCapIcon className="w-5 h-5 text-secondary-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-secondary-900">Education</p>
                      <p className="text-sm text-secondary-600">{expert.education}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="w-5 h-5 text-secondary-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-secondary-900">Experience</p>
                      <p className="text-sm text-secondary-600">{expert.experience} in startup law</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notable Clients */}
              <div className="card">
                <h3 className="font-semibold text-secondary-900 mb-4">Notable Clients</h3>
                <div className="flex flex-wrap gap-2">
                  {expert.clients.map((client, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                      {client}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="card bg-primary-50 border-primary-200">
                <h3 className="font-semibold text-primary-900 mb-2">Ready to Get Started?</h3>
                <p className="text-sm text-primary-700 mb-4">
                  Schedule a consultation to discuss your startup's legal needs.
                </p>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="btn-primary w-full"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Book Consultation</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{expert.name}</p>
                <p className="text-sm text-secondary-600">{expert.hourlyRate}/hour</p>
              </div>
            </div>
            <p className="text-secondary-600 mb-6">
              Ready to schedule a consultation? This will redirect you to our booking system 
              where you can select a time that works for both you and Sarah.
            </p>
            <div className="flex space-x-3">
                             <button
                 onClick={() => setShowBookingModal(false)}
                 className="flex-1 btn-secondary"
               >
                 Cancel
               </button>
               <Link href="/booking" className="flex-1 btn-primary text-center">
                 Continue to Booking
               </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 