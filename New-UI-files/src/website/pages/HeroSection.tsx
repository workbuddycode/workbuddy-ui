import React from "react";
import ImageCarousel from "../../components/common/ImageCarousel";
import hero1 from "../../assets/images/HeroImage_Global.png";
import hero2 from "../../assets/images/HeroImage_Indian.png";
import hero5 from "../../assets/images/Hero_TeamMeeting.png";
import hero6 from "../../assets/images/Hero_Tea_Meeting.png";
import { Button } from "react-bootstrap";
import DemoRequestModal from "../modals/DemoRequestModal";
import ConsultationModal from "../modals/ConsultationModal";

const images = [
  hero1,
  hero2,
  hero5,
  hero6
];

const HeroSection: React.FC = () => {
  const [showDemo, setShowDemo] = React.useState(false);
  const [showConsultation, setShowConsultation] = React.useState(false);

  return (
    <>
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CONTENT */}
          <div className="col-md-6">
            <h1 className="fw-bold">
              Welcome to <span className="text-primary">WorkBuddyHR</span>
            </h1>
            <p className="text-muted mt-3">
              The most trusted HRMS for businesses to manage people,
              payroll, attendance, and growth.
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

          {/* RIGHT CAROUSEL */}
          <div className="col-md-6">
            <ImageCarousel
              images={images}
            />
          </div>
        </div>
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
