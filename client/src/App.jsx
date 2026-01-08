import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import FloatingActions from "./components/FloatingActions";
import AIAssistant from "./components/AIAssistant";
import UserProfile from "./pages/UserProfile";
import AppointmentHistory from "./pages/AppointmentHistory";
import UserRoute from "./components/UserRoute";
import "./styles/layout.css";
import Payment from "./pages/Payment";
import { warmUpServer, isProduction } from "./api";

/* EXISTING PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import CentralLab from "./pages/CentralLab_TEMP";
import HealthInsurance from "./pages/HealthInsurance";
import CorporateHealth from "./pages/CorporateHealth";
import Careers from "./pages/Careers";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import Login from "./pages/Login";

/* 🔥 ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";   // ✅ NEW
import AdminRoute from "./components/AdminRoute";

function App() {
  const location = useLocation();

  // ❌ Hide Navbar & Floating buttons for admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Check if user is logged in for AI Assistant
  const user = JSON.parse(localStorage.getItem("user"));
  const showAIAssistant = user && !isAdminRoute;

  // 🚀 Warm up Render backend to prevent cold starts
  useEffect(() => {
    const warmUpBackend = async () => {
      if (isProduction()) {
        try {
          console.log('🌡️ Warming up backend server...');
          await warmUpServer();
          console.log('✅ Backend is ready');
        } catch (error) {
          console.log('⚠️ Backend warm-up completed (may still be starting)');
        }
      }
    };

    // Warm up immediately and then every 10 minutes in production
    warmUpBackend();

    if (isProduction()) {
      const interval = setInterval(warmUpBackend, 10 * 60 * 1000); // 10 minutes
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      {/* ✅ Navbar only for non-admin pages */}
      {!isAdminRoute && <Navbar />}

      {/* Routes */}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/central-lab" element={<CentralLab />} />
        <Route path="/health-insurance" element={<HealthInsurance />} />
        <Route path="/corporate-health" element={<CorporateHealth />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />

        {/* 🔐 USER PROTECTED ROUTES */}
        <Route
          path="/profile"
          element={
            <UserRoute>
              <UserProfile />
            </UserRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <UserRoute>
              <AppointmentHistory />
            </UserRoute>
          }
        />

        {/* 🔐 ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ✅ ADMIN PROFILE ROUTE */}
        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
      </Routes>

      {/* ✅ Floating buttons only for non-admin pages */}
      {!isAdminRoute && <FloatingActions />}

      {/* 🤖 AI Assistant for authenticated users */}
      {showAIAssistant && <AIAssistant />}
    </>
  );
}

export default App;
