import React, { useState } from 'react';

function Home() {
  const [hover, setHover] = useState(null);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: 'url(/image1.jpg)' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Title and description */}
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-300">PANTRYPAL</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-8 leading-relaxed opacity-90">
          A smart, easy way to manage your stock and get expiration reminders for all your pantry items
        </p>
      </div>

      {/* Buttons Container */}
      <div className="text-center px-5 py-5 bg-white bg-opacity-90 rounded-2xl shadow-2xl w-full max-w-xs z-10">
        <div className="flex flex-col gap-3">
          {/* Login Button */}
          <a
            href="/login"
            onMouseEnter={() => setHover('login')}
            onMouseLeave={() => setHover(null)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-base font-medium"
          >
            Login
          </a>
          {hover === 'login' && (
            <div className="text-sm text-gray-700 mt-1">Click here to log in to your account</div>
          )}

          {/* Register Button */}
          <a
            href="/register"
            onMouseEnter={() => setHover('register')}
            onMouseLeave={() => setHover(null)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-base font-medium"
          >
            Register
          </a>
          {hover === 'register' && (
            <div className="text-sm text-gray-700 mt-1">Create a new account and start managing your pantry</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
