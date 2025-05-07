import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import {
  FaCreditCard,
  FaMoneyBill,
  FaPaypal,
  FaTruck,
  FaLock,
} from "react-icons/fa";
import { TextField } from "@mui/material";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getCartTotal, clearCart } = useCart();

  const product = location.state?.product;
  const cartItems = product ? [product] : cart;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  // Pricing Calculation
  const shippingRate = 10;
  const deliveryFee = 5;
  const subtotal = product
  ? product.price * (product.quantity || 1)
  : getCartTotal();

const discount = subtotal > 100 ? subtotal * 0.1 : 0;
const total = subtotal + shippingRate + deliveryFee - discount;


  // Handle Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Checkout Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Order placed successfully!");
    clearCart();
    navigate("/order-confirmation", {
      state: {
        orderDetails: {
          items: cartItems,
          total: total,
          billing: formData,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="group inline-block cursor-pointer">
            <h2 className="relative text-2xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
            Checkout 
            </h2>
          </div>
          <p className="mt-2 text-gray-600">
            Complete your order by providing your details below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                label="Full Name"
                name="name"
                required
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                required
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Shipping Address"
                name="address"
                required
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                required
                fullWidth
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label
                    className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaMoneyBill className="text-2xl mb-2 text-blue-600" />
                    <span className="text-sm font-medium">
                      Cash on Delivery
                    </span>
                  </label>
                  <label
                    className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaCreditCard className="text-2xl mb-2 text-blue-600" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </label>
                  <label
                    className={`relative flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaPaypal className="text-2xl mb-2 text-blue-600" />
                    <span className="text-sm font-medium">PayPal</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 font-semibold text-lg"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          {/* Order Summary */}
          <div className="lg:sticky lg:top-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image_path || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${(Number(subtotal) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaTruck className="text-red-600" /> Shipping
                  </span>
                  <span>${shippingRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
