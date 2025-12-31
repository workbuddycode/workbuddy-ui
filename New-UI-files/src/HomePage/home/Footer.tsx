import React from "react";

const Footer: React.FC = () => {
  return (
    <section id="support" className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h5>WorkBuddyHR</h5>
            <p className="text-muted small">
              Empowering businesses with smart HR solutions.
            </p>
          </div>

          <div className="col-md-2">
            <h6>Products</h6>
            <ul className="list-unstyled small">
              <li>Attendance Hub</li>
              <li>Leave Planner</li>
              <li>Asset Management</li>
              <li>Timesheet</li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Company</h6>
            <ul className="list-unstyled small">
              <li>About Us</li>
              <li>Careers</li>
              <li>Partners</li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6>Support</h6>
            <ul className="list-unstyled small">
              <li>Help Center</li>
              <li>Documentation</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary mt-4" />
        
      </div>
    </section>
  );
};

export default Footer;
