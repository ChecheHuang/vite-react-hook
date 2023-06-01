import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "@/store";
import "./index.scss";
(async () => {
  if (import.meta.env.MODE === "mock") {
    // console.log("有引入 mock");
    await import("./mock");
    return;
  }
  console.log("沒有引入mock");
})();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
      },
    }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>,
);
