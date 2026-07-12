import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@bl/ui/globals.css";
import "./lib/i18n";

import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
