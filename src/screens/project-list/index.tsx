import { SearchPanel } from 'screens/project-list/search-panel'
import { List } from 'screens/project-list/list'
import React, { useState, useEffect } from 'react'
import { useMount, cleanObject, useDebounce } from 'utils'
import { useHttp } from './http'
import styled from '@emotion/styled'

// import * as qs from "qs"

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: "",
        personId: ""
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const debounceparams = useDebounce(params, 200)
    const client = useHttp()
    useEffect(() => {
        client('projects', { data: cleanObject(debounceparams) }).then(setList)
    }, [debounceparams])
    useMount(() => {
        client('users').then(setUsers)
    })
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel params={params} setParams={setParams} users={users} />
            <List list={list} users={users} />
        </Container>
    )


}

const Container = styled.div`
    padding: 3.2rem;
`