import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // New state for showing status messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8089/api/v1/auth/login", { username, password });

      // If login is successful, display success message
      setMessage({ text: "✅ Login Successful!", type: "success" });

      // Store token if backend sends one (future improvement)
      console.log(response.data);
    } catch (error) {
      // Display error message from backend or general error
      setMessage({
        text: error.response?.data?.error || "❌ Login Failed. Please check your credentials.",
        type: "error",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/image2.jpg')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-8 bg-white rounded-2xl shadow-lg max-w-sm w-full opacity-90">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {message && (
          <p
            className={`mb-4 p-2 rounded ${message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
