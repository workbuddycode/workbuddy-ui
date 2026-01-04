import { Routes } from "react-router-dom";
import WebsiteRoutes from "../website/route/WebsiteRoutes";
import { internalRoutes } from "../workbuddy-internal/routes/InternalRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {WebsiteRoutes}
      {internalRoutes}
    </Routes>
  );
}
