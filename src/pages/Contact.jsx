import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@localchefbazaar.com", "support@localchefbazaar.com"],
      description: "We'll reply within 24 hours",
      color: "bg-blue-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri, 9am-6pm EST",
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Food Street", "Gourmet City, FC 12345", "Bangladesh"],
      description: "Office hours: 9 AM - 6 PM",
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 10:00 PM", "Sat-Sun: 10:00 AM - 11:00 PM"],
      description: "Delivery available all week",
      color: "bg-orange-500",
    },
  ];

  const faqs = [
    {
      question: "How do I become a chef on your platform?",
      answer:
        "Visit our 'Become a Chef' page, fill out the application form, and our team will review your submission within 48 hours.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver within major cities. Check the delivery area filter on the meals page for specific locations.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is confirmed, you'll receive a tracking link via email and SMS with real-time updates.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, mobile banking, and digital wallets through our secure payment gateway.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
                Contact Information
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Reach out to us through any of the following channels. Our team
                typically responds within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                      {method.title}
                    </h3>
                    <div className="space-y-1 mb-2">
                      {method.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-neutral-600 dark:text-neutral-400"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-sm"
                  >
                    <h4 className="font-bold text-neutral-900 dark:text-white mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                    Send us a Message
                  </h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Fill out the form below
                  </p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="chef">Become a Chef</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                    By submitting this form, you agree to our Privacy Policy
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Location */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Our Location
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Visit us at our headquarters
              </p>
            </div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 relative">
              {/* This would be a real map in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                  <p className="font-medium text-neutral-900 dark:text-white">
                    123 Food Street, Gourmet City
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    FC 12345, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
