import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../types/Client"; // <-- USE YOUR EXISTING INTERFACE

interface ClientProfileProps {
  clients: Client[];
  onApprove: (id: string, remarks: string) => void;
  onReject: (id: string, remarks: string) => void;
  onReconsider: (id: string) => void;
}

const ClientProfile: React.FC<ClientProfileProps> = ({
  clients,
  onApprove,
  onReject,
  onReconsider,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const client = clients.find((c) => c.id === id);
  const [remarks, setRemarks] = useState("");

  if (!client) {
    return <div className="container mt-4">Client not found.</div>;
  }

  const isPending = client.status === "PENDING";
  const isActive = client.status === "ACTIVE";
  const isRejected = client.status === "REJECTED";

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{client.orgName}</h2>

      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Client Details</h5>

        <p><strong>Contact Name:</strong> {client.contactName}</p>
        <p><strong>Email:</strong> {client.contactEmail}</p>
        <p><strong>Contact Number:</strong> {client.contactNumber}</p>

        <p><strong>Industry:</strong> {client.industryType}</p>
        <p><strong>Company Size:</strong> {client.companySize}</p>

        <p><strong>Client Type:</strong> {client.clientType}</p>

        {client.clientType === "Free Trial" && (
          <>
            {client.fromDate && (
              <p><strong>Trial Start:</strong> {client.fromDate}</p>
            )}
            {client.toDate && (
              <p><strong>Trial End:</strong> {client.toDate}</p>
            )}
          </>
        )}

        <p><strong>GST:</strong> {client.gst}</p>
        <p><strong>Address:</strong> {client.address}</p>

        <p><strong>Services:</strong></p>
        <ul>
          {client.services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        {/* Remarks only for pending & rejected */}
        {(isPending || isRejected) && (
          <div className="mt-3">
            <label className="form-label"><strong>Remarks</strong></label>
            <textarea
              className="form-control"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-4">
          {/* PENDING USERS */}
          {isPending && (
            <>
              <button
                className="btn btn-success me-3"
                onClick={() => {
                  onApprove(client.id, remarks);
                  navigate("/dashboard");
                }}
              >
                Approve
              </button>

              <button
                className="btn btn-danger"
                onClick={() => {
                  onReject(client.id, remarks);
                  navigate("/dashboard");
                }}
              >
                Reject
              </button>
            </>
          )}

          {/* REJECTED USERS */}
          {isRejected && (
            <>
            <button
              className="btn btn-warning"
              onClick={() => {
                onReconsider(client.id);
                navigate("/dashboard");
              }}
            >
              Send for Reconsideration
            </button>
            <button
                className="btn btn-primary me-3"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                OK
              </button>
            </>
          )}

          {/* ACTIVE USERS */}
          {isActive && (
            <>
            <p className="text-success fw-bold mt-2">
              This client is active.
            </p>
            <button
                className="btn btn-primary me-3"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                OK
              </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
