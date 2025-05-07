import { useLocation, Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const { orderDetails } = state || { orderDetails: null };


  if (!orderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You for Your Order!</h2>
        <p className="text-green-700">Your order has been successfully placed.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${orderDetails.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {orderDetails.billing.name}</p>
          <p><span className="font-medium">Email:</span> {orderDetails.billing.email}</p>
          <p><span className="font-medium">Address:</span> {orderDetails.billing.address}</p>
          <p><span className="font-medium">Phone:</span> {orderDetails.billing.phone}</p>
          <p><span className="font-medium">Payment Method:</span> {' '}
            {orderDetails.billing.paymentMethod === 'cod' ? 'Cash on Delivery' :
             orderDetails.billing.paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}