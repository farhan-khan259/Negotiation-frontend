import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import DashboardScreen from './Components/dashboard-screen.jsx';
import ForgotPasswordScreen from './Components/forgetpassword-screen.jsx';
import LoginScreen from './Components/login-screen.jsx';
import NegotiationChatScreen from './Components/negotiation-chat-screen.jsx';
import NegotiationResultScreen from './Components/negotiation-result-screen.jsx';
import NegotiationSetupScreen from './Components/negotiation-setup-screen.jsx';
import RegisterScreen from './Components/register-screen.jsx';
import SettingsScreen from './Components/settings-screen.jsx';
import { authService } from './services/auth';

function App() {
  const [negotiationSetupData, setNegotiationSetupData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home', { replace: true });
  };

  const handleRegister = () => {
    // In a real app, you would set authentication state here
    setIsAuthenticated(true);
    navigate('/home', { replace: true });
  };

  const handleContinueToSetup = () => {
    navigate('/setup');
  };

  const handleStartNegotiation = (setupData) => {
    setNegotiationSetupData(setupData);
    navigate('/chat');
  };

  const handleEndNegotiation = () => {
    navigate('/result');
  };

  const handleStartNew = () => {
    setNegotiationSetupData(null);
    navigate('/home');
  };

  const handleBackToDashboard = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  const requiresSetupData = useMemo(() => {
    return ['/chat', '/result'].includes(location.pathname);
  }, [location.pathname]);

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (requiresSetupData && !negotiationSetupData) {
      return <Navigate to="/setup" replace />;
    }
    return children;
  };

  if (isLoading) {
    return <div className="app loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
        <Route
          path="/login"
          element={<LoginScreen onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<RegisterScreen onRegister={handleRegister} />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordScreen onResetPassword={handleLogin} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardScreen onContinue={handleContinueToSetup} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <NegotiationSetupScreen onStart={handleStartNegotiation} onBack={handleBackToDashboard} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <NegotiationChatScreen onEnd={handleEndNegotiation} setupData={negotiationSetupData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <NegotiationResultScreen onStartNew={handleStartNew} setupData={negotiationSetupData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsScreen onBack={handleBackToDashboard} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;