import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({ onClose }) => {
  const navigate = useNavigate();
  const handleSubmit = ()=>
  {
    navigate("/menu");
  }

  const handleCancel = ()=>
  {
    navigate("/menu");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Enter your feedback"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleCancel}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
