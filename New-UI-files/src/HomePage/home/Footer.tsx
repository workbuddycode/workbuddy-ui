import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <section id="support" className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">

          {/* BRAND */}
          <div className="col-md-4 mb-3">
            <h5>WorkBuddyHR</h5>
            <p className="small">
              Empowering businesses with smart HR solutions.
            </p>
          </div>

          {/* COMPANY LINKS */}
          <div className="col-md-2 mb-3">
            <h6>Company</h6>
            <ul className="list-unstyled small">
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-light text-decoration-none">
                  Careers
                </Link>
              </li>
              <li>
                <span className="text-muted">Partners</span>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary mt-4" />

        {/* COPYRIGHT */}
        <div className="text-center small text-muted">
          © {new Date().getFullYear()} WorkBuddyHR. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;
