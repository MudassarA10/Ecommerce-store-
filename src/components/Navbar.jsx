import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import {
  FaHome,
  FaStore,
  FaInfoCircle,
  FaPhone,
  FaTimes,
} from "react-icons/fa";
import { Drawer, IconButton } from "@mui/material";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaStore /> },
    { name: "About", path: "/About", icon: <FaInfoCircle /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="xl:container xl:mx-auto px-4 py-2 sm:px-6 lg:px-8 flex justify-between h-[4.2rem] items-center">
        <div className="lg:hidden">
          <IconButton onClick={toggleDrawer}>
            <HiMiniBars3CenterLeft className="text-gray-600 text-2xl" />
          </IconButton>
        </div>

        <Link to="/" className="hidden lg:flex items-center gap-3">
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
          <div className="group inline-block">
            <h1 className="relative font-inter font-bold text-2xl text-gray-600 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Zaim Store
            </h1>
          </div>
        </Link>

        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="flex items-center space-x-1 group text-gray-600 hover:text-red-500 relative"
            >
              {link.icon}
              <span className="relative font-normal group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link to="/products">
            <FiSearch className=" text-gray-600 text-2xl hover:text-red-500" />
          </Link>

          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-gray-900"
          >
            <FaRegHeart className="text-2xl hover:text-red-500" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-gray-900"
          >
            <IoCartOutline className="text-3xl hover:text-red-500" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <div className="w-64 p-5 flex flex-col space-y-4">
          <IconButton onClick={toggleDrawer} className="self-end">
            <FaTimes className="text-gray-600 text-2xl" />
          </IconButton>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={toggleDrawer}
              className="text-gray-700 group relative hover:text-red-500 flex items-center space-x-2"
            >
              {link.icon}
              <span className="relative font-normal group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </Drawer>
    </nav>
  );
}
