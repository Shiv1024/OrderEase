import React from 'react';
import NavbarAdmin from './Navbaradmin';

const feedbacks = [
  { id: 1, feedback: 'Great food!' },
  { id: 2, feedback: 'Excellent service!' },
  { id: 3, feedback: 'Will visit again!' },
  { id: 1, feedback: 'Great food!' },
  { id: 2, feedback: 'Excellent service!' },
  { id: 3, feedback: 'Will visit again!' },
  { id: 1, feedback: 'Great food!' },
  { id: 2, feedback: 'Excellent service!' },
  { id: 3, feedback: 'Will visit again!' },
  { id: 1, feedback: 'Great food!' },
  { id: 2, feedback: 'Excellent service!' },
  { id: 3, feedback: 'Will visit again!' },
  { id: 1, feedback: 'Great food!' },
  { id: 2, feedback: 'Excellent service!' },
  { id: 3, feedback: 'Will visit again!' }
];

const Reviews = () => {
  return (
    <div>
      <NavbarAdmin />
      <div className="w-screen min-h-screen bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Customer Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between"
              >
                <p className="text-gray-800 text-lg mb-4">{feedback.feedback}</p>
                <div className="text-right">
                  <span className="text-green-600 font-bold">Verified Customer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
