import { Route } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoutes";
import RoleRoute from "../../routes/RoleRoutes";

import InternalLayout from "../layout/InternalLayout";

import AdminDashboard from "../dashboard/AdminDashboard";
import ClientProfile from "../dashboard/ClientProfile";

import Profile from "../Profile";
import Approval from "../Approval";
import Logout from "../Logout";
import OnboardingClient from "../OnboardingClient";
import OnboardingWorkBuddy from "../OnboardingWorkBuddy";
import PendingActions from "../dashboard/PendingActions";
import UserTable from "../dashboard/UserTable";

import { mockClients } from "../types/mock-data/mockClients";
import UsersPage from "../dashboard/UserPage";

export const internalRoutes = (
    <Route
        element={
            <PrivateRoute>
                <InternalLayout />
            </PrivateRoute>
        }
    >
        {/* ---------- COMMON AUTHENTICATED ROUTES ---------- */}
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<Logout />} />

        {/* ---------- DASHBOARD ---------- */}
        <Route
            path="dashboard"
            element={
                <RoleRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <AdminDashboard />
                </RoleRoute>
            }
        />

        {/* ---------- CLIENT MANAGEMENT ---------- */}
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

        <Route
            path="onboard/client"
            element={<OnboardingClient />}
        />

        <Route
            path="onboard/workbuddy"
            element={<OnboardingWorkBuddy />}
        />

        {/* ---------- ADMIN ONLY ---------- */}
        <Route
            path="approval"
            element={
                <RoleRoute allowedRoles={["ADMIN"]}>
                    <Approval />
                </RoleRoute>
            }
        />

        <Route
            path="pending-actions"
            element={
                <RoleRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <PendingActions />
                </RoleRoute>
            }
        />

        import UsersPage from "../workbuddy-internal/pages/UsersPage";

        <Route
            path="users"
            element={
                <RoleRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <UsersPage />
                </RoleRoute>
            }
        />

    </Route>
);
