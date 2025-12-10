import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { ProjectScreen } from 'screens/project';
import { useAuth } from 'context/auth-context';
import {Row} from './components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { resetRoute } from 'utils';

export const AuthenticatedApp = () => {
    
    return (
        <div>
            <PageHeader/>
            <Main>
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen/>}></Route>
                        <Route path={'/projects/:projectid/*'} element={<ProjectScreen/>}></Route>
                        <Route path='/' element={<Navigate to={'/projects'}/>}/>
                    </Routes>
                </Router>
            </Main>
        </div>
    )
}

const PageHeader = () => {
    const { logout, user } = useAuth();
    const items: MenuProps['items'] = [
    {
        key: 'logout',
        danger: true,
        label:(
            <Button type="link" onClick={logout}>登出</Button>
        )
    }
]
    return <Header between={true}>
                <HeaderLeft gap = {true}>
                    <Button type={'link'} onClick={resetRoute}>
                        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                    </Button>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown menu={{items}}>
                         <Button type={"link"} onClick={(e) => e.preventDefault()}>
                            <Space>
                                Hi, {user?.name}
                            </Space>
                        </Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
}
// const Container = styled.div`
// display: grid;
// grid-template-rows: 6rem 1fr 6rem;
// height: 100vh;
// `

const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`
// const HeaderItem = styled.h3`
// margin-right: 3rem;
// `
const HeaderLeft = styled(Row)`

`
const HeaderRight = styled.div`
`
const Main = styled.main`
grid-area: main;
height: calc(100vh - 6rem);
`