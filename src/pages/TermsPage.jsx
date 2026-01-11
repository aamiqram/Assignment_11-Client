import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  AlertTriangle,
  Book,
  Shield,
  CreditCard,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const TermsPage = () => {
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
            <FileText className="w-10 h-10 text-primary-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Effective date: March 15, 2024
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
              {/* Agreement */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Scale className="w-6 h-6 text-primary-500" />
                  Agreement to Terms
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  By accessing or using LocalChefBazaar, you agree to be bound
                  by these Terms of Service. If you disagree with any part of
                  the terms, you may not access the service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Description of Service
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  LocalChefBazaar is a platform that connects customers with
                  local chefs who prepare and deliver homemade meals. We act as
                  an intermediary between chefs and customers, facilitating
                  transactions and delivery logistics.
                </p>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-primary-500" />
                  User Responsibilities
                </h2>
                <div className="space-y-6">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                      For Customers
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li>Provide accurate delivery information</li>
                      <li>Make payments promptly for orders</li>
                      <li>Communicate any allergies or dietary restrictions</li>
                      <li>Treat chefs and delivery personnel with respect</li>
                      <li>Provide honest reviews and feedback</li>
                      <li>Report any issues within 24 hours of delivery</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                      For Chefs
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                      <li>Prepare meals in a clean, hygienic environment</li>
                      <li>Use fresh, quality ingredients</li>
                      <li>Adhere to food safety standards</li>
                      <li>Meet delivery time commitments</li>
                      <li>Maintain accurate menu information</li>
                      <li>Handle customer complaints professionally</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Payments */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary-500" />
                  Payments and Refunds
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  All payments are processed securely through our payment
                  partners. We accept various payment methods as displayed on
                  our platform.
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                    Refund Policy
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          ✓
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          Full Refund
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          If order is cancelled before preparation begins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                          50%
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          Partial Refund
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          If order is cancelled during preparation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-bold">
                          ✗
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">
                          No Refund
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          After meal preparation is complete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Truck className="w-6 h-6 text-primary-500" />
                  Delivery Terms
                </h2>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      Delivery Times
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Estimated delivery times are provided by chefs. Actual
                      delivery times may vary based on traffic, weather, and
                      other factors.
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                    <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">
                      Delivery Areas
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Delivery is available within areas specified by each chef.
                      Check delivery area information before placing orders.
                    </p>
                  </div>
                </div>
              </section>

              {/* Food Safety */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-500" />
                  Food Safety & Quality
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  While we vet our chefs and require food safety certifications,
                  customers should:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>Check meal ingredients for allergies</li>
                  <li>Report any food safety concerns immediately</li>
                  <li>Store and reheat meals properly</li>
                  <li>Consume meals within recommended timeframes</li>
                </ul>
              </section>

              {/* Liability */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Limitation of Liability
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  To the maximum extent permitted by law, LocalChefBazaar shall
                  not be liable for any indirect, incidental, special,
                  consequential, or punitive damages resulting from:
                </p>
                <div className="mt-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                  <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>Your use or inability to use the service</li>
                    <li>
                      Any conduct or content of any third party on the service
                    </li>
                    <li>Any content obtained from the service</li>
                    <li>
                      Unauthorized access, use, or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                </div>
              </section>

              {/* Changes */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white flex items-center gap-3">
                  <Book className="w-6 h-6 text-primary-500" />
                  Changes to Terms
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We reserve the right to modify or replace these Terms at any
                  time. We will provide notice of any changes by posting the new
                  Terms on this page and updating the effective date.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  For any questions about these Terms, please contact us:
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                  <p className="font-medium text-neutral-900 dark:text-white mb-2">
                    Email: legal@localchefbazaar.com
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Legal Department, LocalChefBazaar
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    123 Food Street, Gourmet City, FC 12345
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                    Please allow 3-5 business days for a response
                  </p>
                </div>
              </section>

              {/* Links */}
              <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/privacy"
                    className="text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Privacy Policy
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

export default TermsPage;
