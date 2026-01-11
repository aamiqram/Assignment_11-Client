import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  ChefHat,
  Heart,
  TrendingUp,
  Tag,
  BookOpen,
} from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Homemade Cooking: Why It's Better",
      excerpt:
        "Discover why homemade meals prepared by local chefs offer better taste, nutrition, and community connection than commercial alternatives.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      category: "Cooking Tips",
      tags: ["Cooking", "Health", "Local"],
    },
    {
      id: 2,
      title: "Supporting Local Chefs: Building Community Through Food",
      excerpt:
        "How our platform empowers home chefs to share their culinary talents while creating meaningful connections within the community.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
      author: "David Chen",
      date: "Mar 10, 2024",
      readTime: "7 min read",
      category: "Community",
      tags: ["Community", "Chefs", "Support"],
    },
    {
      id: 3,
      title: "5 Easy Meal Prep Ideas from Our Top Chefs",
      excerpt:
        "Professional tips and tricks for meal preparation that save time while ensuring delicious, healthy meals throughout the week.",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
      author: "Maria Garcia",
      date: "Mar 5, 2024",
      readTime: "6 min read",
      category: "Recipes",
      tags: ["Recipes", "Meal Prep", "Tips"],
    },
    {
      id: 4,
      title: "The Rise of Food Delivery: Trends in 2024",
      excerpt:
        "Exploring the latest trends in food delivery services and what consumers are looking for in homemade meal delivery.",
      image:
        "https://images.unsplash.com/photo-1559314809-2b99056a8c4a?w=800&auto=format&fit=crop",
      author: "Alex Johnson",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      category: "Industry",
      tags: ["Trends", "Delivery", "Industry"],
    },
    {
      id: 5,
      title: "From Home Cook to Professional Chef: Success Stories",
      excerpt:
        "Inspiring stories from our community members who turned their passion for cooking into a successful business.",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
      author: "Tom Wilson",
      date: "Feb 20, 2024",
      readTime: "10 min read",
      category: "Success Stories",
      tags: ["Success", "Stories", "Inspiration"],
    },
    {
      id: 6,
      title: "Healthy Eating Made Easy with LocalChefBazaar",
      excerpt:
        "How our platform makes healthy eating accessible with nutritionist-approved meals from local chefs.",
      image:
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop",
      author: "Dr. Lisa Park",
      date: "Feb 15, 2024",
      readTime: "6 min read",
      category: "Health",
      tags: ["Health", "Nutrition", "Wellness"],
    },
  ];

  const categories = [
    { name: "All", count: 25 },
    { name: "Cooking Tips", count: 8 },
    { name: "Recipes", count: 6 },
    { name: "Health & Nutrition", count: 5 },
    { name: "Success Stories", count: 4 },
    { name: "Industry Trends", count: 2 },
  ];

  const popularPosts = blogPosts.slice(0, 3);

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
            Our Blog
          </motion.h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Insights, stories, and tips from our community of food lovers and
            chefs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative h-64 md:h-80">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <div className="flex items-center gap-2 text-sm text-white/90">
                        <Calendar className="w-4 h-4" />
                        <span>{blogPosts[0].date}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-white/90 mb-6 line-clamp-2">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop"
                            alt={blogPosts[0].author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {blogPosts[0].author}
                          </p>
                          <p className="text-sm text-white/70">
                            {blogPosts[0].readTime}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${blogPosts[0].id}`}
                        className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.slice(1).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-neutral-400" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {post.author}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
                      >
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-600 transition-colors">
                  ←
                </button>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      num === 1
                        ? "bg-primary-500 text-white"
                        : "border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-600"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-600 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
                  >
                    <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-500">
                      {category.name}
                    </span>
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-sm text-neutral-600 dark:text-neutral-400">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popular Posts
              </h3>
              <div className="space-y-6">
                {popularPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        <span className="text-xs text-neutral-500">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Cooking",
                  "Health",
                  "Recipes",
                  "Tips",
                  "Chefs",
                  "Local",
                  "Community",
                  "Delivery",
                  "Nutrition",
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full text-sm hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-white/90 mb-6 text-sm">
                Subscribe to our newsletter for the latest blog posts and
                updates
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-white text-primary-600 font-semibold hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
