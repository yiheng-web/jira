import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import {Row} from './components/lib';
import styled from '@emotion/styled';
export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return (
        <div>
            <Header between={true}>
                <HeaderLeft gap = {true}>
                    <h2>Jira</h2>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <button onClick={logout}>登出</button>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </div>
    )
}
const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`

const Header = styled(Row)`
`
const HeaderItem = styled.h3`
margin-right: 3rem;
`
const HeaderLeft = styled(Row)`

`
const HeaderRight = styled.div`
`
const Main = styled.main`
grid-area: main;
height: calc(100vh - 6rem);
`