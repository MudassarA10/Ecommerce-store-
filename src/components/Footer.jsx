import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Data Arrays for Links
  const accountLinks = [
    { name: "Cart", path: "/cart" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Shop", path: "/products" },
  ];

  const quickLinks = [
    { name: "Our Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
  ];

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black  text-white">
      <div className="xl:container xl:mx-auto px-6 lg:px-10 space-y-12 pt-10 pb-6 ">
      <div className="flex justify-between flex-wrap gap-10">
        {/* Left Section */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="19" cy="19" r="19" fill="#DB4444" />
              <path
                d="M19 29C14.03 29 10 26.418 10 22V21.912C10 19.794 11.338 18.1 13.375 17C15.324 15.948 16.476 14.01 16.188 12L15.625 9L17.711 9.795C21.468 11.225 24.597 13.707 26.625 16.861C27.5167 18.2311 27.9941 19.8293 28 21.464V22C28 23.562 27.496 24.895 26.625 25.965"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 29C17.343 29 16 27.567 16 25.8C16 24.4 17.016 23.279 17.91 22.252L19 21L20.09 22.252C20.984 23.28 22 24.4 22 25.8C22 27.567 20.657 29 19 29Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div>
              <h1 className="font-inter font-bold text-2xl">Zaim Store</h1>
              <div className="w-32 h-1 bg-[#ef2e2e]"></div>
            </div>
          </Link>

          <p className="text-gray-300 text-[0.93rem]   max-w-[29rem] sm:w-80">
            Zaim Store offers a seamless shopping experience with
            top-quality products at great prices. Enjoy fast shipping, secure
            payments, and excellent customer service!
          </p>
        </div>

        {/* Middle Section - Account Links */}
        <div>
          <h3 className="text-lg font-bold">ACCOUNT</h3>
          <div className="w-[5.4rem] h-1 bg-[#ef2e2e] mb-3"></div>
          <ul className="text-gray-300 space-y-2">
            {accountLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                <FiChevronRight className="text-red-500 mr-2" />
                <Link to={link.path} className="hover:text-red-500">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Quick Links */}
        <div>
          <h3 className="text-lg font-bold">QUICK LINKS</h3>
          <div className="w-28 h-1 bg-[#ef2e2e] mb-3"></div>
          <ul className="text-gray-300 space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                <FiChevronRight className="text-red-500 mr-2" />
                <Link to={link.path} className="hover:text-red-500">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 pt-6">
        <p className="text-center text-sm text-white">
          © {new Date().getFullYear()} Copyright. All rights reserved.
        </p>
      </div>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6  bg-gray-300 text-red-500 hover:text-white p-4 rounded-full shadow-lg hover:bg-red-500 transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}
      </div>
    </footer>
  );
};

export default Footer;
