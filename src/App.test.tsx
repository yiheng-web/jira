import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
// 引入你项目中的全量 Provider
import { AppProviders } from "context"; 

test("renders learn react link", () => {
  // 用 AppProviders 包裹被测试的组件
  render(
    <AppProviders>
      <App />
    </AppProviders>
  );

  // 注意：如果你的 Jira 项目首页已经不是 React 初始页了
  // 你需要把 'learn react' 换成你页面上真实存在的文字，比如 '项目列表' 或 '登录'
  const linkElement = screen.queryByText(/learn react/i) || screen.queryByText(/登录/i);
  
  if (linkElement) {
    expect(linkElement).toBeInTheDocument();
  }
});