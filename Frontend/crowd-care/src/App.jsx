import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ReportIssues from "./Pages/ReportIssues";
import About from "./Pages/About";
import Home from "./Pages/Home";
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
            <Route path="/about" element={<About />} />
            <Route path="/ContactUS" element={<ContactUS />} />
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
