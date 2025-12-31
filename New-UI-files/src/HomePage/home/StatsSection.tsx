import React from "react";

const stats = [
  { value: "25+", label: "Countries", bg: "#eafff1" },
  { value: "30,000+", label: "Companies", bg: "#eef4ff" },
  { value: "3 Million+", label: "Users", bg: "#f7f0ff" },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-5">
      <div className="container d-flex justify-content-center gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stats-card text-center shadow-sm"
            style={{ background: stat.bg }}
          >
            <h2 className="fw-bold mb-2">{stat.value}</h2>
            <p className="mb-0 text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
