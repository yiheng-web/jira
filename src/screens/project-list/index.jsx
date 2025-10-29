import {SearchPanel} from 'screens/project-list/search-panel'
import {List} from 'screens/project-list/list'
import { useState,useEffect } from 'react'
import {useMount,cleanObject,useDebounce} from 'utils'
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const ProjectListScreen = () => {
const [params, setParams] =useState({
    name:"",
    personId:""
})
const [list, setList] = useState([])
const [users, setUsers] = useState([])
const debounceparams = useDebounce(params,500)
useEffect(()=>{
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceparams))}`)
    .then(
        async (res)=>{
            if(res.ok){
                setList(await res.json())
            }
        }
    )
},[debounceparams])
useMount(()=>{
    fetch(`${apiUrl}/users`).then(
        async (res)=>{
            if(res.ok){
                setUsers(await res.json())
            }
        }
    )
})
return (
    <div>
        <SearchPanel params={params} setParams={setParams} users={users}  />
        <List list={list} users={users}/>
    </div>
)


}