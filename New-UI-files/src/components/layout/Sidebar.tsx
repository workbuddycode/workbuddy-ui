import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h6 className="sidebar-title">My Desk</h6>

        <NavLink to="/attendance" onClick={onClose}>
          Attendance Hub
        </NavLink>

        <NavLink to="/leave" onClick={onClose}>
          Leave Planner
        </NavLink>

        <NavLink to="/asset" onClick={onClose}>
          Asset
        </NavLink>

        <NavLink to="/timesheet" onClick={onClose}>
          Timesheet
        </NavLink>

        <NavLink to="/hr-drive" onClick={onClose}>
          HR Drive
        </NavLink>

        <NavLink to="/help-desk" onClick={onClose}>
          Help Desk
        </NavLink>
      </aside>
    </>
  );
};

export default Sidebar;
