/*import Homestock from "./components/homestock";


function App() {
  return (
    <div>
      <Homestock/>
    </div>
  );
}

export default App;
*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ExpirationReminder from "./Pages/ExpirationReminder";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard"; // Assuming you have a Dashboard page
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expiration-reminder" element={<ExpirationReminder />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/contactus" element={<ContactUs />} />


      </Routes>
    </Router>
  );
}

export default App;
