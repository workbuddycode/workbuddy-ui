import React from "react";

const products = [
  {
    title: "Attendance Hub",
    color: "#3b82f6",
    description:
      "Real-time attendance tracking with geo-fencing and face recognition",
    points: [
      "Biometric integration",
      "GPS location tracking",
      "Automated shift management",
      "Real-time reports",
    ],
  },
  {
    title: "Leave Planner",
    color: "#22c55e",
    description:
      "Streamline leave management with automated workflows and approvals",
    points: [
      "Multiple leave types",
      "Approval workflows",
      "Leave balance tracking",
      "Calendar integration",
    ],
  },
  {
    title: "Asset Management",
    color: "#8b5cf6",
    description:
      "Track and manage company assets efficiently across all locations",
    points: [
      "Asset allocation tracking",
      "Maintenance schedules",
      "Digital inventory",
      "Return management",
    ],
  },
  {
    title: "Timesheet",
    color: "#f97316",
    description:
      "Accurate time tracking for projects and billing with detailed reports",
    points: [
      "Project-wise tracking",
      "Billable hours",
      "Overtime calculation",
      "Export to payroll",
    ],
  },
  {
    title: "Help Desk",
    color: "#ef4444",
    description:
      "Comprehensive ticketing system for employee support and queries",
    points: [
      "Ticket management",
      "Priority assignments",
      "SLA tracking",
      "Knowledge base",
    ],
  },
  {
    title: "HR Drive",
    color: "#06b6d4",
    description:
      "Secure document storage and management for all HR files",
    points: [
      "Cloud storage",
      "Access controls",
      "Version history",
      "Secure sharing",
    ],
  },
];

const ProductsListing = () => {
  return (
    <section id="products" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Complete HR Management Suite</h2>
          <p className="text-muted">
            Everything you need to manage your workforce efficiently
          </p>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-4" key={product.title}>
              <div className="product-card h-100">
                <div
                  className="product-icon"
                  style={{ backgroundColor: product.color }}
                >
                  {product.title[0]}
                </div>

                <h5 className="fw-semibold mt-3">{product.title}</h5>
                <p className="text-muted small">{product.description}</p>

                <ul className="small ps-3">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-primary px-4 py-2">
            Get Started with All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsListing;
