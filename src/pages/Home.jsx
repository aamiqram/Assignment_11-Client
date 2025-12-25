import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import MealCard from "../components/ui/MealCard";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Clock,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Users,
  Heart,
  Award,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const { data = { meals: [] }, isLoading } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals?limit=6");
      return res.data;
    },
  });

  const dailyMeals = data.meals || [];

  const { data: reviews = [] } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-reviews");
      return res.data;
    },
  });

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:py-24 px-4 bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Fresh{" "}
                <span className="text-primary-600 dark:text-primary-500">
                  Homemade Meals
                </span>
                <br />
                From Local Chefs
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover authentic, healthy, and affordable home-cooked food
                delivered straight to your door. Supporting local chefs, one
                meal at a time.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mb-8">
                <input
                  type="text"
                  placeholder="Search for meals, chefs, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 shadow-lg"
                />
                <ChefHat className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/meals"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/chefs"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
                >
                  Meet Our Chefs
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 md:gap-8 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    50+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Local Chefs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    1000+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Meals Delivered
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop"
                  alt="Delicious homemade food"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Get delicious homemade meals in just a few clicks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: ChefHat,
                title: "Browse Meals",
                desc: "Explore meals from local chefs in your area",
                color: "primary",
              },
              {
                icon: Clock,
                title: "Place Order",
                desc: "Choose your meal and customize your order",
                color: "blue",
              },
              {
                icon: Truck,
                title: "Enjoy Delivery",
                desc: "Fresh meals delivered to your doorstep",
                color: "green",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center mx-auto mb-6`}
                >
                  <step.icon className={`w-8 h-8 text-${step.color}-500`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-center">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-neutral-900 dark:text-white">
                Today's Special Meals
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Handpicked meals from our top chefs
              </p>
            </div>
            <Link
              to="/meals"
              className="flex items-center gap-2 text-primary-600 dark:text-primary-500 font-semibold hover:gap-3 transition-all duration-300"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Loading delicious meals...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyMeals.map((meal, idx) => (
                <motion.div
                  key={meal._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MealCard meal={meal} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              What Our Customers Say
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real reviews from people who love our service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {reviews.slice(0, 3).map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={
                        review.reviewerImage ||
                        "https://i.ibb.co.com/0s3pdnc/avatar.png"
                      }
                      alt={review.reviewerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">
                      {review.reviewerName}
                    </h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-neutral-300 dark:text-neutral-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 italic mb-4">
                  "{review.comment}"
                </p>
                {review.meal && (
                  <div className="text-sm text-neutral-500 dark:text-neutral-500">
                    Ordered: {review.meal.foodName}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary-500 to-orange-500 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers enjoying homemade meals today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-white text-primary-600 font-semibold hover:bg-white/90 transition-colors"
              >
                Start Ordering
              </Link>
              <Link
                to="/dashboard/createmeal"
                className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                Become a Chef
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
