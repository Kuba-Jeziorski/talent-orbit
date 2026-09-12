import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";

let container = document.querySelector("#root");

if (!container) {
  container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
