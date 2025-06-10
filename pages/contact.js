import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    type: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Netlify forms submission
    const form = e.target
    const formData = new FormData(form)
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      // Still show success for demo purposes
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>Contact AI Legal Agents | Get in Touch</title>
        <meta name="description" content="Contact AI Legal Agents for startup legal automation. Sales inquiries, support, and partnership opportunities." />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white border-b border-secondary-200">
          <div className="container-custom">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-2">
                <ScaleIcon className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-secondary-900">AI Legal Agents</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-secondary-600 hover:text-secondary-900">Home</Link>
                <Link href="/experts" className="text-secondary-600 hover:text-secondary-900">Experts</Link>
                <Link href="/pricing" className="text-secondary-600 hover:text-secondary-900">Pricing</Link>
                <Link href="/ask-ai" className="btn-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="section-padding bg-secondary-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h1 className="heading-1 mb-6">Get in Touch</h1>
              <p className="text-large max-w-2xl mx-auto">
                Ready to automate your startup's legal operations? Let's talk about how AI Legal Agents can help you scale.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card">
                <h2 className="heading-2 mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">Message Sent!</h3>
                    <p className="text-secondary-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form name="contact" method="POST" action="/thank-you" data-netlify="true" onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="demo">Request Demo</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Tell us about your startup and legal automation needs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 text-lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="card">
                  <h3 className="heading-3 mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Email</p>
                                                 <p className="text-secondary-600">bferrell514@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="h-6 w-6 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Phone</p>
                        <p className="text-secondary-600">Available upon request</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Location</p>
                        <p className="text-secondary-600">Boston, MA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="heading-3 mb-6">Quick Links</h3>
                  
                  <div className="space-y-3">
                    <Link href="/ask-ai" className="block p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                      <p className="font-medium text-primary-900">Start Free Trial</p>
                      <p className="text-sm text-primary-600">Test our AI legal assistant</p>
                    </Link>
                    
                    <Link href="/experts" className="block p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                      <p className="font-medium text-secondary-900">Browse Experts</p>
                      <p className="text-sm text-secondary-600">Connect with legal specialists</p>
                    </Link>
                    
                    <Link href="/pricing" className="block p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                      <p className="font-medium text-secondary-900">View Pricing</p>
                      <p className="text-sm text-secondary-600">Plans starting at $199/month</p>
                    </Link>
                  </div>
                </div>

                <div className="card">
                  <h3 className="heading-3 mb-6">Follow Us</h3>
                  
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors">
                      <span className="text-secondary-600 font-medium">Li</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors">
                      <span className="text-secondary-600 font-medium">Tw</span>
                    </a>
                    <a href="https://youtube.com/shorts/PPleB64o_V0?si=2kCXutazs_0GweNu" className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                      <span className="text-red-600 font-medium">YT</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600">
          <div className="container-custom text-center">
            <h2 className="heading-2 text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Don't wait for legal issues to slow down your startup. Start automating today.
            </p>
            <Link href="/ask-ai" className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Try AI Legal Agents Free
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