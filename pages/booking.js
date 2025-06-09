import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ScaleIcon, ArrowLeftIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [step, setStep] = useState(1) // 1: select time, 2: details, 3: confirmation

  // Mock available time slots
  const availableDates = [
    { date: '2024-06-10', day: 'Monday', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
    { date: '2024-06-11', day: 'Tuesday', slots: ['9:00 AM', '11:00 AM', '1:00 PM'] },
    { date: '2024-06-12', day: 'Wednesday', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { date: '2024-06-13', day: 'Thursday', slots: ['9:30 AM', '11:30 AM', '3:00 PM'] },
    { date: '2024-06-14', day: 'Friday', slots: ['9:00 AM', '1:30 PM'] }
  ]

  const expert = {
    name: 'Sarah Mitchell',
    title: 'Partner, Startup Legal',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b1?w=400',
    hourlyRate: '$650',
    specialization: 'Series A-C Fundraising, GDPR Compliance'
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  return (
    <>
      <Head>
        <title>Book Consultation | AI Legal Agents</title>
        <meta name="description" content="Schedule a consultation with our expert startup lawyers" />
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
                  <span className="font-semibold text-secondary-900">Book Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-secondary-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                    {step > 1 ? <CheckCircleIcon className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="ml-2 font-medium">Select Time</span>
                </div>
                <div className={`w-12 h-px ${step >= 2 ? 'bg-primary-600' : 'bg-secondary-200'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-secondary-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                    {step > 2 ? <CheckCircleIcon className="w-5 h-5" /> : '2'}
                  </div>
                  <span className="ml-2 font-medium">Details</span>
                </div>
                <div className={`w-12 h-px ${step >= 3 ? 'bg-primary-600' : 'bg-secondary-200'}`}></div>
                <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-secondary-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-secondary-200'}`}>
                    {step > 3 ? <CheckCircleIcon className="w-5 h-5" /> : '3'}
                  </div>
                  <span className="ml-2 font-medium">Confirmation</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className="card">
                    <h2 className="heading-3 mb-6">Select Date & Time</h2>
                    
                    {/* Date Selection */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-secondary-900 mb-4">Available Dates</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {availableDates.map((dateOption) => (
                          <button
                            key={dateOption.date}
                            onClick={() => handleDateSelect(dateOption)}
                            className={`p-4 rounded-lg border text-left transition-colors ${
                              selectedDate?.date === dateOption.date
                                ? 'border-primary-500 bg-primary-50 text-primary-900'
                                : 'border-secondary-200 hover:border-primary-300'
                            }`}
                          >
                            <div className="font-medium">{dateOption.day}</div>
                            <div className="text-sm text-secondary-600">
                              {new Date(dateOption.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="text-xs text-secondary-500 mt-1">
                              {dateOption.slots.length} slots available
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <h3 className="font-semibold text-secondary-900 mb-4">
                          Available Times for {selectedDate.day}
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {selectedDate.slots.map((time) => (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`p-3 rounded-lg border text-center transition-colors ${
                                selectedTime === time
                                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                                  : 'border-secondary-200 hover:border-primary-300'
                              }`}
                            >
                              <ClockIcon className="w-4 h-4 mx-auto mb-1" />
                              <div className="font-medium">{time}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="card">
                    <h2 className="heading-3 mb-6">Consultation Details</h2>
                    
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your startup name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Legal Challenge Description *
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Briefly describe your legal needs..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Funding Stage
                        </label>
                        <select className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                          <option>Select funding stage</option>
                          <option>Pre-seed</option>
                          <option>Seed</option>
                          <option>Series A</option>
                          <option>Series B</option>
                          <option>Series C+</option>
                          <option>Not applicable</option>
                        </select>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="card text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="heading-3 mb-4">Consultation Booked!</h2>
                    <p className="text-secondary-600 mb-6">
                      Your consultation with {expert.name} has been successfully scheduled. 
                      You'll receive a confirmation email with meeting details and preparation materials.
                    </p>
                    
                    <div className="bg-secondary-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-secondary-900 mb-3">Meeting Details</h3>
                      <div className="text-left space-y-2">
                        <p><strong>Date:</strong> {selectedDate?.day}, {new Date(selectedDate?.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Duration:</strong> 60 minutes</p>
                        <p><strong>Cost:</strong> {expert.hourlyRate} (billed after consultation)</p>
                        <p><strong>Meeting Link:</strong> Will be sent via email</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/chat" className="btn-primary">
                        Ask AI Questions Before Meeting
                      </Link>
                      <Link href="/experts" className="btn-secondary">
                        Browse Other Experts
                      </Link>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step < 3 && (
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setStep(Math.max(1, step - 1))}
                      className="btn-secondary"
                      disabled={step === 1}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      className="btn-primary"
                      disabled={step === 1 && (!selectedDate || !selectedTime)}
                    >
                      {step === 1 ? 'Continue' : 'Book Consultation'}
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Expert Info */}
                <div className="card">
                  <h3 className="font-semibold text-secondary-900 mb-4">Your Expert</h3>
                  <div className="flex items-start space-x-3">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-secondary-900">{expert.name}</p>
                      <p className="text-sm text-secondary-600">{expert.title}</p>
                      <p className="text-sm text-primary-600 font-medium">{expert.hourlyRate}/hour</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-secondary-200">
                    <p className="text-sm text-secondary-600">
                      <strong>Specializes in:</strong> {expert.specialization}
                    </p>
                  </div>
                </div>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="card">
                    <h3 className="font-semibold text-secondary-900 mb-4">Booking Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 text-secondary-400 mr-2" />
                        <span className="text-sm">{selectedDate.day}, {new Date(selectedDate.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 text-secondary-400 mr-2" />
                        <span className="text-sm">{selectedTime} (60 min)</span>
                      </div>
                      <div className="pt-3 border-t border-secondary-200">
                        <div className="flex justify-between text-sm">
                          <span>Consultation Fee:</span>
                          <span className="font-medium">{expert.hourlyRate}</span>
                        </div>
                        <p className="text-xs text-secondary-500 mt-1">
                          Billed after consultation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* What to Expect */}
                <div className="card">
                  <h3 className="font-semibold text-secondary-900 mb-4">What to Expect</h3>
                  <ul className="text-sm text-secondary-600 space-y-2">
                    <li>• Pre-consultation questionnaire</li>
                    <li>• 60-minute video call</li>
                    <li>• Legal strategy recommendations</li>
                    <li>• Follow-up action items</li>
                    <li>• Recording available upon request</li>
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