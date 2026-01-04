import React from "react";

const Careers: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Careers at WorkBuddyHR</h2>
        <p className="text-muted mt-2">
          Build meaningful products. Grow with us.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <p>
            At <strong>WorkBuddyHR</strong>, we are building a next-generation HR
            platform from the ground up. We are always looking for passionate
            people who enjoy solving real problems and want to grow in a
            fast-moving startup environment.
          </p>

          <p>
            Whether you are a developer, designer, product thinker, or HR
            professional — if you care about building quality products, we’d
            love to hear from you.
          </p>

          <h5 className="fw-semibold mt-4">Why Work With Us?</h5>
          <ul>
            <li>Early-stage startup exposure</li>
            <li>Opportunity to build products from scratch</li>
            <li>Flexible and learning-focused culture</li>
            <li>Direct impact on product and decisions</li>
          </ul>

          <h5 className="fw-semibold mt-4">Current Openings</h5>
          <p className="text-muted">
            We don’t have formal openings listed yet, but we’re always open to
            conversations.
          </p>

          <p>
            📩 Send your profile to:{" "}
            <strong>careers@workbuddyhr.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
