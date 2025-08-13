import { Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Registration from '../components/pages/Registration';
import Login from '../components/pages/Login';
import OnboardingWorkBuddy from '../components/pages/OnboardingWorkBuddy';
import OnboardingClient from '../components/pages/OnboardingClient';
import Approval from '../components/pages/Approval';
import AdminDashboard from '../components/pages/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
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