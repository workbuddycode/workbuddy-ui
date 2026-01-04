import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import InternalHeader from "./InternalHeader";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "./Footer";

const InternalLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="internal-layout">
      <InternalHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="internal-body">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="internal-content">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default InternalLayout;
