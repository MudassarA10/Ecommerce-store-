import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  const toggleWishlist = (event) => {
    event.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist", {position:"top-center"});
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist", {position:"top-center"} );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl relative w-[270px] md:w-[300px]"
   
    >
      {/* Wishlist Heart Icon */}
      <div
        className="absolute top-4 right-4 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
        onClick={toggleWishlist}
      >
        {isInWishlist(product.id) ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-400 text-xl hover:text-gray-600" />
        )}
      </div>

      {/* Image Container */}
      <div className="relative flex justify-center items-center w-full h-60 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={product.image_path || "/placeholder.jpg"}
          alt={product.name || "Product Image"}
          className="max-h-52 object-contain transition-transform duration-300 hover:scale-110"
          onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-red-500">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full  transition-transform duration-300 hover:scale-105"
          >
            <FaShoppingCart className="text-lg" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
