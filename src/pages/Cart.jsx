import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const shippingRate = 10;
  const discount = getCartTotal() > 100 ? getCartTotal() * 0.1 : 0;
  const deliveryFee = 5;

  const handleRemoveItem = (id, title) => {
    removeFromCart(id);
    toast.error(`removed from cart`, { position: "top-center" });
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", { position: "top-center" });
    setTimeout(() => {
      navigate("/checkout");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/products"
          className="bg-red-600 text-white hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] motion-safe:hover:animate-pulse text-sm md:text-base md:px-12 py-3 rounded px-6"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cart Header (Styled like Wishlist) */}
      <div className="">
        <div className="mb-6 flex flex-row gap-4 items-center text-lg sm:text-xl font-bold">
          <span className="bg-red-500 h-8 w-4 sm:h-10 sm:w-5 rounded"></span>
          <span className="text-red-500">My Cart</span>
        </div>

        <div className="group inline-block cursor-pointer mb-10">
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
            Explore Your Cart
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col sm:flex-row items-center gap-6 border border-gray-200"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 p-2 bg-gray-200 rounded-lg">
                <img
                  src={item.image_path || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  ${item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex border w-28 rounded-lg  items-center justify-center sm:justify-start gap-4 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1.5"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1.5"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove Button */}
              <div className="text-right space-y-2">
                <p className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id, item.title)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-2 font-medium transition"
                >
                  <FaTrash className="text-lg" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shippingRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      getCartTotal() +
                      shippingRate +
                      deliveryFee -
                      discount
                    ).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Including VAT and all applicable taxes
                </p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white text-center py-4 rounded-md hover:bg-red-500 transition-colors mt-6 font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
