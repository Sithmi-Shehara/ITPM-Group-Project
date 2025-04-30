import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    // Check if all fields are filled
    if (!username) formErrors.username = 'Username is required';
    if (!password) formErrors.password = 'Password is required';
    if (!mobile) formErrors.mobile = 'Mobile number is required';

    // Validate mobile number format (simple validation for now, can be improved)
    const mobileRegex = /^[0-9]{10}$/;
    if (mobile && !mobileRegex.test(mobile)) {
      formErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      // If there are errors, stop the form submission
      return;
    }

    try {
      // Send the username, password, and mobile to the backend
      const response = await axios.post("http://localhost:8089/Register", { username, password, mobile });
      alert("Registration Successful!");
      console.log(response.data);
    } catch (error) {
      alert("Registration Failed!");
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/image2.jpg')" }} // Change this to your image path
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Register Form */}
      <div className="relative p-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl max-w-sm w-full z-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:scale-105 transition-transform duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
