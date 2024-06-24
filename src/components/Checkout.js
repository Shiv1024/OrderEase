import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const CheckoutPage = () => {
  const { cart } = useSelector((state) => state);
  const TAX_RATE = 0.1; // Example tax rate
  const DISCOUNT = 0.05; // Example discount rate for demonstration

  const calculateTotal = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.amount * item.food.price;
    });
    return subtotal;
  };

  const subtotal = calculateTotal();
  const tax = subtotal * TAX_RATE;
  const discount = subtotal * DISCOUNT;
  const total = subtotal + tax - discount;

  return (
    <div>
      <Navbar />
      <div className="w-screen min-h-screen bg-gray-100 mx-auto py-8">
        <div className="flex justify-center items-start">
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.food.id} className="flex justify-between items-center mb-2">
                  <p className="text-gray-800">{item.food.name} x {item.amount}</p>
                  <p className="text-gray-800">{item.amount * item.food.price} Rs</p>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800 font-semibold">Subtotal</p>
                <p className="text-gray-800 font-semibold">{subtotal.toFixed(2)} Rs</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800">Tax (10%)</p>
                <p className="text-gray-800">{tax.toFixed(2)} Rs</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800">Discount</p>
                <p className="text-gray-800">- {discount.toFixed(2)} Rs</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-gray-800">Total</p>
                <p className="text-xl font-semibold text-gray-800">{total.toFixed(2)} Rs</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
              <div className="mb-4">
                <select
                  id="paymentMethod"
                  className="w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="debitCard">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Discount Code</h3>
              <div className="flex">
                <input
                  type="text"
                  id="discountCode"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter discount code"
                />
                <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                Confirm and Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;