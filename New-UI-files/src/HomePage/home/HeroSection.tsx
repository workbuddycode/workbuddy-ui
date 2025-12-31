import React from "react";
import { Button } from "react-bootstrap";
import DemoRequestModal from "./DemoRequestModal";
import ConsultationModal from "./ConsultationModal";

const HeroSection: React.FC = () => {
  const [showDemo, setShowDemo] = React.useState(false);
  const [showConsultation, setShowConsultation] = React.useState(false);

  return (
    <>
      <section id="hero" className="hero-section py-5">
        <div className="container d-flex align-items-center justify-content-between">
          <div style={{ maxWidth: "520px" }}>
            <h1 className="fw-bold mb-3">
              Welcome to the <span className="text-primary">WorkBuddyHR</span> side.
            </h1>

            <p className="text-muted mb-4">
              The most trusted full-suite HRMS for your people operations.
            </p>

            <div className="d-flex gap-3">
              <Button onClick={() => setShowDemo(true)}>
                Schedule a Demo
              </Button>

              <Button
                variant="dark"
                onClick={() => setShowConsultation(true)}
              >
                Book a Consultation
              </Button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
            alt="HRMS"
            className="rounded-pill shadow"
            style={{ width: "420px", height: "300px", objectFit: "cover" }}
          />
        </div>
      </section>

      <DemoRequestModal
        show={showDemo}
        onClose={() => setShowDemo(false)}
      />

      <ConsultationModal
        show={showConsultation}
        onClose={() => setShowConsultation(false)}
      />
    </>
  );
};

export default HeroSection;
