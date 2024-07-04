import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import {removeFromCart, increment, decrement} from "../store/CartSlice";

const CartPage = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, houseNumber: '123', area: 'Sector 15', city: 'Panchkula' },
    { id: 2, houseNumber: '456', area: 'Sector 13', city: 'Bhiwani' },
    { id: 3, houseNumber: '789', area: 'Defense Colony', city: 'Hisar' },
  ]);

  const [selectedOption, setSelectedOption] = useState('Home Delivery');
  const {cart} = useSelector((state)=>state);
  const dispatch = useDispatch();

  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [newAddress, setNewAddress] = useState({ houseNumber: '', area: '', city: '' });

  const[table, setTable] = useState("Select Table Number")

  const totalPrice = () => {
    let sm = 0;
    cart.forEach((temp) => {
      sm += (temp.amount)*(temp.food.price);
    });
    return sm;
  };

  function handleIncrement(temp) {
    dispatch(increment(temp));
  }

  function handleDecrement(temp, amt) {
    if(amt === 1) dispatch(removeFromCart(temp));
    else dispatch(decrement(temp));
  }

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleAddAddress = () => {
    if (newAddress.houseNumber && newAddress.area && newAddress.city) {
      const newId = addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1;
      setAddresses([...addresses, { id: newId, ...newAddress }]);
      setNewAddress({ houseNumber: '', area: '', city: '' });
      setShowAddAddressPopup(false); 
    }
  };

  function handleTableChange(event){
    let temp1 = event.target.value;
    setTable(temp1);
  }

  return (
    <div>
      <Navbar />
      <div className="w-screen min-h-screen bg-slat mx-auto py-8">
        <div className="flex justify-between items-start w-full">
          <div className="w-1/2 ml-10">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Details</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                  <img src="" alt="Profile" className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">Mitvik Sihag</p>
                  <p className="text-gray-600">random@gmail.com</p>
                  <p className="text-gray-600">+91 1234567890</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex space-x-4 mb-4">
                <button 
                  className={`px-4 py-2 rounded-lg font-semibold ${selectedOption === 'Home Delivery' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedOption('Home Delivery')}
                >
                  Home Delivery
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-semibold ${selectedOption === 'Pick-up' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedOption('Pick-up')}
                >
                  Pick-up
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-semibold ${selectedOption === 'Dine-in' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedOption('Dine-in')}
                >
                  Dine-in
                </button>
              </div>

              {selectedOption === 'Home Delivery' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
                  {addresses.map((addr) => (
                    <div key={addr.id} className="flex items-center justify-between mb-4">
                      <p className="text-gray-800">{addr.houseNumber}, {addr.area}, {addr.city}</p>
                      <div className="flex space-x-2">
                        <button
                          className="bg-white text-red-700 px-3 py-1 rounded-lg border border-red-700 font-semibold hover:bg-red-700 hover:text-white transition duration-300"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          Delete
                        </button>
                        <button className="bg-white text-green-700 px-3 py-1 rounded-lg border border-green-700 font-semibold hover:bg-green-700 hover:text-white transition duration-300">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddAddressPopup(true)}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
                  >
                    Add Address
                  </button>

                  {showAddAddressPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Address</h2>

                        <div className="mb-4">
                          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">House Number</label>
                          <input
                            type="text"
                            id="houseNumber"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                            value={newAddress.houseNumber}
                            onChange={(e) => setNewAddress({ ...newAddress, houseNumber: e.target.value })}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                          <input
                            type="text"
                            id="area"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                            value={newAddress.area}
                            onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            id="city"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={handleAddAddress}
                            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-300"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => setShowAddAddressPopup(false)}
                            className="ml-2 bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedOption === 'Pick-up' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Pick-up</h2>
                  {/* Add pick-up options here */}
                  <p className="text-gray-800">Select your pick-up location or time slot here.</p>
                </div>
              )}

              {selectedOption === 'Dine-in' && (
                <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dine-in</h2>
                {/* Dine-in option: Add table number dropdown */}
                <div className="mb-4">
                  <select
                    id="tableNumber"
                    className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
                    onChange={handleTableChange}
                    value={table}
                  >
                    <option key='0' value='0'>Select Table Number</option>
                     {Array.from({ length: 15 }, (_, i) => (
                      <option key={i+1} value={i+1}>Table {i+1}</option>
                    ))} 
                  </select>
                </div>
              </div>
              )}
            </div>
          </div>

          {cart.length ? (
            <div className="w-1/3 mr-10">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                        <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                        <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                      </tr>
                    </thead>
                    {cart.map((temp) => (
                      <tbody key={temp.food.id} className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">{temp.food.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap flex">
                            <div className="bg-gray-200 border-2 text-orange-700 rounded-lg border-orange-700">
                              <button className="text-lg focus:outline-none bg-white-700 hover:bg-gray-300 px-2 rounded-lg font-bold" onClick={() => handleDecrement(temp.food, temp.amount)}>-</button>
                              {temp.amount}
                              <button className="text-lg focus:outline-none bg-white-700 hover:bg-gray-300 px-2 rounded-lg font-bold" onClick={() => handleIncrement(temp.food)}>+</button>
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">{(temp.amount) * (temp.food.price)}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <label htmlFor="total" className="ml-4 block text-sm font-medium text-gray-700">Total:</label>
                    <p id="total" className="ml-4 text-xl font-semibold text-gray-800">{totalPrice()} Rs</p>
                  </div>
                  <Link to="/checkout" className="mr-4 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">Checkout</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-1/3 flex justify-center items-center mr-12">
              <div className="w-full flex flex-col justify-center items-center h-40vh bg-white rounded-lg shadow-md p-6">
                <img
                  src="/carts.png"
                  alt="Empty Cart"
                  className="w-24 h-24 mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/menu">
                  <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-300">
                    Start Ordering
                  </button>
                </Link>
              </div> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
