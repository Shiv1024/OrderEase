import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const AuthForm = () => {
  const [memberstate, setMemberState] = useState(false); 
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [role, setRole] = useState('customer'); // State to handle role selection
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberstate) {
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');
      console.log('Sign Up:', credentials);
      navigate("/menu");
    } else {
      setError('');
      console.log('Login:', credentials);
      navigate("/menu");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full space-y-6 transform transition-all duration-500 hover:scale-105">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-gray-800">{memberstate ? 'Sign Up' : 'Login'}</h2>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {memberstate && (
              <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="confirmPassword"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password" 
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            )}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="relative">
              <label htmlFor="role" className="block text-gray-700">
                Select your role:
              </label>
              <select
                id="role"
                name="role"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={handleRoleChange}
                required
              >
                <option value="customer">Customer</option>
                <option value="restaurantManager">Restaurant Manager</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {memberstate ? 'Sign Up' : 'Login'}
          </button>
          
          <div className="text-center">
            {!memberstate ? (
              <button
                type="button"
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => {
                  setMemberState(!memberstate);
                  setCredentials({
                    email: '',
                    password: '',
                    confirmPassword: '',
                  });
                }}
              >
                New to OrderEase? Sign Up
              </button>
            ) : (
              <button
                type="button"
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => {
                  setMemberState(!memberstate);
                  setCredentials({
                    email: '',
                    password: '',
                    confirmPassword: '',
                  });
                }}
              >
                Already have an account? Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
