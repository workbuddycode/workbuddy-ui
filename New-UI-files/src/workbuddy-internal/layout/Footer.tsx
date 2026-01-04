import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-light text-center py-3 border-top"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1030,
        marginTop: "0px",
      }}
    >
      <small className="text-muted">
        © {new Date().getFullYear()} WorkBuddy. All rights reserved.
      </small>
    </footer>
  );
};

export default Footer;
