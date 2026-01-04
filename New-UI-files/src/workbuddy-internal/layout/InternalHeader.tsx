import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const isLoggedIn = !!user;
  const userRole = user?.role || "User";

  // const [showComingSoon, setShowComingSoon] = useState(false);

  /* ---------------- PAGE CONTEXT ---------------- */

  const publicNavPages = ["/", "/about", "/careers"];
  const isPublicNav = publicNavPages.includes(location.pathname);
  const isHomePage = location.pathname === "/";

  /* ---------------- SMART NAV HELPERS ---------------- */

  const goHomeAndScroll = (scrollTo?: "top" | "products" | "support") => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        performScroll(scrollTo);
      }, 100);
    } else {
      performScroll(scrollTo);
    }
  };

  const performScroll = (scrollTo?: "top" | "products" | "support") => {
    if (scrollTo === "products") {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (scrollTo === "support") {
      document
        .getElementById("support")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  /* ---------------- Render ---------------- */

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 shadow-sm fixed-header">
      <List size={20} onClick={onMenuClick} />
      {/* LEFT BRAND */}
      <div className="d-flex align-items-center">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="WorkBuddyHR Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          WorkBuddyHR
        </Link>
      </div>

      {/* CENTER NAV – PUBLIC STYLE */}
      {isPublicNav && (
        <div className="mx-auto d-flex align-items-center gap-4 fw-medium">

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => goHomeAndScroll("top")}
          >
            Home
          </button>

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => goHomeAndScroll("products")}
          >
            Products
          </button>

          {/* <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => setShowComingSoon(true)}
          >
            Pricing
          </button> */}

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => goHomeAndScroll("support")}
          >
            Support
          </button>

          {!isLoggedIn && (
            <Link to="/login" className="btn btn-outline-primary btn-sm ms-3">
              Login
            </Link>
          )}
        </div>
      )}

      {/* RIGHT NAV – APP STYLE */}
      {isLoggedIn && !isPublicNav && (
        <div className="ms-auto d-flex align-items-center gap-3">

          <OverlayTrigger trigger="click" placement="bottom" overlay={activitiesPopover} rootClose>
            <button className="btn btn-outline-primary btn-sm">
              Activities
            </button>
          </OverlayTrigger>

          <OverlayTrigger trigger="click" placement="bottom" overlay={notificationsPopover} rootClose>
            <button className="btn btn-outline-warning btn-sm">
              Notifications
            </button>
          </OverlayTrigger>

          <Dropdown align="end">
            <Dropdown.Toggle variant="light">
              {userRole}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {/* {showComingSoon && (
        <ComingSoonModal
          title="Coming Soon!"
          description="We're working on our pricing plans. Stay tuned!"
          onClose={() => setShowComingSoon(false)}
        />
      )} */}
    </nav>
  );
};

export default Header;
