import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/styles.css'
import AppRoutes from "./routes/routes";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
<BrowserRouter>
  <AppRoutes />
</BrowserRouter>
);