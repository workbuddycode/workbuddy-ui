import React, { useState } from "react";
import { Table, Dropdown, OverlayTrigger, Popover, Form } from "react-bootstrap";

const AdminDashboard: React.FC = () => {
  const [searchActive, setSearchActive] = useState("");
  const [searchPending, setSearchPending] = useState("");

  const activeUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", company: "ABC Corp" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", company: "XYZ Ltd" }
  ];

  const pendingApprovals = [
    { id: 1, name: "Mark Lee", email: "mark@example.com", company: "TechWave" }
  ];

  const recentActivities = [
    "Approved client: John Doe",
    "New registration: Mark Lee"
  ];

  const notifications = [
    { id: 1, text: "Your profile was updated", read: false },
    { id: 2, text: "New user awaiting approval", read: true }
  ];

  const activitiesPopover = (
    <Popover id="popover-activities">
      <Popover.Header as="h3">Recent Activities</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0">
          {recentActivities.map((a, i) => <li key={i}>• {a}</li>)}
        </ul>
      </Popover.Body>
    </Popover>
  );

  const notificationsPopover = (
    <Popover id="popover-notifications">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0">
          {notifications.map((n) => (
            <li key={n.id} className={n.read ? "text-muted" : "fw-bold"}>
              • {n.text}
            </li>
          ))}
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <div>

      {/* Main content */}
      <div className="container mt-4">
        <div className="row">
          {/* Active Users */}
          <div className="col-md-6 mb-4">
            <h5>Active Users</h5>
            <Form.Control
              type="text"
              placeholder="Search..."
              className="mb-2"
              value={searchActive}
              onChange={(e:any) => setSearchActive(e.target.value)}
            />
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers
                  .filter(u => u.name.toLowerCase().includes(searchActive.toLowerCase()))
                  .map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.company}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>

          {/* Pending Approvals */}
          <div className="col-md-6 mb-4">
            <h5>Pending Approvals</h5>
            <Form.Control
              type="text"
              placeholder="Search..."
              className="mb-2"
              value={searchPending}
              onChange={(e:any) => setSearchPending(e.target.value)}
            />
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals
                  .filter(p => p.name.toLowerCase().includes(searchPending.toLowerCase()))
                  .map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.company}</td>
                      <td>
                        <button className="btn btn-success btn-sm me-2">Approve</button>
                        <button className="btn btn-danger btn-sm">Reject</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
