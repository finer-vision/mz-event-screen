import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import offlineSync from "@/services/offline-sync";

offlineSync.start();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </Router>,
);
