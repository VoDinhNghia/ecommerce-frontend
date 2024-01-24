/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-notifications/lib/notifications.css";
import "rsuite/dist/rsuite.min.css";
import "./styles/home.scss";
import "./styles/login.scss";
import "./styles/menu-home.scss";
import "./styles/notfound.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
