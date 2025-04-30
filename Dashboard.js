import { Link } from "react-router-dom";
import { FiHome, FiBell, FiPhone, FiUser } from "react-icons/fi";
import Card from "../components/ui/card"; 
import { useState } from "react";

function Dashboard() {
  const [inventory, setInventory] = useState("Inventory");
  const [shoppingList, setShoppingList] = useState("Shopping List");
  const [expiryAlerts, setExpiryAlerts] = useState("Expiry Alerts");

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-300 p-6 flex flex-col justify-between">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-orange-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">PantryPal Dashboard</h1>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-200">
            <FiHome /> Home
          </Link>
          <Link to="/expiration-reminder" className="flex items-center gap-2 hover:text-gray-200">
            <FiBell /> Notifications
          </Link>
          <Link to="/contacts" className="flex items-center gap-2 hover:text-gray-200">
            <FiPhone /> Contact Us
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-gray-200">
            <FiUser /> Profile
          </Link>

        </div>
      </nav>

      {/* Middle Content */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <Link to="/inventory" className="block">
          <Card>
            <div className="flex flex-col items-center">
              <img 
                src="inventoryimage.jpeg" 
                alt="Inventory" 
                className="mb-4 rounded-lg w-64 h-40 object-cover"
              />
              <input
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none w-full text-center text-gray-800"
              />
              <p className="text-center mt-2 text-gray-700 italic">
                Effortlessly monitor your pantry items and stay organized.
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/shopping-list" className="block">
          <Card>
            <div className="flex flex-col items-center">
              <img 
                src="shoppinglist1.jpg" 
                alt="Shopping List" 
                className="mb-4 rounded-lg w-64 h-40 object-cover"
              />
              <input
                value={shoppingList}
                onChange={(e) => setShoppingList(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none w-full text-center text-gray-800"
              />
              <p className="text-center mt-2 text-gray-700 italic">
                Plan, organize, and simplify your grocery shopping.
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/expiration-reminder" className="block relative">
          <Card>
            <div className="flex flex-col items-center relative">
              <img 
                src="expirationimage.jpg" 
                alt="Expiry Alerts" 
                className="mb-4 rounded-lg w-64 h-40 object-cover"
              />
              <input
                value={expiryAlerts}
                onChange={(e) => setExpiryAlerts(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none w-full text-center text-gray-800"
              />
              <p className="text-center mt-2 text-gray-700 italic mb-6">
                Stay updated with timely alerts before items expire.
              </p>
              {/* See More.. link positioned to bottom-right */}
              <Link 
                to="/expiration-reminder"
                className="absolute bottom-2 right-3 text-sm text-orange-600 italic hover:text-orange-800"
              >
                See more..
              </Link>
            </div>
          </Card>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center p-4 mt-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold">PantryPal - Your Ultimate Pantry Management Solution</p>
        <p className="text-sm mt-1 italic">Easily manage your home stock, track expiry dates, and plan your shopping list - All in one place!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
