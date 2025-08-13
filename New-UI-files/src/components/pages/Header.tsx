import React from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png"; 

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const hideRightActions = ["/","/login", "/register","/onboard/client"].includes(location.pathname);

  const activitiesPopover = (
    <Popover id="popover-activities">
      <Popover.Header as="h3">Recent Activities</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0">
          <li>Approved client: John Doe</li>
          <li>New registration: Mark Lee</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const notificationsPopover = (
    <Popover id="popover-notifications">
      <Popover.Header as="h3">Notifications</Popover.Header>
      <Popover.Body>
        <ul className="list-unstyled mb-0">
          <li className="fw-bold">New user awaiting approval</li>
          <li className="text-muted">Profile updated</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm">
      {/* Left: Hamburger + Logo */}
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={onMenuClick}
        >
          <List size={20} />
        </button>
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="WorkBuddyHR Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          WorkBuddyHR
        </a>
      </div>

      {/* Right: Hide on Login/Register */}
      {!hideRightActions && (
        <div className="ms-auto d-flex align-items-center gap-3">
          <OverlayTrigger trigger="click" placement="bottom" overlay={activitiesPopover} rootClose>
            <button className="btn btn-outline-primary btn-sm">Activities</button>
          </OverlayTrigger>

          <OverlayTrigger trigger="click" placement="bottom" overlay={notificationsPopover} rootClose>
            <button className="btn btn-outline-warning btn-sm">Notifications</button>
          </OverlayTrigger>

          <Dropdown align="end">
            <Dropdown.Toggle variant="light" className="d-flex align-items-center">
              Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </nav>
  );
};

export default Header;
