import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "../types/Client";

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
    <div className="container mt-4 mb-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">{client.orgName}</h3>
        <span className={`badge 
          ${isPending ? "bg-warning" : isActive ? "bg-success" : "bg-danger"}`}>
          {client.status}
        </span>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          {/* ROW 1 */}
          <div className="row mb-3">
            <div className="col-md-6">
              <h6 className="text-muted">Contact Details</h6>
              <p><strong>Name:</strong> {client.contactName}</p>
              <p><strong>Email:</strong> {client.contactEmail}</p>
              <p><strong>Phone:</strong> {client.contactNumber}</p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">Organization</h6>
              <p><strong>Industry:</strong> {client.industryType}</p>
              <p><strong>Company Size:</strong> {client.companySize}</p>
              <p><strong>Client Type:</strong> {client.clientType}</p>
            </div>
          </div>

          <hr />

          {/* ROW 2 */}
          <div className="row mb-3">
            <div className="col-md-6">
              <h6 className="text-muted">Address & Compliance</h6>
              <p><strong>GST:</strong> {client.gst}</p>
              <p><strong>Address:</strong> {client.address}</p>
            </div>

            <div className="col-md-6">
              <h6 className="text-muted">Subscription</h6>

              {client.clientType === "Free Trial" ? (
                <>
                  {client.fromDate && (
                    <p><strong>Trial Start:</strong> {client.fromDate}</p>
                  )}
                  {client.toDate && (
                    <p><strong>Trial End:</strong> {client.toDate}</p>
                  )}
                </>
              ) : (
                <p>Paid / Regular Client</p>
              )}
            </div>
          </div>

          <hr />

          {/* SERVICES */}
          <div className="mb-3">
            <h6 className="text-muted">Services Opted</h6>
            <ul className="mb-0">
              {client.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* REMARKS */}
          {(isPending || isRejected) && (
            <div className="mt-4">
              <label className="form-label fw-bold">Remarks</label>
              <textarea
                className="form-control"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks for approval / rejection"
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-4 d-flex flex-wrap gap-2">
            {isPending && (
              <>
                <button
                  className="btn btn-success"
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
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </button>
              </>
            )}

            {isActive && (
              <>
                <span className="text-success fw-bold align-self-center">
                  This client is active
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
