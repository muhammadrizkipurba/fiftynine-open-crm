import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/dashboard';
import SettingsPage from './pages/settings';
import TeamsRegisteredPage from './pages/teams/teamsRegistered';

function App() {
  return (
    <div className="overflow-y-hidden">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teams" element={<TeamsRegisteredPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
