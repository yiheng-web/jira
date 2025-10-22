import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "#src/utils/index.js";
import * as qs from "qs";

// src/screens/project-list/index.jsx
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
// console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);  // ✅ 添加这行
console.log("🔍 Final apiUrl:", apiUrl); // ✅ 添加这行
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 500); // 500ms 内的变化不触发请求

  // 项目列表
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      },
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }); //空数组是希望其只在页面加载的时候执行一次，而不在页面更新的时候执行，相当于 componentDidMount 和 componentDidUpdate 的合并
  // 在你的 index.jsx 中，修改这两个 useEffect
  // ✅ 修复：先检查 res.ok，再用 res.json()
  // useEffect(() => {
  //     // console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);
  //     // console.log('🔍 Final apiUrl:', apiUrl);

  //     // 项目列表
  //     fetch(`${apiUrl}/projects`)
  //         .then(async res => {
  //             // console.log('📡 Projects Status:', res.status);
  //             if (res.ok) {
  //                 const data = await res.json();  // ✅ 直接用 res.json()
  //                 // console.log('✅ Projects:', data);
  //                 setList(data);
  //             } else {
  //                 console.error('❌ Projects failed:', res.status);
  //             }
  //         })
  //         .catch(err => console.error('❌ Projects Error:', err));

  //     // 用户列表
  //     fetch(`${apiUrl}/users`)
  //         .then(async res => {
  //             // console.log('📡 Users Status:', res.status);
  //             if (res.ok) {
  //                 const data = await res.json();  // ✅ 直接用 res.json()
  //                 // console.log('✅ Users:', data);
  //                 setUsers(data);
  //             } else {
  //                 console.error('❌ Users failed:', res.status);
  //             }
  //         })
  //         .catch(err => console.error('❌ Users Error:', err));
  // }, []);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
