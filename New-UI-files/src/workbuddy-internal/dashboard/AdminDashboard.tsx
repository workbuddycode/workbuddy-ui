import React, { useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import { Client } from "../types/Client";
import { mockClients } from "../types/mock-data/mockClients";


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // ===== MOCK CLIENT DATA =====

  const [clients, setClients] = useState<Client[]>(mockClients);

const pending = clients.filter(c => c.status === "PENDING");
const active = clients.filter(c => c.status === "ACTIVE");
const rejected = clients.filter(c => c.status === "REJECTED");


  const [searchPending, setSearchPending] = useState("");
  const [searchActive, setSearchActive] = useState("");
  const [searchRejected, setSearchRejected] = useState("");

  const handleReview = (client: Client) => {
    navigate(`/client-profile/${client.id}`, { state: client });
  };

  return (
    <div className="container mt-4">

      {/* -------- Pending Approvals Table -------- */}
      <h4>Pending Approvals</h4>

      <Form.Control
        type="text"
        placeholder="Search pending..."
        className="mb-3"
        value={searchPending}
        onChange={(e) => setSearchPending(e.target.value)}
      />

      <UserTable
        users={pending.filter(c =>
          c.orgName.toLowerCase().includes(searchPending.toLowerCase())
        )}
        showAction
        actionLabel="Review"
        onActionClick={(client) => handleReview(client)}
      />

      <hr />

      {/* -------- Tabs: Active / Rejected -------- */}
      <Tabs defaultActiveKey="active" className="mb-4">
        <Tab eventKey="active" title="Active Users">
          <Form.Control
            type="text"
            placeholder="Search active..."
            className="my-3"
            value={searchActive}
            onChange={(e) => setSearchActive(e.target.value)}
          />

          <UserTable
            users={active.filter(c =>
              c.orgName.toLowerCase().includes(searchActive.toLowerCase())
            )}
          />
        </Tab>

        <Tab eventKey="rejected" title="Rejected Users">
          <Form.Control
            type="text"
            placeholder="Search rejected..."
            className="my-3"
            value={searchRejected}
            onChange={(e) => setSearchRejected(e.target.value)}
          />

          <UserTable
            users={rejected.filter(c =>
              c.orgName.toLowerCase().includes(searchRejected.toLowerCase())
            )}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
