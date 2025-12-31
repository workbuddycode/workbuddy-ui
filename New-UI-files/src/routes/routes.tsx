import { Routes, Route } from "react-router-dom";

import App from "../App";
import About from "../components/pages/About";
import Registration from "../components/pages/Registration";
import Login from "../components/pages/Login";
import OnboardingWorkBuddy from "../components/pages/OnboardingWorkBuddy";
import OnboardingClient from "../components/pages/OnboardingClient";
import Approval from "../components/pages/Approval";
import AdminDashboard from "../components/pages/dashboard/AdminDashboard";
import Profile from "../components/pages/Profile";
import Unauthorized from "./Unauthorized";
import Logout from "../components/pages/Logout";
import Home from "../HomePage/Home";

import PrivateRoute from "./PrivateRoutes";
import RoleRoute from "./RoleRoutes";
import ClientProfile from "../components/pages/dashboard/ClientProfile";
import { mockClients } from "../components/pages/types/mock-data/mockClients";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>

        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Public */}
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="logout" element={<Logout />} />
        {/* Protected */}
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="dashboard"
          element={
            <RoleRoute allowedRoles={["MANAGER", "ADMIN"]}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="client-profile/:id"
          element={
            <ClientProfile
              clients={mockClients}
              onApprove={() => { }}
              onReject={() => { }}
              onReconsider={() => { }}
            />
          }
        />


        {/* Visible only after login */}
        <Route
          path="onboard/workbuddy"
          element={
            <PrivateRoute>
              <OnboardingWorkBuddy />
            </PrivateRoute>
          }
        />

        <Route
          path="onboard/client"
          element={
            <PrivateRoute>
              <OnboardingClient />
            </PrivateRoute>
          }
        />

        <Route
          path="approval"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <Approval />
            </RoleRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}
