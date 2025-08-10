import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
</Route>
      </Routes>
    </Router>
  );
}
export default App;