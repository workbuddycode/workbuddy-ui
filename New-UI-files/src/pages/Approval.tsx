import React from "react";

const Approval: React.FC = () => {
  const checklist = [
    "Company Overview",
    "Logo Uploaded",
    "Key Contacts Added",
    "GST / Registration Verified",
    "Services Selected",
    "Payment Details"
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Client Details Approval & Profile Creation</h3>
      <div className="shadow p-4 rounded bg-light">
        <p>Checklist for mandatory fields before approval:</p>
        <ul className="list-group mb-3">
          {checklist.map((item, idx) => (
            <li key={idx} className="list-group-item">{item}</li>
          ))}
        </ul>

        <div className="d-flex gap-3">
          <button className="btn btn-success">Approve & Create Profile</button>
          <button className="btn btn-danger">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Approval;
