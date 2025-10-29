import React from "react";
import ReactDOM from "react-dom"; // 注意这里是 react-dom，不是 react-dom/client
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// 性能监控（可选）
reportWebVitals();
