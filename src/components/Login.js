import { useState } from 'react';
import '../index.css';
const AuthForm = () => {
  const [memberstate, setMemberState] = useState(false); // false for login, true for sign-up
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberstate) {
      // Sign-up logic
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');
      console.log('Sign Up:', credentials);
    } else {
      // Login logic
      setError('');
      console.log('Login:', credentials);
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
            <input
              type="password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            {memberstate && (
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
                    email: "",
                    password: "",
                    confirmPassword: ""
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
                    email: "",
                    password: "",
                    confirmPassword: ""
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
