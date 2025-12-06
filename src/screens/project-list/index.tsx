import { SearchPanel } from 'screens/project-list/search-panel'
import { List } from 'screens/project-list/list'
import { useState } from 'react'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'


// import * as qs from "qs"

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: "",
        personId: ""
    })
   

    const debouncedParams = useDebounce(params, 200)

    const { isLoading, error, data: list} = useProjects(debouncedParams)
    const {data: users}:any = useUsers()
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel params={params} setParams={setParams} users={users || []} />
            {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )


}

const Container = styled.div`
    padding: 3.2rem;
`