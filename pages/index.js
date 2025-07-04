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

const benefits = [
  {
    icon: '⚡',
    title: 'Instant Legal Guidance',
    description: 'Get answers to complex legal questions in seconds, not days. Our AI analyzes your specific situation and provides actionable guidance.'
  },
  {
    icon: '💰',
    title: '90% Cost Reduction',
    description: 'Pay $199-$1,299/month instead of $50,000+ for traditional legal services. Enterprise-grade guidance at startup-friendly prices.'
  },
  {
    icon: '🎯',
    title: 'Startup-Specific Expertise',
    description: 'Built specifically for venture-backed companies. Covers fundraising, GDPR, SOC 2, employment law, and international expansion.'
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
                <button 
                  onClick={() => window.open('https://youtube.com/shorts/PPleB64o_V0?si=2kCXutazs_0GweNu', '_blank')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Watch Demo
                </button>
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

                  {tier.cta === 'Contact Sales' ? (
                    <Link href="/contact" className={`block w-full text-center ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                      {tier.cta}
                    </Link>
                  ) : (
                    <Link href="/ask-ai" className={`block w-full text-center ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                      {tier.cta}
                    </Link>
                  )}
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
              
              {/* YouTube Short Embed */}
              <div className="flex justify-center mb-12">
                <div className="relative w-full max-w-md">
                  <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
                    <iframe
                      src="https://www.youtube.com/embed/PPleB64o_V0"
                      title="AI Legal Agents Demo"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-secondary-600">60-second platform overview</p>
                  </div>
                </div>
              </div>
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

        {/* Benefits Section */}
        <section id="benefits" className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Why Startups Choose AI Legal Agents</h2>
              <p className="text-large max-w-2xl mx-auto">
                Built specifically for fast-scaling companies that need enterprise-grade legal guidance without the enterprise price tag
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="card text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="heading-3 mb-4">{benefit.title}</h3>
                  <p className="text-secondary-600">{benefit.description}</p>
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
            <form name="early-access" method="POST" action="/thank-you" data-netlify="true" className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
              <input type="hidden" name="form-name" value="early-access" />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email for early access"
                required
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button type="submit" className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap">
                Get Early Access
              </button>
            </form>
            <div className="mb-8">
              <Link href="/ask-ai" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                Start Your Free Trial
              </Link>
            </div>
            <p className="text-sm text-primary-200">
              Join 500+ founders who've automated their legal operations • No spam, ever
            </p>
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
                <Link href="/contact" className="hover:text-white">Contact</Link>
                <Link href="/pricing" className="hover:text-white">Pricing</Link>
                <Link href="/experts" className="hover:text-white">Experts</Link>
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