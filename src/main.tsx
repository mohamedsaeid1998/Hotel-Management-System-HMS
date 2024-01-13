import React from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./Styles/global.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Redux/Store.ts";

// AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
