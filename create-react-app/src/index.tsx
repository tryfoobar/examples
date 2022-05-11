import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Foo from "./routes/Foo";
import { CrudProvider } from "./CrudProvider";

import "./global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CrudProvider>
        <App>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/foo">Foo</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="foo" element={<Foo />} />
          </Routes>
        </App>
      </CrudProvider>
    </BrowserRouter>
  </React.StrictMode>
);
