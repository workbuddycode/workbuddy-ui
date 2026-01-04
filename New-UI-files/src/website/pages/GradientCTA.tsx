import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ConsultationModal from "../modals/ConsultationModal";

const GradientCTA: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        id="demo-cta"
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(90deg, #2b5cff, #8a2bff)",
        }}
      >
        <h2 className="fw-bold mb-2">
          Empowering Businesses with{" "}
          <span className="text-warning">Smart</span> Solutions
        </h2>

        <p className="mb-4">
          Futuristic Cloud-HRMS powered by Artificial Intelligence for Digital
          Business
        </p>

        {/* <Button
          variant="light"
          size="lg"
          onClick={() => setShowModal(true)}
        >
          Start a WorkBuddyHR Free Account
        </Button> */}
      </section>

      {/* MODAL */}
      <ConsultationModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default GradientCTA;
