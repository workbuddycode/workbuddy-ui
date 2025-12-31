import React from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const hideRightActions = ["/", "/login", "/register", "/onboard/client"].includes(
    location.pathname
  );

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const isLoggedIn = !!user;
  const userRole = user?.role || "User";

  /* ---------------- Popovers ---------------- */

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

  /* ---------------- Scroll Helpers ---------------- */

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFooter = () => {
    document
      .getElementById("support")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---------------- Render ---------------- */

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm fixed-header">
      
      {/* LEFT */}
      <div className="d-flex align-items-center">
        {!isHomePage && (
          <button
            className="btn btn-outline-secondary me-2"
            onClick={onMenuClick}
          >
            <List size={20} />
          </button>
        )}

        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="WorkBuddyHR Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          WorkBuddyHR
        </Link>
      </div>

      {/* CENTER NAV (HOME PAGE ONLY) */}
      {isHomePage && (
        <div className="mx-auto d-flex align-items-center gap-4 fw-medium">
          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={scrollToTop}
          >
            Home
          </button>

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={scrollToProducts}
          >
            Products
          </button>

          <Link className="nav-link text-dark" to="/pricing">
            Pricing
          </Link>

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={scrollToFooter}
          >
            Support
          </button>

          {/* LOGIN BUTTON (ONLY IF NOT LOGGED IN) */}
          {!isLoggedIn && (
            <Link to="/login" className="btn btn-outline-primary btn-sm ms-3">
              Login
            </Link>
          )}
        </div>
      )}

      {/* RIGHT ACTIONS (NON-HOME PAGES ONLY) */}
      {!hideRightActions && !isHomePage && (
        <div className="ms-auto d-flex align-items-center gap-3">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={activitiesPopover}
            rootClose
          >
            <button className="btn btn-outline-primary btn-sm">
              Activities
            </button>
          </OverlayTrigger>

          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={notificationsPopover}
            rootClose
          >
            <button className="btn btn-outline-warning btn-sm">
              Notifications
            </button>
          </OverlayTrigger>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="d-flex align-items-center"
            >
              {userRole}
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
