import { useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = location.state?.product;

  
  const [selectedImage, setSelectedImage] = useState(
    product?.image_path || "/placeholder.jpg"
  );
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        Product not found
      </p>
    );

  const handleBuyNow = () => {
    toast.success("Proceeding to checkout!");
    navigate("/checkout", { state: { product: { ...product, quantity } } });

  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist", { position: "top-center" });
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist", { position: "top-center" });
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row gap-10 min-h-screen">
      {/* Center: Main Product Image */}
      <div className="relative w-full flex justify-center bg-gray-100 rounded-lg shadow-lg overflow-hidden p-6">
        <img
          src={selectedImage}
          alt={product.name || "Product Image"}
          className="w-full h-full max-w-md object-contain "
        />

        <button
          onClick={toggleWishlist}
          className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all absolute top-3 right-2 z-10"
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="text-red-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-gray-400 text-2xl hover:text-gray-600" />
          )}
        </button>
      </div>

      {/* Right Side: Product Details */}
      <div className="w-full p-6  bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
          <span className="text-yellow-500 text-lg">⭐⭐⭐⭐☆</span>
         <div>
         <span className="text-gray-500">(10 Reviews)</span>
         <span className="text-green-500 font-semibold ml-2">In Stock</span>
         </div>
        </div>

        {/* Price */}
        <div className="mt-4">
          <span className="text-4xl font-extrabold text-red-500">
            ${product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg mt-4">
          {product.description.length > 60
            ? `${product.description.substring(0, 700)}...`
            : product.description}
        </p>

        <div className="mt-4">
          <h4 className="text-lg font-semibold">Size:</h4>
          <div className="flex gap-2 mt-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className="border px-3 py-1 rounded-lg hover:bg-gray-200 transition"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector & Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex  items-center border rounded-lg px-0 sm:px-4 py-2">
            <button
              className="text-lg px-3"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="mx-3 text-lg">{quantity}</span>
            <button
              className="text-lg px-3"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex items-center text-nowrap justify-center  bg-red-500 text-white px-3 py-2 sm:px-8 sm:py-3 rounded-lg text-lg shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
