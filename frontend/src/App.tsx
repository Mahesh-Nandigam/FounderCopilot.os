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
            <Route index element={<GTMCrossPosterWorkspace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
