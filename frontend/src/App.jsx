import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import StaffLogin from './pages/StaffLogin';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmitComplaint from './pages/SubmitComplaint';
import MyComplaints from './pages/MyComplaints';
import ManageComplaints from './pages/ManageComplaints';
import Analytics from './pages/Analytics';
import CampusMap from './pages/CampusMap';
import AdminMap from './pages/AdminMap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import './styles/variables.css';


const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={['student', 'staff', 'admin']}>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-complaint"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <SubmitComplaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-complaints"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <MyComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-complaints"
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <ManageComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campus-map"
            element={
              <ProtectedRoute allowedRoles={['student', 'staff', 'admin']}>
                <CampusMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/map"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminMap />
              </ProtectedRoute>
            }
          />
          {/* Catch all or 404 can go here */}
        </Routes>
        <ChatWidget />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
