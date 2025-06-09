import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CheckIcon, ChevronRightIcon, ScaleIcon, ShieldCheckIcon, DocumentTextIcon, UsersIcon } from '@heroicons/react/24/outline'
import InteractiveDemo from '../components/InteractiveDemo'

const pricingTiers = [
  {
    name: 'Starter',
    price: '$199',
    description: 'Perfect for early-stage startups',
    features: [
      'AI Legal Compliance Assistant',
      'Basic GDPR & Privacy Policy Generation',
      '50 AI consultations/month',
      'Document templates library',
      'Email support'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Growth',
    price: '$599',
    description: 'For scaling startups with complex needs',
    features: [
      'Everything in Starter',
      'SOC 2 compliance guidance',
      'Unlimited AI consultations',
      'Expert network access (2 hours/month)',
      'Contract review & generation',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$1,299',
    description: 'For venture-backed companies',
    features: [
      'Everything in Growth',
      'Dedicated legal AI agent',
      'Custom compliance frameworks',
      'Expert network access (8 hours/month)',
      'Fundraising legal support',
      'White-glove onboarding'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow AI',
    company: 'Y Combinator S23',
    content: 'AI Legal Agents saved us $50k in legal fees during our Series A. The compliance guidance was spot-on.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b1?w=400'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Co-founder, DataSync',
    company: 'Techstars 2023',
    content: 'From GDPR to SOC 2, they handled our entire compliance stack. Now we focus on building, not legal docs.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  {
    name: 'Emily Watson',
    role: 'Founder, SecureAPI',
    company: '$2M ARR',
    content: 'The AI agent feels like having a $500/hour lawyer available 24/7. Game-changer for our legal operations.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  }
]

const techStack = [
  'OpenAI GPT-4', 'Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>AI Legal Agents for Startups | Automated Legal Compliance</title>
        <meta name="description" content="AI-powered legal compliance for venture-backed startups. Automated GDPR, SOC 2, contracts, and expert legal guidance starting at $199/month." />
        <meta name="keywords" content="AI legal, startup legal, GDPR compliance, SOC 2, legal automation, startup lawyers" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white border-b border-secondary-200">
          <div className="container-custom">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <ScaleIcon className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-secondary-900">AI Legal Agents</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/ask-ai" className="text-secondary-600 hover:text-secondary-900">Ask AI</Link>
                <Link href="/triage" className="text-secondary-600 hover:text-secondary-900">Legal Triage</Link>
                <Link href="/generate-document" className="text-secondary-600 hover:text-secondary-900">Generate Docs</Link>
                <Link href="/review-queue" className="text-secondary-600 hover:text-secondary-900">Review Queue</Link>
                <Link href="/admin-metrics" className="text-secondary-600 hover:text-secondary-900">Metrics</Link>
                <Link href="/experts" className="text-secondary-600 hover:text-secondary-900">Expert Network</Link>
                <Link href="/ask-ai" className="btn-primary">Get Started</Link>
              </div>
              
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="section-padding gradient-bg">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="heading-1 mb-6 animate-fade-in">
                AI Legal Agents for
                <span className="gradient-text block">Venture-Backed Startups</span>
              </h1>
              <p className="text-large mb-8 max-w-3xl mx-auto animate-slide-up">
                Automate your legal compliance with AI. From GDPR to SOC 2, get enterprise-grade legal guidance 
                without the enterprise price tag. Purpose-built for fast-scaling startups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
                <Link href="/ask-ai" className="btn-primary text-lg px-8 py-4">
                  Start Free Trial
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
                  Watch Demo
                </Link>
              </div>
              <p className="text-sm text-secondary-500 mt-4">
                7-day free trial • No credit card required • Setup in 5 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 bg-secondary-50">
          <div className="container-custom">
            <p className="text-center text-secondary-600 mb-8">Built with modern technology</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {techStack.map((tech, index) => (
                <div key={index} className="text-secondary-700 font-semibold text-lg">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Everything Your Startup Needs</h2>
              <p className="text-large max-w-2xl mx-auto">
                Comprehensive legal automation designed specifically for high-growth startups
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card">
                <ShieldCheckIcon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="heading-3 mb-3">GDPR & Privacy Compliance</h3>
                <p className="text-secondary-600">
                  Automated privacy policy generation, GDPR compliance audits, and data protection frameworks.
                </p>
              </div>
              
              <div className="card">
                <DocumentTextIcon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="heading-3 mb-3">SOC 2 Certification</h3>
                <p className="text-secondary-600">
                  Complete SOC 2 Type II guidance, policy templates, and compliance monitoring.
                </p>
              </div>
              
              <div className="card">
                <UsersIcon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="heading-3 mb-3">Expert Legal Network</h3>
                <p className="text-secondary-600">
                  Access to 100+ startup lawyers specializing in fundraising, IP, and employment law.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section-padding bg-secondary-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-large max-w-2xl mx-auto">
                Choose the plan that scales with your startup's growth
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div key={index} className={`card relative ${tier.popular ? 'ring-2 ring-primary-600' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="heading-3 mb-2">{tier.name}</h3>
                    <p className="text-4xl font-bold text-secondary-900 mb-2">
                      {tier.price}<span className="text-lg text-secondary-500">/month</span>
                    </p>
                    <p className="text-secondary-600">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="section-padding bg-primary-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">See AI Legal Agents in Action</h2>
              <p className="text-large max-w-2xl mx-auto mb-8">
                Watch how our AI-powered platform transforms legal compliance for Massachusetts, Rhode Island, and Connecticut startups
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Interactive Demo */}
              <div className="relative">
                <InteractiveDemo />
              </div>

              {/* Demo Features */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll See:</h3>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Legal Q&A</h4>
                    <p className="text-gray-600">Ask complex legal questions and get instant, cited answers</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Case Triage</h4>
                    <p className="text-gray-600">Automatically classify and prioritize legal issues</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Generation</h4>
                    <p className="text-gray-600">Generate MA/RI/CT-specific legal documents with pricing</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Attorney Review Queue</h4>
                    <p className="text-gray-600">Human-in-loop compliance with jurisdiction tracking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Admin Analytics</h4>
                    <p className="text-gray-600">Real-time metrics and performance dashboards</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/ask-ai" className="btn-primary inline-flex items-center">
                    Try It Live Now
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <Link href="/pricing" className="ml-4 text-blue-600 hover:text-blue-700 font-medium">
                    View Pricing →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Loved by Startup Founders</h2>
              <p className="text-large max-w-2xl mx-auto">
                See how AI Legal Agents is transforming legal operations for high-growth startups
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <p className="text-secondary-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-secondary-900">{testimonial.name}</p>
                      <p className="text-sm text-secondary-600">{testimonial.role}</p>
                      <p className="text-sm text-primary-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom text-center">
            <h2 className="heading-2 text-white mb-4">Ready to Scale Your Legal Operations?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join the next generation of startups automating legal compliance with AI
            </p>
            <Link href="/ask-ai" className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Start Your Free Trial
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary-900 text-white py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <ScaleIcon className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">AI Legal Agents</span>
              </div>
              <div className="flex space-x-6 text-secondary-400">
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </div>
            </div>
            <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
              <p>&copy; 2024 AI Legal Agents. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 