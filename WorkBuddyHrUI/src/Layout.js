import React from "react";
import { Outlet } from "react-router-dom";
import MenuPage from "./MenuPage";

const Layout = () => {
  return (
    <div>
      <MenuPage />
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;