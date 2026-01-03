import React from "react";
import { Clock } from "react-bootstrap-icons";

interface ComingSoonModalProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  title = "Coming Soon!",
  description = "We're working on this feature. Stay tuned for exciting updates!",
  buttonText = "Got it",
  onClose,
}) => {
  return (
    <div className="coming-soon-backdrop">
      <div className="coming-soon-card">
        <div className="icon-wrapper">
          <Clock size={28} />
        </div>

        <h4 className="fw-bold mt-3">{title}</h4>

        <p className="text-muted text-center px-3">
          {description}
        </p>

        <button className="btn gradient-btn mt-3" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
