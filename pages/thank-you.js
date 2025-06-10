import Head from 'next/head'
import Link from 'next/link'
import { ScaleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You | AI Legal Agents</title>
        <meta name="description" content="Thank you for contacting AI Legal Agents. We'll be in touch soon!" />
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

        {/* Thank You Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="heading-1 mb-6">Thank You!</h1>
              <p className="text-large mb-8">
                We've received your message and will get back to you within 24 hours. 
                In the meantime, feel free to explore our platform.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Link href="/ask-ai" className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Try Our AI Legal Assistant</h3>
                  <p className="text-secondary-600">Get instant answers to legal questions</p>
                </Link>
                
                <Link href="/experts" className="card hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-lg mb-2">Browse Expert Network</h3>
                  <p className="text-secondary-600">Connect with specialized attorneys</p>
                </Link>
              </div>

              <div className="space-y-4">
                <p className="text-secondary-600">
                  <strong>Response Time:</strong> Within 24 hours
                </p>
                <p className="text-secondary-600">
                  <strong>Questions?</strong> Email us at bferrell514@gmail.com
                </p>
              </div>

              <div className="mt-12">
                <Link href="/" className="btn-primary text-lg px-8 py-4">
                  Return to Homepage
                </Link>
              </div>
            </div>
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