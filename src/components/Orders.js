import React from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { repeatOrder } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { history } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(history);

  const handleReorder = (order) => {

    // console.log(history);

    // console.log(order);

    dispatch(repeatOrder(order));
    navigate("/cart");

  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800 my-4">Order History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history && history.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">{order.currDate.toLocaleDateString()}</p>
                <p className='px-2 py-1 rounded-lg bg-green-200 text-green-800'>
                  Delivered
                </p>
              </div>
              <div className="space-y-2">
                {order && order.cartItems.map(item => (
                  <div key={item.food.id} className="flex items-center space-x-4">
                    <img src={item.food.image} alt={item.food.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.food.name}</h2>
                      <p className="text-gray-600">Price: {item.food.price} Rs</p>
                      <p className="text-gray-600">Quantity: {item.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4">
                {/* <p className="text-lg font-semibold text-gray-800">Total: {order.total} Rs</p> */}
                <p className="text-lg font-semibold text-gray-800">Total: {order.totalPrice} Rs</p>
                <button onClick={() => handleReorder(order.cartItems)} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
