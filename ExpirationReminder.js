import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

function ExpirationReminder() {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { name: 'Milk', expirationDate: '2025-04-05' },
    { name: 'Eggs', expirationDate: '2025-04-01' },
    { name: 'Bread', expirationDate: '2025-04-07' },
  ]);

  // Logic to check expiration status
  const getExpirationStatus = (date) => {
    const expirationDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = expirationDate - currentDate;
    const daysRemaining = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysRemaining <= 3) return 'Expiring soon!';
    if (daysRemaining <= 7) return 'Expires in less than a week.';
    return 'Fresh';
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-6 relative"
      style={{
        backgroundImage: 'url(/image3.jpg)', // Change to your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* 🟢 Navigation Buttons - Top Right */}
      <div className="absolute top-5 right-5 flex space-x-3 z-20">
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Home
        </button>
        <button 
          onClick={() => navigate('/login')} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Expiration Reminder Box */}
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-90 p-5 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-3 text-center text-gray-800">Expiration Reminders</h1>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-lg text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500">{item.expirationDate}</p>
              </div>
              <div
                className={`text-sm font-semibold ${
                  getExpirationStatus(item.expirationDate) === 'Expiring soon!' 
                    ? 'text-red-600' 
                    : getExpirationStatus(item.expirationDate) === 'Expires in less than a week.' 
                    ? 'text-yellow-600' 
                    : 'text-green-600'
                }`}
              >
                {getExpirationStatus(item.expirationDate)}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Button Section - OK and Download the Report */}
        <div className="flex justify-between items-center mt-4">
          {/* OK Button */}
          <button 
            onClick={() => navigate('/dashboard')}  // Navigate to Dashboard
            className="bg-blue-400 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-500 transition"
          >
            OK
          </button>

          {/* Download the Report Button */}
          <button 
            onClick={() => alert('Downloading Report...')} 
            className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Download the Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpirationReminder;
