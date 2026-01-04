import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ComingSoonModal from "../modals/ComingSoon";

const WebsiteHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showComingSoon, setShowComingSoon] = useState(false);

  const isHomePage = location.pathname === "/";

  /* ---------------- Scroll Helpers ---------------- */

  const goHomeAndScroll = (section?: "top" | "products" | "support") => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => performScroll(section), 100);
    } else {
      performScroll(section);
    }
  };

  const performScroll = (section?: "top" | "products" | "support") => {
    if (section === "products") {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (section === "support") {
      document
        .getElementById("support")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm fixed-header">

        {/* LEFT: BRAND */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="WorkBuddyHR Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          WorkBuddyHR
        </Link>

        {/* RIGHT: NAV LINKS */}
        <div className="ms-auto d-flex align-items-center gap-4 fw-medium">

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

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => setShowComingSoon(true)}
          >
            Pricing
          </button>

          <button
            className="nav-link btn btn-link text-dark p-0"
            onClick={() => goHomeAndScroll("support")}
          >
            Support
          </button>

          <Link to="/login" className="btn btn-outline-primary btn-sm ms-2">
            Login
          </Link>
        </div>
      </nav>

      {/* COMING SOON MODAL */}
      {showComingSoon && (
        <ComingSoonModal
          title="Coming Soon!"
          description="We're working on our pricing plans. Stay tuned!"
          onClose={() => setShowComingSoon(false)}
        />
      )}
    </>
  );
};

export default WebsiteHeader;
