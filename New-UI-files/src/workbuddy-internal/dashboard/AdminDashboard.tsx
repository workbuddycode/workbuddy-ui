import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../types/Client";
import { mockClients } from "../types/mock-data/mockClients";


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [clients] = useState<Client[]>(mockClients);

  const pending = clients.filter(c => c.status === "PENDING");
  const approved = clients.filter(c => c.status === "ACTIVE");
  const rejected = clients.filter(c => c.status === "REJECTED");

  const goToClient = (client: Client) => {
    navigate(`/client-profile/${client.id}`, { state: client });
  };


  return (
    <div className="dashboard-container">

      {/* ================= HEADER ================= */}
      <div className="dashboard-header card">
        <div>
          <h3>Registration Requests Dashboard</h3>
          <p className="text-muted">
            Manage customer registration requests
          </p>
        </div>

        <div className="header-actions">
          <button className="btn btn-purple">
            👤 User Management
          </button>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => navigate("/onboard/workbuddy")}
          >
            <span>+</span> Onboard New Client
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">

        <div className="stat-card pending">
          <span>Pending Requests</span>
          <h2>{pending.length}</h2>
        </div>

        <div className="stat-card approved">
          <span>Approved Requests</span>
          <h2>{approved.length}</h2>
        </div>

        <div className="stat-card rejected">
          <span>Rejected Requests</span>
          <h2>{rejected.length}</h2>
        </div>

      </div>

      {/* ================= REQUEST LISTS ================= */}
      <div className="requests-grid">

        {/* Pending */}
        <div className="request-card">
          <h5 className="pending-title">
            ⏳ Pending Requests
          </h5>

          {pending.map(c => (
            <div
              key={c.id}
              className="request-item"
              onClick={() => goToClient(c)}
            >
              {c.orgName}
            </div>
          ))}
        </div>

        {/* Approved */}
        <div className="request-card">
          <h5 className="approved-title">
            ✅ Approved Requests
          </h5>

          {approved.map(c => (
            <div
              key={c.id}
              className="request-item"
              onClick={() => goToClient(c)}
            >
              {c.orgName}
            </div>
          ))}

        </div>

        {/* Rejected */}
        <div className="request-card">
          <h5 className="rejected-title">
            ❌ Rejected Requests
          </h5>

          {rejected.map(c => (
            <div
              key={c.id}
              className="request-item"
              onClick={() => goToClient(c)}
            >
              {c.orgName}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
