// import './wdyd'
import "jira-dev-tool";
import React from "react";
import ReactDOM from "react-dom"; // 注意这里是 react-dom，不是 react-dom/client
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {loadServer,DevTools} from 'jira-dev-tool'
import {AppProviders} from 'context/index'
import {HelmetProvider} from 'react-helmet-async'
import 'antd/dist/antd.less';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

loadServer(()=>{
  ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
    <AppProviders>
      <DevTools/>
      <App />
    </AppProviders>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
})
// 性能监控（可选）
reportWebVitals();
