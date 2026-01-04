import { Route } from "react-router-dom";
import WebsiteLayout from "../layout/WebsiteLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Careers from "../pages/Careers";
import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";

const WebsiteRoutes = (
  <Route element={<WebsiteLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="careers" element={<Careers />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Registration />} />
  </Route>
);

export default WebsiteRoutes;
