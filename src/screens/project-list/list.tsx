import React from 'react'
import {Users} from './search-panel'
import { Dropdown, Table, TableProps, Button, MenuProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
export type Project ={
    id: number,
    name: string,
    personId: number,
    pin: boolean,
    organization: string,
    created: number
}

interface ListProps extends TableProps<Project> {
    users: Users[],
    refresh?: ()=>void
}

export const List = ({users,...props}: ListProps,)=>{
    const {mutate} = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => {
                mutate({id, pin}).then(props.refresh)
    }
    const items: MenuProps['items'] = [
        {
            key: 'edit',
            label:(
                <Button type="link">编辑</Button>
            )
        }
    ]
    return (
        <Table 
        pagination={false}  
        rowKey="id"
        columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(value, project) {
                return <Pin 
                         checked={project.pin}
                         onCheckedChange={pinProject(project.id)}
                         />
            }
        },
        {
            title: '名称',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },
        {
            title: '部门',
            dataIndex: 'organization',
        },
        {
            title: '负责人',
            render(value, project) {
                return (
                <span>               
                    {users.find((user:Users) => Number(user.id) === Number(project.personId))?.name || '未知'}
                </span>
                )
            }
        },
        {
            title: '创建时间',
            key: 'created',
            render(value, project){
                return (
                    <span>
                        {project.created? dayjs(project.created).format('YYYY-MM-DD'):'无'}
                    </span>
                )
            }
        },
        {
            render(value, project){
                return (
                <Dropdown menu={{items}}>
                    <Button style={{padding:0}} type={'link'}>...</Button>
                </Dropdown>
            )       
        }
        }]}
    {...props}/>
        
    )
}