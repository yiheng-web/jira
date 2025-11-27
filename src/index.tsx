import React from "react";
import ReactDOM from "react-dom"; // 注意这里是 react-dom，不是 react-dom/client
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {loadDevTools} from 'jira-dev-tool'
import {AppProviders} from 'context/index'
import 'antd/dist/antd.less';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

loadDevTools(()=>{
  ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
})
// 性能监控（可选）
reportWebVitals();
