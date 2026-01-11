import { motion } from "framer-motion";
import {
  ChefHat,
  Users,
  Target,
  Award,
  Heart,
  Clock,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      bio: "Passionate about food and community building",
    },
    {
      name: "Maria Garcia",
      role: "Head Chef Coordinator",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop",
      bio: "Former restaurant owner turned platform evangelist",
    },
    {
      name: "David Chen",
      role: "Product Director",
      image:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&auto=format&fit=crop",
      bio: "Tech enthusiast with a love for culinary arts",
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
      bio: "Connecting chefs and food lovers across cities",
    },
  ];

  const milestones = [
    { year: "2023", event: "Founded LocalChefBazaar" },
    { year: "2024 Q1", event: "Reached 1000+ meals delivered" },
    { year: "2024 Q2", event: "Expanded to 50+ chefs" },
    { year: "2024 Q3", event: "Launched mobile app" },
    { year: "2024 Q4", event: "500+ happy customers served" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              About{" "}
              <span className="text-primary-600 dark:text-primary-500">
                LocalChefBazaar
              </span>
            </motion.h1>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              We're on a mission to connect food lovers with passionate local
              chefs, bringing homemade happiness to every doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                <p>
                  Founded in 2023, LocalChefBazaar began with a simple idea:
                  everyone deserves access to delicious, homemade meals without
                  the hassle of cooking.
                </p>
                <p>
                  We noticed talented home chefs in our community with amazing
                  culinary skills but no platform to share their creations. At
                  the same time, busy professionals, students, and families were
                  craving authentic home-cooked food.
                </p>
                <p>
                  Today, we've built a thriving community that supports local
                  chefs while bringing joy to thousands of customers through
                  every meal we deliver.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop"
                  alt="Our team"
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90">
                To empower local chefs by providing a platform to share their
                culinary talents, while making authentic homemade meals
                accessible to everyone in the community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-8 text-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90">
                To become the leading platform connecting food lovers with local
                chefs globally, fostering community through shared culinary
                experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: "Community First",
                desc: "We believe in building a supportive community where chefs and food lovers thrive together.",
                color: "red",
              },
              {
                icon: Target,
                title: "Quality & Freshness",
                desc: "Every meal is cooked fresh to order using the finest ingredients available.",
                color: "green",
              },
              {
                icon: Users,
                title: "Empowering Chefs",
                desc: "We provide a platform for home chefs to turn their passion into a sustainable business.",
                color: "blue",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-neutral-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-center">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Key milestones in our story
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-200 dark:bg-primary-800 hidden md:block"></div>

            <div className="grid md:grid-cols-5 gap-6">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      {milestone.year}
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {milestone.event}
                    </p>
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 border-4 border-white dark:border-neutral-800 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The passionate people behind LocalChefBazaar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold mb-1 text-neutral-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-500 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a food lover or a passionate chef, there's a place
              for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-white text-primary-600 font-semibold hover:bg-white/90 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
