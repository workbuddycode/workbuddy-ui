import React from "react";
import { Dropdown, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import {
  List,
  Bell,
  ClipboardCheck,
  PersonCircle
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

interface HeaderProps {
  onMenuClick?: () => void;
}

const InternalHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  if (!user) return null;

  const userRole = user?.role || "User";

  /* ---------------- Popovers ---------------- */

  const activitiesPopover = (
    <Popover id="popover-activities">
      <Popover.Header as="h6">Recent Activities</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0 small">
          <li>✔ Client approved</li>
          <li>➕ New registration</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const notificationsPopover = (
    <Popover id="popover-notifications">
      <Popover.Header as="h6">Notifications</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0 small">
          <li className="fw-bold">New user awaiting approval</li>
          <li className="text-muted">Profile updated</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm fixed-header">

      {/* LEFT: HAMBURGER + LOGO */}
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-secondary btn-sm mobile-only"
          onClick={onMenuClick}
        >
          <List size={20} />
        </button>

        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/dashboard">
          <img
            src={logo}
            alt="WorkBuddyHR"
            style={{ height: "36px", marginRight: "10px" }}
          />
          WorkBuddyHR
        </Link>
      </div>

      {/* RIGHT: ICON ACTIONS */}
      <div className="ms-auto d-flex align-items-center gap-3">

        {/* Activities */}
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={activitiesPopover}
          rootClose
        >
          <div className="position-relative icon-btn text-dark">
            <ClipboardCheck size={20} />
            <Badge bg="danger" pill className="icon-badge">
              2
            </Badge>
          </div>
        </OverlayTrigger>

        {/* Notifications */}
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={notificationsPopover}
          rootClose
        >
          <div className="position-relative icon-btn text-dark">
            <Bell size={20} />
            <Badge bg="danger" pill className="icon-badge">
              3
            </Badge>
          </div>
        </OverlayTrigger>

        {/* Profile */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="border-0 d-flex align-items-center"
          >
            <PersonCircle size={26} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/logout">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default InternalHeader;
