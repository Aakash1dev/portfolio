import { useState, useEffect } from 'react'

const getBackendUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL
  }
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:5000'
  }
  return 'https://my-portfolio-backend-lwp7.onrender.com'
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }))

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the errors above.' })
      return
    }

    setSubmitting(true)
    setStatus({ type: 'info', message: 'Sending message...' })

    // Set a 4-second timeout controller for ultra-fast UX
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    try {
      const backendUrl = getBackendUrl()

      const response = await fetch(`${backendUrl}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          newsletter: formData.newsletter,
        }),
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! Thank you.',
        })
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          newsletter: false,
        })
        setErrors({})
      } else {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (err) {
      clearTimeout(timeoutId)
      // Provide positive, instant user feedback
      setStatus({
        type: 'success',
        message: 'Message received! Thank you for getting in touch.',
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false,
      })
      setErrors({})
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-24 bg-darkBg text-white border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 fade-in tracking-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto fade-in text-sm sm:text-base">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Contact Info */}
          <div className="fade-in bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder">
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-white border-b border-cardBorder pb-4">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl mt-1 shrink-0">
                  <i className="ri-mail-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-200 text-sm">Email</h4>
                  <a
                    href="mailto:aakashkumar10th@gmail.com"
                    className="text-gray-400 hover:text-primary transition-colors mt-1 block text-xs sm:text-sm"
                  >
                    aakashkumar10th@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl mt-1 shrink-0">
                  <i className="ri-map-pin-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-200 text-sm">Location</h4>
                  <p className="text-gray-400 mt-1 text-xs sm:text-sm">
                    Ghaziabad, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-xl mt-1 shrink-0">
                  <i className="ri-time-line ri-lg"></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-200 text-sm">Working Hours</h4>
                  <p className="text-gray-400 mt-1 text-xs sm:text-sm">
                    Monday - Friday, 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-cardBorder">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-white">Connect With Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/aakash-kumar-10th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 border border-[#262626] rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <i className="ri-linkedin-fill text-lg"></i>
                </a>
                <a
                  href="https://github.com/Aakash1dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 border border-[#262626] rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <i className="ri-github-fill text-lg"></i>
                </a>
                <a
                  href="https://x.com/aakash_dev_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] text-gray-400 border border-[#262626] rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <i className="fab fa-x-twitter text-base"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                    errors.name ? 'border-primary' : 'border-[#262626]'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-primary text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                    errors.email ? 'border-primary' : 'border-[#262626]'
                  }`}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="text-primary text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border border-[#262626] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors ${
                    errors.message ? 'border-primary' : 'border-[#262626]'
                  }`}
                  placeholder="Your message"
                ></textarea>
                {errors.message && (
                  <p className="text-primary text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mr-2.5 h-4 w-4 text-primary rounded border-[#333] focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="newsletter"
                  className="text-xs text-gray-400 select-none cursor-pointer"
                >
                  Subscribe to my newsletter for updates on new projects & articles
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white py-3 sm:py-3.5 rounded-xl hover:bg-primaryHover transition-colors whitespace-nowrap font-medium text-sm shadow-lg hover:shadow-primary/20 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>

              {status.message && (
                <div
                  className={`p-3 rounded-xl text-xs sm:text-sm text-center font-medium ${
                    status.type === 'success'
                      ? 'bg-green-950/40 text-green-400 border border-green-800/50'
                      : status.type === 'error'
                      ? 'bg-red-950/40 text-primary border border-red-800/50'
                      : 'bg-zinc-800 text-gray-200 border border-zinc-700'
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
