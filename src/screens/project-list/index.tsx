import { SearchPanel } from 'screens/project-list/search-panel'
import { List } from 'screens/project-list/list'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography, Row, Button } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectsSearchParams } from './util'

// import * as qs from "qs"

export const ProjectListScreen = (props:{setProjectModalOpen: (isOpen:boolean)=>void}) => {
    
    const [params, setParams] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry} = useProjects(useDebounce(params, 200))
    const {data: users}:any = useUsers()
    useDocumentTitle("项目列表",false)
    return (
        <Container>
            <Row justify={'space-between'}>
                <h1>项目列表</h1>
                <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
            </Row>
            <SearchPanel params={params} setParams={setParams} users={users || []} />
            {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
            <List 
                setProjectModalOpen={props.setProjectModalOpen}
                refresh={retry} 
                loading={isLoading} 
                dataSource={list || []} users={users || []} />
        </Container>
    )


}


const Container = styled.div`
    padding: 3.2rem;
`