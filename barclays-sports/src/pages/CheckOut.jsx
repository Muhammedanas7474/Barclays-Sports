import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { MdPayment, MdLocalShipping } from 'react-icons/md';

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Process payment and place order
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link 
            to="/cart" 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Steps */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-8">
                <div className={`flex items-center ${activeStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 1 ? 'bg-blue-100' : 'bg-gray-100'} mr-2`}>
                    <span className="font-medium">1</span>
                  </div>
                  <span>Shipping</span>
                </div>
                <div className="h-1 flex-1 mx-2 bg-gray-200">
                  <div className={`h-1 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex items-center ${activeStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 2 ? 'bg-blue-100' : 'bg-gray-100'} mr-2`}>
                    <span className="font-medium">2</span>
                  </div>
                  <span>Payment</span>
                </div>
                <div className="h-1 flex-1 mx-2 bg-gray-200">
                  <div className={`h-1 ${activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                </div>
                <div className={`flex items-center ${activeStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep >= 3 ? 'bg-blue-100' : 'bg-gray-100'} mr-2`}>
                    <span className="font-medium">3</span>
                  </div>
                  <span>Confirm</span>
                </div>
              </div>

              {activeStep === 1 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {activeStep === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <MdPayment className="text-blue-500 mr-2" />
                    Payment Method
                  </h2>
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <FaCreditCard className="text-gray-600 mr-2" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-6 mr-2" />
                          <span className="font-medium">PayPal</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Continue to Review
                  </button>
                </form>
              )}

              {activeStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <FaLock className="text-blue-500 mr-2" />
                    Review Your Order
                  </h2>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.zipCode}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <p className="text-gray-600 capitalize">
                      {formData.paymentMethod.replace('-', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <MdLocalShipping className="text-blue-500 mr-2" />
                Delivery Options
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="delivery"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <div className="ml-3">
                      <span className="font-medium">Standard Delivery</span>
                      <p className="text-sm text-gray-500">3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-medium">Free</span>
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="delivery"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="font-medium">Express Delivery</span>
                      <p className="text-sm text-gray-500">1-2 business days</p>
                    </div>
                  </div>
                  <span className="font-medium">$9.99</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;