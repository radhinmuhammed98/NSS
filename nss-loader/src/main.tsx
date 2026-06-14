import React from "react";
import ReactDOM from "react-dom/client";
import { IntegrationExample } from "./examples/IntegrationExample";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntegrationExample />
  </React.StrictMode>
);
