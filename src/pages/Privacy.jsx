import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Cookie, Users, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-10 h-10 text-primary-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Last updated: March 15, 2024
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary-500" />
                  Your Privacy Matters
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  At LocalChefBazaar, we take your privacy seriously. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use our platform.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Please read this privacy policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the platform.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary-500" />
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                      Personal Data
                    </h3>
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                      <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>
                          Name and contact information (email, phone number)
                        </li>
                        <li>Delivery address and location data</li>
                        <li>
                          Payment information (processed securely through our
                          payment partners)
                        </li>
                        <li>Profile picture and account preferences</li>
                        <li>Dietary restrictions and food preferences</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                      Usage Data
                    </h3>
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                      <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                        We collect information about how you use our platform,
                        including:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>Meal preferences and order history</li>
                        <li>Search queries and browsing behavior</li>
                        <li>Device information and IP address</li>
                        <li>Cookies and similar tracking technologies</li>
                        <li>Interaction with chefs and reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary-500" />
                  How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🍽️",
                      title: "Service Delivery",
                      desc: "Process orders and deliver meals",
                    },
                    {
                      icon: "👨‍🍳",
                      title: "Chef Matching",
                      desc: "Connect you with local chefs",
                    },
                    {
                      icon: "📱",
                      title: "Platform Improvement",
                      desc: "Enhance user experience",
                    },
                    {
                      icon: "🔒",
                      title: "Security",
                      desc: "Prevent fraud and ensure safety",
                    },
                  ].map((use, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4"
                    >
                      <div className="text-2xl mb-2">{use.icon}</div>
                      <h4 className="font-bold mb-1 text-neutral-900 dark:text-white">
                        {use.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {use.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Data Sharing & Disclosure
                </h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      With Chefs
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      We share necessary information with chefs to fulfill your
                      orders, including delivery address and order details.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      With Service Providers
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      We may share data with payment processors, delivery
                      services, and analytics providers under strict
                      confidentiality agreements.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-primary-500" />
                  Cookies & Tracking
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  We use cookies and similar tracking technologies to track
                  activity on our platform and hold certain information.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      Essential Cookies
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Required for basic platform functionality
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Help us understand how users interact with our platform
                    </p>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-500" />
                  Your Data Protection Rights
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>
                      <strong>The right to access</strong> – Request copies of
                      your personal data
                    </li>
                    <li>
                      <strong>The right to rectification</strong> – Request
                      correction of inaccurate data
                    </li>
                    <li>
                      <strong>The right to erasure</strong> – Request deletion
                      of your personal data
                    </li>
                    <li>
                      <strong>The right to restrict processing</strong> –
                      Request restriction of data processing
                    </li>
                    <li>
                      <strong>The right to data portability</strong> – Request
                      transfer of your data
                    </li>
                    <li>
                      <strong>The right to object</strong> – Object to our
                      processing of your data
                    </li>
                  </ul>
                </div>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Children's Privacy
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Our service is not intended for anyone under the age of 13. We
                  do not knowingly collect personally identifiable information
                  from children under 13.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary-500" />
                  Changes to This Privacy Policy
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Contact Us
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                  <p className="font-medium text-neutral-900 dark:text-white mb-2">
                    Email: privacy@localchefbazaar.com
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Address: 123 Food Street, Gourmet City, FC 12345
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                    We typically respond within 48 hours
                  </p>
                </div>
              </section>

              {/* Links */}
              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/terms"
                    className="text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/contact"
                    className="text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/help"
                    className="text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
