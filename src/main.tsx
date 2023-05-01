import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "@/store";
const loadMock = async () => {
  if (import.meta.env.MODE === "development") {
    console.log("有引入 mock");
    await import("./mock");
  }
};
loadMock();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
);
