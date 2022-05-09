import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Fop from "./routes/Fop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="fop" element={<Fop />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
