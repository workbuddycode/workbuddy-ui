import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h6 className="sidebar-title">My Desk</h6>

      <NavLink to="/attendance">Attendance Hub</NavLink>
      <NavLink to="/leave">Leave Planner</NavLink>
      <NavLink to="/asset">Asset</NavLink>
      <NavLink to="/timesheet">Timesheet</NavLink>
      <NavLink to="/hr-drive">HR Drive</NavLink>
      <NavLink to="/help-desk">Help Desk</NavLink>
    </aside>
  );
};

export default Sidebar;
