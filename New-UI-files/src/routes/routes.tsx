import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import OnboardingWorkBuddy from '../pages/OnboardingWorkBuddy';
import OnboardingClient from '../pages/OnboardingClient';
import Approval from '../pages/Approval';
import AdminDashboard from '../pages/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        {/* <Route index element={<Navigate to="/register" replace />} /> */}
          <Route path="register" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="onboard/workbuddy" element={<OnboardingWorkBuddy />} />
          <Route path="onboard/client" element={<OnboardingClient />} />
          <Route path="approval" element={<Approval />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        
      </Route>
    </Routes>
  );
}