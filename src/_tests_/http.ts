import { setupServer } from "msw/node";
// 如果直接解构报错，尝试这种导入方式
import * as msw from "msw";
import { http as request } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  // 使用 msw.http 访问
  server.use(
    msw.http.get(`${apiUrl}/${endpoint}`, () => {
      return msw.HttpResponse.json(mockResult);
    })
  );

  const result = await request(endpoint);
  expect(result).toEqual(mockResult);
});

test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let interceptedRequest: Request | undefined;

  server.use(
    // 手动指定类型为 Request 解决 any 报错
    msw.http.get(`${apiUrl}/${endpoint}`, ({ request }: { request: Request }) => {
      interceptedRequest = request;
      return msw.HttpResponse.json(mockResult);
    })
  );

  await request(endpoint, { token });
  
  // 原生 Request 对象的 headers 获取
  expect(interceptedRequest?.headers.get("Authorization")).toBe(`Bearer ${token}`);
});