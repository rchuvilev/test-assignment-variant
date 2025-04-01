import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./stylesheets/global.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Need to import assets used indirectly in css strings (assetsInclude breaks urls with '/assets/' part)
import "../public/icons/checkbox.svg";
import "../public/icons/copy.svg";
import "../public/icons/delete.svg";
import "../public/icons/home.svg";
import "../public/icons/loader.svg";
import "../public/icons/plus.svg";
import "../public/icons/refresh.svg";
import "../public/images/loader.svg";
