import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./states/index.js";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollToTop from "./utils/scrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ScrollToTop />
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
