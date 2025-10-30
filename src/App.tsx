import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/dashboard';
import SettingsPage from './pages/settings';
import TeamsRegisteredPage from './pages/teams/teamsRegistered';
import AuthRoute from './AuthRoute';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import GroupsInfoPage from './pages/groups';
import MatchesPage from './pages/matches';

function App() {
  return (
    <div className="overflow-y-hidden">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/teams"
            element={
              <ProtectedRoute>
                <TeamsRegisteredPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupsInfoPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/matches"
            element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
