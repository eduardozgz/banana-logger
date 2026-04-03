import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@bl/ui/globals.css";
import "./lib/i18n";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
