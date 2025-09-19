import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";      // import Signup here
import Login from "./Pages/Login";
import ReportIssues from "./Pages/ReportIssues";
import Analytics from "./Pages/Analytics";
import ContactUS from "./Pages/ContactUS";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarFooterPaths = ["/login", "/signup"];
  const shouldShowNavAndFooter = !hideNavbarFooterPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavAndFooter && <Navbar />}
      <main className="min-h-screen flex flex-col justify-between">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportIssues />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ContactUS" element={<ContactUS />} />
          <Route path="/home" element={<Home />} />
          {/* Optional 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      {shouldShowNavAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
