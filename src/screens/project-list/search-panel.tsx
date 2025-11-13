import React from "react";


export interface Users{
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string;
}
interface SearchParams{
    params:{
        name:string;
        personId:string;
    }
    users:Users[];
    setParams:(params:SearchParams['params'])=>void;
}



export const SearchPanel = ({params,setParams,users}:SearchParams) => {
    return (
        <form action="">
            <input type="text"  value={params.name} onChange={c=>{
                setParams({
                    ...params,
                    name:c.target.value
                })
            }}/>

            <select value={params.personId} onChange={c=>setParams({
                ...params,
                personId:c.target.value
            }) }>

                <option value=''>负责人</option>
                {users.map(user=>{
                    return <option key={user.id} value={user.id}>{user.name}</option>
                })}    
           </select>
        </form>
    )
}