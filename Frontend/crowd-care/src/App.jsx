import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ReportIssues from "./Pages/ReportIssues";
import Analytics from "./Pages/Analytics";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ContactUS from "./Pages/ContactUS";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssues />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ContactUS" element={<ContactUS />} />
             <Route path="/login" element={<Login />} />
            {/* Optional: Add 404 route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
