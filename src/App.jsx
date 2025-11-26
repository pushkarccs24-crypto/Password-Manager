import React from 'react'
import "./index.css"
import Login from './components/Login'
import SignUp from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
