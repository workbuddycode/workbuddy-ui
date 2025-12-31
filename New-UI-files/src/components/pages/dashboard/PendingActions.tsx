import React from "react";

interface Props {
  onApprove: () => void;
  onReject: () => void;
}

const PendingActions: React.FC<Props> = ({ onApprove, onReject }) => {
  return (
    <>
      <button className="btn btn-success btn-sm me-2" onClick={onApprove}>
        Approve
      </button>

      <button className="btn btn-danger btn-sm" onClick={onReject}>
        Reject
      </button>
    </>
  );
};

export default PendingActions;
