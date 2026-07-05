import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { HirepanelWorkspace } from './pages/HirepanelWorkspace';
import { LegalAdvisorWorkspace } from './pages/LegalAdvisorWorkspace';
import GTMCrossPosterWorkspace from './pages/GTMCrossPosterWorkspace';
import { PlaceholderPage } from './pages/PlaceholderPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="os-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="hirepanel" element={null} />
            <Route path="legal" element={null} />
            <Route path="gtm" element={<GTMCrossPosterWorkspace />} />
            <Route path="settings" element={<PlaceholderPage title="OS Settings" desc="System preferences and account settings are coming soon." />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
