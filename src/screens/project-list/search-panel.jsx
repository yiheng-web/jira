import React from "react";  // ✅ 只改导入

export const SearchPanel = ({param,setParam,users}) => {
    return (
        <form action="">
             {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <input type="text"  value={param.name} onChange={c=>{
                setParam({
                    ...param,
                    name:c.target.value
                })
            }}/>
            <select value={param.personId} onChange={c => setParam({
                ...param,
                personId:c.target.value
            })}>
                <option value="">负责人</option>
                {/* ✅ 只改这一行 */}
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </form>
    )
}