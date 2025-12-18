import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">
                LocalChef<span className="text-primary">Bazaar</span>
              </span>
            </div>
            <p className="mb-4">
              Connecting food lovers with talented local chefs. Fresh homemade
              meals delivered to your door.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="btn btn-ghost btn-circle">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="btn btn-ghost btn-circle">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/meals" className="link link-hover">
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="link link-hover">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/chef/create-meal" className="link link-hover">
                  Become a Chef
                </Link>
              </li>
              <li>
                <Link to="/admin/manage-users" className="link link-hover">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-title text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1" />
                <span>123 Food Street, Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="h-5 w-5 text-primary" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-primary" />
                <span>support@localchefbazaar.com</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="footer-title text-lg font-semibold">
              Working Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaClock className="h-4 w-4 text-primary" />
                <span>Monday - Friday: 9:00 AM - 10:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaClock className="h-4 w-4 text-primary" />
                <span>Saturday: 10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaClock className="h-4 w-4 text-primary" />
                <span>Sunday: 11:00 AM - 9:00 PM</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="join">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered join-item"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p>
                &copy; {new Date().getFullYear()} LocalChefBazaar. All rights
                reserved.
              </p>
              <p className="text-sm mt-1">
                Made with ❤️ for food lovers everywhere
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="link link-hover text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="link link-hover text-sm">
                Terms of Service
              </Link>
              <Link to="/faq" className="link link-hover text-sm">
                FAQ
              </Link>
              <Link to="/contact" className="link link-hover text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-base-300">
          <p className="text-center text-sm mb-3">We Accept</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                alt="Visa"
                className="h-6"
              />
            </div>
            <div className="bg-white p-2 rounded-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                alt="Mastercard"
                className="h-6"
              />
            </div>
            <div className="bg-white p-2 rounded-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
                alt="PayPal"
                className="h-6"
              />
            </div>
            <div className="bg-white p-2 rounded-lg">
              <img
                src="https://stripe.com/img/v3/home/twitter.png"
                alt="Stripe"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
