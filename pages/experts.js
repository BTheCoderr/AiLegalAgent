import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, ArrowLeftIcon, CheckIcon, StarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'

const experts = [
  {
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
    background: 'Former BigLaw attorney specializing in venture financing. Helped 200+ startups raise over $2B.',
    education: 'Stanford Law, Harvard MBA',
    clients: ['Stripe', 'Airbnb', 'Dropbox'],
    languages: ['English', 'Spanish'],
    nextAvailable: '2 days',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'General Counsel, TechVentures',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    hourlyRate: '$575',
    experience: '10 years',
    location: 'New York, NY',
    rating: 4.8,
    reviews: 89,
    specializations: ['SOC 2 Compliance', 'Employment Law', 'Privacy Policies', 'International Expansion'],
    background: 'In-house counsel experience at 3 unicorn startups. Expert in scaling legal operations.',
    education: 'Columbia Law, Wharton MBA',
    clients: ['Uber', 'Palantir', 'WeWork'],
    languages: ['English', 'Mandarin'],
    nextAvailable: '1 day',
    verified: true
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    title: 'Senior Associate, Innovation Law',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    hourlyRate: '$450',
    experience: '7 years',
    location: 'Austin, TX',
    rating: 4.9,
    reviews: 156,
    specializations: ['Intellectual Property', 'Patent Filing', 'Trademark Protection', 'Open Source'],
    background: 'IP specialist with deep tech background. Former software engineer turned attorney.',
    education: 'UT Law, MIT Computer Science',
    clients: ['GitHub', 'Docker', 'HashiCorp'],
    languages: ['English', 'Portuguese'],
    nextAvailable: '3 days',
    verified: true
  },
  {
    id: 4,
    name: 'David Park',
    title: 'Corporate Counsel, Scale Legal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    hourlyRate: '$525',
    experience: '9 years',
    location: 'Seattle, WA',
    rating: 4.7,
    reviews: 92,
    specializations: ['Corporate Governance', 'Board Management', 'Employee Equity', 'Compliance'],
    background: 'Corporate law expert focused on scaling startups. Led legal teams at 2 IPOs.',
    education: 'NYU Law, Georgetown Business',
    clients: ['Slack', 'Zoom', 'Snowflake'],
    languages: ['English', 'Korean'],
    nextAvailable: '5 days',
    verified: true
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    title: 'Privacy & Data Counsel',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    hourlyRate: '$500',
    experience: '8 years',
    location: 'Boston, MA',
    rating: 4.8,
    reviews: 74,
    specializations: ['GDPR & CCPA', 'Data Protection', 'International Privacy', 'Cybersecurity Law'],
    background: 'Privacy law specialist with regulatory experience. Former FTC attorney.',
    education: 'Harvard Law, Georgetown LLM',
    clients: ['HubSpot', 'Wayfair', 'Toast'],
    languages: ['English', 'French'],
    nextAvailable: '4 days',
    verified: true
  },
  {
    id: 6,
    name: 'James Wilson',
    title: 'Employment & HR Counsel',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    hourlyRate: '$425',
    experience: '6 years',
    location: 'Denver, CO',
    rating: 4.6,
    reviews: 63,
    specializations: ['Employment Law', 'Executive Compensation', 'HR Compliance', 'Remote Work'],
    background: 'Employment law expert helping startups scale their teams compliantly.',
    education: 'UC Berkeley Law, UCLA MBA',
    clients: ['Twilio', 'SendGrid', 'Okta'],
    languages: ['English'],
    nextAvailable: '1 day',
    verified: true
  }
]

const specializationFilters = [
  'All Specializations',
  'Fundraising',
  'GDPR Compliance',
  'SOC 2 Compliance',
  'Intellectual Property',
  'Employment Law',
  'Privacy Policies',
  'Corporate Governance'
]

export default function Experts() {
  const [selectedFilter, setSelectedFilter] = useState('All Specializations')
  const [selectedExpert, setSelectedExpert] = useState(null)

  const filteredExperts = selectedFilter === 'All Specializations' 
    ? experts 
    : experts.filter(expert => 
        expert.specializations.some(spec => 
          spec.toLowerCase().includes(selectedFilter.toLowerCase().replace(' compliance', '').replace('policies', ''))
        )
      )

  return (
    <>
      <Head>
        <title>Expert Legal Network | AI Legal Agents</title>
        <meta name="description" content="Connect with top startup lawyers specializing in fundraising, compliance, IP, and more. Premium legal expertise for venture-backed companies." />
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
                  <span className="font-semibold text-secondary-900">Expert Legal Network</span>
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

        {/* Content */}
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="heading-2 mb-4">Expert Legal Network</h1>
            <p className="text-large text-secondary-600 max-w-3xl">
              Connect with top startup lawyers who understand the unique challenges of scaling venture-backed companies. 
              All experts are pre-vetted and specialize in startup legal matters.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {specializationFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedFilter === filter
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-700 border border-secondary-200 hover:border-primary-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Experts Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <div key={expert.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {expert.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900">{expert.name}</h3>
                    <p className="text-sm text-secondary-600">{expert.title}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(expert.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-secondary-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-secondary-600 ml-1">
                          {expert.rating} ({expert.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-secondary-900">{expert.hourlyRate}</p>
                    <p className="text-sm text-secondary-600">/hour</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-secondary-600 mb-2">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {expert.location}
                    <ClockIcon className="w-4 h-4 ml-4 mr-1" />
                    Available in {expert.nextAvailable}
                  </div>
                  <p className="text-sm text-secondary-700 mb-3">{expert.background}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {expert.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-secondary-600 mb-4">
                    <p className="mb-1"><strong>Education:</strong> {expert.education}</p>
                    <p><strong>Notable Clients:</strong> {expert.clients.join(', ')}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setSelectedExpert(expert)}
                    className="flex-1 btn-primary text-sm py-2"
                  >
                    Book Consultation
                  </button>
                  <Link 
                    href={
                      expert.id === 1 ? '/experts/sarah-mitchell' : 
                      expert.id === 4 ? '/experts/david-park' : '#'
                    }
                    className="flex-1 btn-secondary text-sm py-2 text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-600">No experts found for the selected specialization.</p>
              <button
                onClick={() => setSelectedFilter('All Specializations')}
                className="text-primary-600 hover:text-primary-700 mt-2"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center p-8 bg-white rounded-xl shadow-sm border border-secondary-200">
            <h2 className="heading-3 mb-4">Need Help Choosing an Expert?</h2>
            <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
              Not sure which lawyer is right for your specific legal challenge? Our AI can analyze your needs 
              and recommend the best expert match for your startup.
            </p>
            <Link href="/chat" className="btn-primary">
              Get Expert Recommendation
            </Link>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Book Consultation</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={selectedExpert.image}
                alt={selectedExpert.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{selectedExpert.name}</p>
                <p className="text-sm text-secondary-600">{selectedExpert.hourlyRate}/hour</p>
              </div>
            </div>
            <p className="text-secondary-600 mb-6">
              Ready to schedule a consultation? This will redirect you to our booking system 
              where you can select a time that works for both you and {selectedExpert.name.split(' ')[0]}.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedExpert(null)}
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