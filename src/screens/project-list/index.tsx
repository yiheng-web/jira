import { SearchPanel } from 'screens/project-list/search-panel'
import { List } from 'screens/project-list/list'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectsSearchParams } from './util'

// import * as qs from "qs"

export const ProjectListScreen = () => {
    
    const [params, setParams] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry} = useProjects(useDebounce(params, 200))
    const {data: users}:any = useUsers()
    useDocumentTitle("项目列表",false)
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel params={params} setParams={setParams} users={users || []} />
            {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
            <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )


}


const Container = styled.div`
    padding: 3.2rem;
`