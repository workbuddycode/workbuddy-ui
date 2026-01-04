import React from "react";

const About: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">About WorkBuddyHR</h2>
        <p className="text-muted mt-2">
          Empowering businesses with simple, smart HR solutions
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            <strong>WorkBuddyHR</strong> is a modern HRMS platform built to help
            growing businesses manage their people operations efficiently.
            From attendance and leave to payroll and asset management, we aim
            to simplify HR for teams of all sizes.
          </p>

          <p>
            We believe HR technology should be easy to use, scalable, and
            accessible. Our platform is designed with a strong focus on
            automation, flexibility, and user experience.
          </p>

          <p>
            As an early-stage product, we are continuously evolving — listening
            closely to customer feedback and building features that truly solve
            real-world HR challenges.
          </p>

          <p className="mb-0">
            Our mission is simple:  
            <strong> Help organizations focus more on people and less on
            processes.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
