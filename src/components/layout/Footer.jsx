import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChefHat,
  Heart,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  LocalChef<span className="text-primary-500">Bazaar</span>
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Homemade happiness delivered
                </p>
              </div>
            </Link>
            <p className="text-neutral-400 leading-relaxed">
              Connecting food lovers with passionate local chefs. Fresh,
              homemade meals cooked with love and delivered to your doorstep.
              Hungry? Browse your neighborhood chefs. Love to cook? Join our
              community of chefs and share your passion with the world. Let’s
              bring the neighborhood together, one plate at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: "Home", path: "/" },
                { label: "Browse Meals", path: "/meals" },
                { label: "Become a Chef", path: "/dashboard/createmeal" },
                { label: "How It Works", path: "/#how-it-works" },
                { label: "About Us", path: "/#about" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="text-neutral-400 hover:text-primary-500 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Working Hours</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-400 font-medium">Mon - Fri</p>
                  <p className="text-neutral-400 text-sm">9:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-400 font-medium">Saturday</p>
                  <p className="text-neutral-400 text-sm">
                    10:00 AM - 11:00 PM
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-400 font-medium">Sunday</p>
                  <p className="text-neutral-400 text-sm">11:00 AM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-neutral-400 font-medium">Address</p>
                  <p className="text-neutral-400 text-sm mt-1">
                    123 Food Street, Gourmet City, FC 12345
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-neutral-400 font-medium">Phone</p>
                  <p className="text-neutral-400 text-sm mt-1">
                    +1 (555) 123-4567
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-neutral-400 font-medium">Email</p>
                  <p className="text-neutral-400 text-sm mt-1">
                    hello@localchefbazaar.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info & Social Links Section */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                Stay Updated
              </h4>
              <p className="text-neutral-400 mb-6">
                Subscribe to our newsletter for the latest meals and chef
                updates.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label="Subscribe"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">
                Social Links
              </h4>
              <p className="text-neutral-400 mb-6">
                Follow us on social media for the latest updates and delicious
                food inspiration.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                  {
                    Icon: Instagram,
                    label: "Instagram",
                  },
                  { Icon: Linkedin, label: "LinkedIn" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-neutral-800 hover:bg-primary-500 flex items-center justify-center transition-all duration-300 group hover:-translate-y-1"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.Icon
                      className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-neutral-500">
              &copy; {new Date().getFullYear()} LocalChefBazaar. All rights
              reserved.
            </p>
            <p className="text-sm text-neutral-600 mt-2 flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" />{" "}
              for food lovers everywhere
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Service", path: "/terms" },
              { label: "Cookie Policy", path: "/cookies" },
              { label: "Contact", path: "/contact" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="text-neutral-400 hover:text-primary-500 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-center text-neutral-500 mb-6 text-sm font-medium">
            We Accept
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map(
              (method, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors group"
                >
                  <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
                    {method}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
