import React from "react";

function TopBar() {
  return (
    <header className="shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800 pl-5">
        Home Stock Tracker
      </h1>
      <div>
        {/* Add user profile, notifications, etc. here */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopBar;
