import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-white text-lg font-semibold">About Us</h2>
          <p className="text-gray-400">
            We are a platform dedicated to bringing you insightful blogs,
            creative content, and valuable resources to keep you inspired and
            informed.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-white text-lg font-semibold">Quick Links</h2>
          <a href="/home" className="hover:text-cyan-400">
            Home
          </a>
          <a href="/about" className="hover:text-cyan-400">
            About Us
          </a>
          <a href="/contact" className="hover:text-cyan-400">
            Contact Us
          </a>
          <a href="/privacy-policy" className="hover:text-cyan-400">
            Privacy Policy
          </a>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-white text-lg font-semibold">Contact Us</h2>
          <p>Email: support@blogplatform.com</p>
          <p>Phone: +91 8927709731</p>
          <p>Address: Basanchhora, Chattraganja, 721201</p>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-white text-lg font-semibold">Newsletter</h2>
          <p>
            Subscribe to our newsletter for the latest updates and articles.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-md bg-gray-800 border border-gray-700 focus:outline-none w-full"
            />
            <button className="bg-cyan-500 text-white p-3 rounded-r-md hover:bg-cyan-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 py-8 mt-10">
        <div className="container mx-auto flex justify-center space-x-10">
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-cyan-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-cyan-400"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-cyan-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-cyan-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-cyan-400"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-6 text-center mt-5">
        <p>
          &copy; {new Date().getFullYear()} Blog Platform. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
