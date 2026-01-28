import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
// 1. 升级到 MSW 2.0 导出对象
import { http, HttpResponse } from "msw";
import fakeData from "./fake.json";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "screens/project-list";
import { AppProviders } from "context";

const apiUrl = process.env.REACT_APP_API_URL;
const fakeAuth = {
  id: 1,
  name: "jack",
  token: "123",
};

const server = setupServer(
  // 2. 将 rest.get 替换为 http.get，并使用 HttpResponse.json
  http.get(`${apiUrl}/me`, () => HttpResponse.json(fakeAuth)),
  http.get(`${apiUrl}/users`, () => HttpResponse.json(fakeData.users)),

  // 3. 处理带查询参数的接口
  http.get(`${apiUrl}/projects`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") || "";
    const personId = url.searchParams.get("personId");

    const result = fakeData?.projects?.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      );
    });
    return HttpResponse.json(result);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument(), {
    timeout: 3000,
  });

test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  // 注意：Ant Design Table 的行数断言可能需要排除表头，通常是数据长度 + 1
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};
