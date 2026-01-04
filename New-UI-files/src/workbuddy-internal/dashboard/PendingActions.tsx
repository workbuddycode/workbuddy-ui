import React from "react";

const PendingActions: React.FC = () => {
  const handleApprove = (id: string) => {
    console.log("Approved:", id);
  };

  const handleReject = (id: string) => {
    console.log("Rejected:", id);
  };

  return (
    <div className="p-4">
      <h3>Pending Actions</h3>

      {/* Example */}
      <button onClick={() => handleApprove("123")}>Approve</button>
      <button onClick={() => handleReject("123")}>Reject</button>
    </div>
  );
};

export default PendingActions;
