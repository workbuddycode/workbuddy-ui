import { Outlet } from "react-router-dom";
import WebsiteHeader from "./WebsiteHeader";
import WebsiteFooter from "./WebsiteFooter";

const WebsiteLayout = () => {
  return (
    <>
      <WebsiteHeader />
      <Outlet />
      <WebsiteFooter />
    </>
  );
};

export default WebsiteLayout;
