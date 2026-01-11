import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Mail,
  MessageSquare,
  Book,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Ordering & Payments",
      icon: "🛒",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse meals, select your desired meal, choose quantity, and proceed to checkout. You'll need to provide delivery address and payment information.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards, mobile banking, and digital wallets through our secure payment gateway.",
        },
        {
          q: "Can I modify or cancel my order?",
          a: "Orders can be modified or cancelled within 15 minutes of placement, before preparation begins.",
        },
      ],
    },
    {
      title: "Delivery & Logistics",
      icon: "🚚",
      questions: [
        {
          q: "What are your delivery hours?",
          a: "Delivery hours vary by chef. Most chefs deliver between 11 AM and 10 PM daily.",
        },
        {
          q: "How long does delivery take?",
          a: "Delivery typically takes 30-60 minutes depending on your location and chef's preparation time.",
        },
        {
          q: "Can I track my order?",
          a: "Yes! Once your order is confirmed, you'll receive a tracking link with real-time updates.",
        },
      ],
    },
    {
      title: "Chef & Food Safety",
      icon: "👨‍🍳",
      questions: [
        {
          q: "How are chefs vetted?",
          a: "All chefs undergo background checks, kitchen inspections, and food safety certification before joining.",
        },
        {
          q: "What if I have food allergies?",
          a: "Please check meal ingredients and mention allergies in the order notes. Chefs will accommodate when possible.",
        },
        {
          q: "How is food quality maintained?",
          a: "Chefs use fresh ingredients and follow strict food safety protocols. All meals are prepared after ordering.",
        },
      ],
    },
    {
      title: "Account & Technical",
      icon: "📱",
      questions: [
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page. You'll receive an email with reset instructions.",
        },
        {
          q: "How do I update my profile?",
          a: "Go to Dashboard → My Profile to update your information, address, and preferences.",
        },
        {
          q: "The app isn't working. What should I do?",
          a: "Try clearing cache, updating the app, or contacting support if issues persist.",
        },
      ],
    },
  ];

  const supportChannels = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      response: "Instant response",
      button: "Start Chat",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      response: "Within 24 hours",
      button: "Send Email",
      color: "bg-green-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our hotline",
      response: "9 AM - 6 PM daily",
      button: "Call Now",
      color: "bg-purple-500",
    },
    {
      icon: Book,
      title: "Knowledge Base",
      description: "Browse articles",
      response: "Self-service",
      button: "Browse Articles",
      color: "bg-orange-500",
    },
  ];

  const allFAQs = faqCategories.flatMap((category) => category.questions);
  const filteredFAQs = searchQuery
    ? allFAQs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFAQs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <HelpCircle className="w-10 h-10 text-primary-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
            Help & Support
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Find answers, get help, or contact our support team
          </p>
        </div>

        {/* Search */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors shadow-lg"
            />
          </div>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportChannels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center mb-4`}
              >
                <channel.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                {channel.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {channel.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                <span>Response time:</span>
                <span className="font-medium">{channel.response}</span>
              </div>
              <button className="w-full py-3 rounded-lg border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                {channel.button}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Categories */}
        {!searchQuery && (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {faqCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIdx) => (
                      <div
                        key={faqIdx}
                        className="border-b border-neutral-100 dark:border-neutral-700 pb-4 last:border-0 last:pb-0"
                      >
                        <button
                          onClick={() =>
                            setExpandedFAQ(
                              expandedFAQ === `${idx}-${faqIdx}`
                                ? null
                                : `${idx}-${faqIdx}`
                            )
                          }
                          className="w-full text-left flex items-start justify-between gap-4"
                        >
                          <span className="font-medium text-neutral-900 dark:text-white flex-1">
                            {faq.q}
                          </span>
                          {expandedFAQ === `${idx}-${faqIdx}` ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === `${idx}-${faqIdx}` && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pl-2"
                          >
                            <p className="text-neutral-600 dark:text-neutral-400">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">
              Search Results for "{searchQuery}"
            </h2>
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                      {faq.q}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Try different keywords or browse our categories
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-white/90 mb-8">
              Can't find what you're looking for? Send us a message and we'll
              get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/30 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/30 transition-colors"
                />
              </div>
              <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/30 transition-colors">
                <option value="">Select Issue Type</option>
                <option value="order">Order Issue</option>
                <option value="payment">Payment Issue</option>
                <option value="account">Account Issue</option>
                <option value="technical">Technical Issue</option>
                <option value="other">Other</option>
              </select>
              <textarea
                rows="4"
                placeholder="Describe your issue..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/30 transition-colors"
              ></textarea>
              <button className="w-full py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-white/90 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <h3 className="text-xl font-bold mb-6 text-center text-neutral-900 dark:text-white">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "How to Order", link: "/help/how-to-order" },
              { title: "Become a Chef", link: "/dashboard/createmeal" },
              { title: "Delivery Policy", link: "/help/delivery" },
              { title: "Refund Policy", link: "/help/refunds" },
              { title: "Safety Guidelines", link: "/help/safety" },
              { title: "Community Guidelines", link: "/help/community" },
              { title: "Blog", link: "/blog" },
              { title: "About Us", link: "/about" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                className="p-4 bg-white dark:bg-neutral-800 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
