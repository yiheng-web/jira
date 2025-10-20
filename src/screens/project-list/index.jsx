import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useState, useEffect } from "react";


// src/screens/project-list/index.jsx
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);  // ✅ 添加这行
console.log('🔍 Final apiUrl:', apiUrl);  // ✅ 添加这行
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
            name:"",
            personId:""
        });
    const [list,setList] = useState([]);
    const [users,setUsers] = useState([]);

    
    // useEffect(() => {
    //     fetch(`${apiUrl}/project/`).then(
    //         async res => {
    //             if(res.ok){
    //                 setList(
    //                     await res.json()
    //                 )
    //             }
    //         }
    //     )
    // },[param])

    // useEffect(()=>{
    //     fetch(`${apiUrl}/users`).then(
    //         async res => {
    //             if(res.ok){
    //                 setUsers(
    //                     await res.json()
    //                 )
    //             }
    // })},[param])
    // 在你的 index.jsx 中，修改这两个 useEffect
// ✅ 修复：先检查 res.ok，再用 res.json()
useEffect(() => {
    console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🔍 Final apiUrl:', apiUrl);
    
    // 项目列表
    fetch('http://localhost:4000/projects')
        .then(async res => {
            console.log('📡 Projects Status:', res.status);
            if (res.ok) {
                const data = await res.json();  // ✅ 直接用 res.json()
                console.log('✅ Projects:', data);
                setList(data);
            } else {
                console.error('❌ Projects failed:', res.status);
            }
        })
        .catch(err => console.error('❌ Projects Error:', err));

    // 用户列表
    fetch('http://localhost:4000/users')
        .then(async res => {
            console.log('📡 Users Status:', res.status);
            if (res.ok) {
                const data = await res.json();  // ✅ 直接用 res.json()
                console.log('✅ Users:', data);
                setUsers(data);
            } else {
                console.error('❌ Users failed:', res.status);
            }
        })
        .catch(err => console.error('❌ Users Error:', err));
}, []);
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    )
}