import React from 'react';
import { ProjectListScreen } from 'screens/project-list';
import { useAuth } from 'context/auth-context';
import {Row} from './components/lib';
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';


export const AuthenticatedApp = () => {
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
    return (
        <div>
            <Header between={true}>
                <HeaderLeft gap = {true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
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
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
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