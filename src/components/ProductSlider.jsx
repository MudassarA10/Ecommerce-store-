import React from "react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Slider from "react-slick";

//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ products, disabled = false }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [timeLeft, setTimeLeft] = useState(24 * 3600);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!", {
      position: "top-center",
    });
  };

  const toggleWishlist = (event, product) => {
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist", {
        position: "top-center",
      });
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist", {
        position: "top-center",
      });
    }
  };

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: (
      <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:scale-110 transition border border-gray-300">
        <FaChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
    ),
    nextArrow: (
      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:scale-110 transition border border-gray-300">
        <FaChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(24 * 3600);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="relative max-w-[76rem] mx-auto px-8 py-8 mt-6 mb-10">
      <div className="mb-10">
        <div className="mb-4 flex flex-row gap-4 items-center md:text-xl font-bold">
          <span className="bg-red-500 h-10 w-5 rounded"></span>
          <span className="text-red-500">Today’s</span>
        </div>
        <div className="flex items-start sm:items-center sm:flex-row flex-col gap-y-4 gap-x-20">
          <div className="group inline-block cursor-pointer">
            <h2 className="relative text-2xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Flash Sales
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((t, index, arr) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className="text-xs md:text-sm font-bold text-black">
                    {t.label}
                  </span>
                  <span className="text-3xl md:text-4xl font-bold text-black">
                    {t.value}
                  </span>
                </div>

                {index < arr.length - 1 && (
                  <span className="text-red-400 text-3xl md:text-4xl font-bold mx-2">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="flex-none px-2">
            <div className="bg-white rounded-2xl shadow-lg h-[60vh] overflow-hidden hover:shadow-xl relative">
              <div className="relative flex justify-center items-center w-full h-60 bg-gray-200 overflow-hidden">
                <img
                  src={product.image_path || "/placeholder.jpg"}
                  alt={product.name || "Product Image"}
                  className="max-h-52 object-contain transition-transform duration-300 hover:scale-110"
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {product.name.length > 20
                    ? `${product.name.substring(0, 20)}...`
                    : product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mt-2 transition-transform duration-300 hover:scale-105"
                  >
                    <FaShoppingCart className="text-lg" />
                    <span>Add</span>
                  </button>
                </div>

                <div
                  className="absolute top-4 right-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
                  onClick={(event) => toggleWishlist(event, product)}
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-gray-600" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="text-center mt-16">
        <Link
          to="/products"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`motion-safe:hover:animate-pulse text-sm md:text-base md:px-12 py-3 rounded px-6
                  ${
                    disabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] "
                  }`}
        >
          View All Products
        </Link>
      </div>
      <hr className="mx-40 border-gray-300 md:mt-16" />
    </div>
  );
};

export default ProductSlider;
