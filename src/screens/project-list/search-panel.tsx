import { Input, Select } from "antd";
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
            <Input type="text"  value={params.name} onChange={c=>{
                setParams({
                    ...params,
                    name:c.target.value
                })
            }}/>

            <Select value={params.personId} onChange={value=>setParams({
                ...params,
                 personId:value
            }) }>

                <Select.Option value=''>负责人</Select.Option>
                {users.map(user=>{
                    return <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                })}    
           </Select>
        </form>
    )
}