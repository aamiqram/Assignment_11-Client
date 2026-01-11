import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import MealCard from "../components/ui/MealCard";
import MealCardSkeleton from "../components/ui/MealCardSkeleton";
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
  Mail,
  Calendar,
  MapPin,
  Phone,
  Globe,
  TrendingUp,
  CheckCircle,
  Leaf,
  Coffee,
  Pizza,
  Cake,
  Salad,
  Soup,
} from "lucide-react";
import { useState } from "react";

const Home = () => {
  const { data = { meals: [] }, isLoading: mealsLoading } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals?limit=8");
      return res.data;
    },
  });

  const dailyMeals = data.meals || [];

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-reviews");
      return res.data;
    },
  });

  const { data: chefs = [], isLoading: chefsLoading } = useQuery({
    queryKey: ["featuredChefs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chefs?featured=true&limit=6");
      return res.data;
    },
  });

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats/home");
      return res.data;
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail("");
    }
  };

  // Categories for Meal Categories section
  const mealCategories = [
    { icon: Pizza, name: "Italian", count: 45, color: "bg-orange-500" },
    { icon: Salad, name: "Healthy", count: 32, color: "bg-green-500" },
    { icon: Cake, name: "Desserts", count: 28, color: "bg-pink-500" },
    { icon: Soup, name: "Comfort Food", count: 38, color: "bg-yellow-500" },
    { icon: Leaf, name: "Vegetarian", count: 42, color: "bg-emerald-500" },
    { icon: Coffee, name: "Breakfast", count: 25, color: "bg-amber-500" },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How does LocalChefBazaar work?",
      answer:
        "Browse meals from local chefs, place your order, and enjoy fresh homemade food delivered to your doorstep. Chefs cook to order for maximum freshness.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times vary by chef and location, typically 30-60 minutes. Each chef provides estimated delivery times for their meals.",
    },
    {
      question: "Can I customize my order?",
      answer:
        "Yes! You can add special instructions for any meal. Many chefs also offer customization options for ingredients and portions.",
    },
    {
      question: "How are the chefs vetted?",
      answer:
        "All chefs go through a thorough verification process including background checks, kitchen inspections, and food safety certification.",
    },
  ];

  // Features Data
  const features = [
    {
      icon: Shield,
      title: "Food Safety Certified",
      description: "All chefs follow strict food safety protocols",
    },
    {
      icon: Clock,
      title: "Freshly Cooked",
      description: "Meals prepared only after you order",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish cooked with passion and care",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Hot meals delivered to your doorstep",
    },
    {
      icon: Star,
      title: "Quality Ingredients",
      description: "Only fresh, high-quality ingredients used",
    },
    {
      icon: Award,
      title: "Chef Verified",
      description: "All chefs professionally verified",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative pt-20 pb-16 md:py-24 px-4 bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
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

              {/* CTA Buttons */}
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
                    {stats.totalCustomers || "500+"}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    {stats.totalChefs || "50+"}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Local Chefs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    {stats.totalMeals || "1000+"}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Meals Delivered
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
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

      {/* ========== SECTION 2: HOW IT WORKS ========== */}
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
                step: "1",
              },
              {
                icon: Clock,
                title: "Place Order",
                desc: "Choose your meal and customize your order",
                color: "blue",
                step: "2",
              },
              {
                icon: Truck,
                title: "Enjoy Delivery",
                desc: "Fresh meals delivered to your doorstep",
                color: "green",
                step: "3",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>
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

      {/* ========== SECTION 3: MEAL CATEGORIES ========== */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Popular Categories
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Explore meals by category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mealCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1 text-neutral-900 dark:text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {category.count}+ meals
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: TODAY'S SPECIALS ========== */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
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

          {mealsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <MealCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dailyMeals.slice(0, 4).map((meal, idx) => (
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

      {/* ========== SECTION 5: FEATURED CHEFS ========== */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Featured Chefs
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Meet our talented chefs who bring love to every dish
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chefsLoading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg animate-pulse"
                  >
                    <div className="w-20 h-20 rounded-full bg-neutral-200 dark:bg-neutral-700 mx-auto mb-4"></div>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 w-3/4 mx-auto"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-3 w-1/2 mx-auto"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-2/3 mx-auto"></div>
                  </div>
                ))
              : chefs.slice(0, 3).map((chef, idx) => (
                  <motion.div
                    key={chef._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src={
                          chef.image ||
                          "https://i.ibb.co.com/0s3pdnc/avatar.png"
                        }
                        alt={chef.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                      Chef {chef.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-500 mb-3">
                      {chef.specialty || "Master Chef"}
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                      {chef.experience || "5+ years of experience"}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">
                        {chef.rating || "4.8"}
                      </span>
                      <span className="text-neutral-500">
                        ({chef.reviewCount || 120} reviews)
                      </span>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: FEATURES ========== */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Why Choose Us
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Experience the difference with LocalChefBazaar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: TESTIMONIALS ========== */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Real reviews from people who love our service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {reviewsLoading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-2xl p-6 animate-pulse"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-white/20"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-white/20 rounded"></div>
                        <div className="h-3 w-16 bg-white/20 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/20 rounded"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </div>
                ))
              : reviews.slice(0, 3).map((review, idx) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
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
                        <h4 className="font-bold text-white">
                          {review.reviewerName}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 italic mb-4">
                      "{review.comment}"
                    </p>
                    {review.meal && (
                      <div className="text-sm text-white/70">
                        Ordered: {review.meal.foodName}
                      </div>
                    )}
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: STATISTICS ========== */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Join our growing community of food lovers and chefs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "500+", label: "Happy Customers", icon: Users },
              { value: "50+", label: "Local Chefs", icon: ChefHat },
              { value: "1000+", label: "Meals Delivered", icon: Truck },
              { value: "4.8", label: "Average Rating", icon: Star },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-primary-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-neutral-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: FAQ ========== */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Find answers to common questions about our service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold">?</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 10: CTA ========== */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
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
