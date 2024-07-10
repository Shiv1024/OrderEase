import React, { useState } from 'react';
import NavbarAdmin from './Navbaradmin';

const sampleOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    tableNo: 5,
    items: [
      {
        id: 6,
        name: 'Butter Chicken',
        price: '250',
        image: 'https://imgs.search.brave.com/D4y8K4wTs8Wrv100-LYBG-aytGAHBUbxZF-w4yMR1Hs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NjkxMTkzNy9waG90/by9idXR0ZXItY2hp/Y2tlbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NF9mUlR5/eHdtNjR0YklxNWUz/eGxoUjlmZ1pIcFdt/TGRtNlZuam1SaUZo/VT0',
        description: 'Butter Chicken is a popular Indian dish made with tender chicken pieces cooked in a creamy tomato sauce.',
        nutrients: 'Calories: 490, Protein: 24g, Carbs: 16g, Fat: 35g'
      },
      {
        id: 7,
        name: 'Palak Paneer',
        price: '190',
        image: 'https://imgs.search.brave.com/SBO6y11hE03Rp7AsJO17QhXA9syDb2Lb4MlUswit88s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjcw/OTA2OTEzL3Bob3Rv/L3BhbGFrLXBhbmVl/ci1pbmRpYW4tZm9v/ZC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9M3pSSTg1WGJm/TFRWV3F2eWNuNWVr/cFBIUUdzYUlsMHU1/cXg0TDNFSE5nOD0',
        description: 'Palak Paneer is a vegetarian dish made with paneer cubes cooked in a pureed spinach sauce.',
        nutrients: 'Calories: 280, Protein: 14g, Carbs: 10g, Fat: 20g'
      }
    ],
    totalPrice: '440',
    status: 'Pending'
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    tableNo: 12,
    items: [
      {
        id: 13,
        name: 'Chili Garlic Noodles',
        price: '140',
        image: 'https://imgs.search.brave.com/OVfmEXKT1XyTkAui8p7zKmAwufPkkTuyHVxfle_yX4s/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jaG93bWVpbl85/NDU3ODctNjQ5Lmpw/Zz9zaXplPTYyNiZl/eHQ9anBn',
        description: 'Chili Garlic Noodles are spicy stir-fried noodles with garlic, chili, and a mix of vegetables.',
        nutrients: 'Calories: 350, Protein: 8g, Carbs: 50g, Fat: 12g'
      },
      {
        id: 14,
        name: 'Spring Rolls',
        price: '120',
        image: 'https://imgs.search.brave.com/NxuhyCaziGcb80Bvft9jy5HL0x5Q6_fidF7hP7PZCw0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/MjIzNTEyNi9waG90/by9ob21lbWFkZS1z/cHJpbmctcm9sbHMu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWFjblRtQVRUcmYy/cVplblhjR3hEVjV0/RUNmUXpVYV8tclBo/TS1ZYzFEeGM9',
        description: 'Spring Rolls are a popular Chinese appetizer made with thin pastry filled with vegetables and deep-fried until crispy.',
        nutrients: 'Calories: 200, Protein: 4g, Carbs: 25g, Fat: 10g'
      }
    ],
    totalPrice: '260',
    status: 'Preparing Order'
  }
];

const Admin = () => {
  const [orders, setOrders] = useState(sampleOrders);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map(order => (
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    );
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="w-screen min-h-screen bg-gray-100 mx-auto py-8">
        <div className="flex justify-center items-start">
          <div className="w-9/10 md:w-3/4 lg:w-3/5 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-6">Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base font-medium text-gray-700">Order ID</th>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base font-medium text-gray-700">Table No.</th>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base text-sm font-medium text-gray-700">Customer Name</th>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base font-medium text-gray-700">Items Ordered</th>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base font-medium text-gray-700">Total Price</th>
                    <th scope="col" className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">{order.id}</td>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">{order.tableNo}</td>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">{order.customerName}</td>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">
                        {order.items.map(item => (
                          <div key={item.id}>{item.name} x {item.quantity || 1}</div>
                        ))}
                      </td>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">{order.totalPrice} Rs</td>
                      <td className="text-xs px-3 py-1 text-left md:px-4 md:py-2 md:text-sm lg:px-4 lg:py-2 lg:text-base whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="text-sm md:text-base lg:text-base border rounded-lg p-2"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing Order">Preparing Order</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="flex justify-center items-center mt-6">
                  <p className="text-gray-600 text-sm md:text-base lg:text-base">No orders to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
