import React from 'react'
import {Users} from './search-panel'
interface Project {
    id: string,
    name: string,
    personId: string,
    pin: boolean,
    organization: string,
}

interface ListProps {
    list: Project[],
    users: Users[],
}

export const List = ({list,users}: ListProps)=>{
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人·</th>
                </tr>
            </thead>
            <tbody>
                {list.map(project=>(
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{users.find(user=> Number(user.id) === Number(project.id))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}