import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // removeFromWishlist(product.id);
    toast.success("Added to cart!", { position: "top-center" });
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist", { position: "top-center" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow  max-w-7xl  px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:px-14">
          <div className="mb-8 flex flex-row gap-4 items-center md:text-xl  font-bold">
            <span className="bg-red-500 h-10 w-5 rounded"></span>
            <span className="text-red-500">My Wishlist</span>
          </div>

          <div className="group inline-block cursor-pointer mb-14">
            <h2 className="relative text-2xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Explore Your Wishlist
            </h2>
          </div>
        </div>
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              Your wishlist is empty
            </h2>
            <Link
              to="/products"
              className="bg-red-600 text-white hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] motion-safe:hover:animate-pulse text-sm md:text-base md:px-12 py-3 rounded px-6"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl relative w-[270px] md:w-[300px]"
                >
                  {/* Delete Icon */}
                  <div
                    className="absolute top-4 left-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <FaTrash className="text-red-500 text-xl hover:text-red-700" />
                  </div>

                  {/* Wishlist Heart Icon */}
                  <div
                    className="absolute top-4 right-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <FaHeart className="text-red-500 text-xl" />
                  </div>

                  {/* Image Container */}
                  <div className="relative flex justify-center items-center w-full h-60 md:h-64 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image_path || "/placeholder.jpg"}
                      alt={product.name || "Product Image"}
                      className="max-h-52 object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {product.name.length > 20
                        ? `${product.name.substring(0, 20)}...`
                        : product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description.length > 60
                        ? `${product.description.substring(0, 60)}...`
                        : product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-red-500">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105"
                      >
                        <FaShoppingCart className="text-lg" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
