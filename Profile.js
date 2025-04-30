import { useState, useEffect } from "react";
import { FiUser, FiSave } from "react-icons/fi"; // Add profile and save icons

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Simulating a fetch API call or local storage data retrieval
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user-profile");
        const data = await response.json();
        setUserData(data);

        // Set state for form fields with fetched data
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
      } catch (error) {
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    // Normally here you'd send the updated data back to the backend via an API call
    setError("");
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FiUser /> Update Profile
        </h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {userData ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded-lg flex justify-center items-center gap-2">
              <FiSave /> Save Changes
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
/* client */