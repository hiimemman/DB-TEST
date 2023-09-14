import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { useEffect } from "react";
import TestPage from "./pages/TestPage";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </Router>
  )
}

export default App;
