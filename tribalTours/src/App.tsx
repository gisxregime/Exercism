import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideProfilePage } from './pages/GuideProfilePage';
import { ExplorePage } from './pages/ExplorePage';
import { AboutPage } from './pages/AboutPage';
import { BookingPage } from './pages/BookingPage';
import { RatingPage } from './pages/RatingPage';
import { TawoDashboard } from './pages/TawoDashboard';
import { GiyaDashboard } from './pages/GiyaDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MessagesPage } from './pages/MessagesPage';
import { ToursPage } from './pages/ToursPage';
import { TourDetailPage } from './pages/TourDetailPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tour/:id" element={<TourDetailPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/guide/:id" element={<GuideProfilePage />} />

              {/* Protected Routes */}
              <Route path="/tawo-dashboard" element={<TawoDashboard />} />
              <Route path="/giya-dashboard" element={<GiyaDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/rate/:bookingId" element={<RatingPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>);

}
export { App };