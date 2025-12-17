import React from "react";
import "./index.css";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddPassword from "./components/AddPassword";
import EditPassword from "./components/EditPassword";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-password" element={<AddPassword />} />
        <Route path="/edit-password" element={<EditPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
