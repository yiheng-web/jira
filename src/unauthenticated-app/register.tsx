import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
import {Form, Button, Input} from 'antd'
import { LongButton } from 'unauthenticated-app'

export const RegisterScreen = () => {
    const { register, user } = useAuth()
    const handleSubmit = (values: { username: string, password: string }) => {
        register(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            {/* {
                user ? <div>
                    登录成功，用户名：{user?.name}
                    token:{user.token}
                </div> : null
            } */}
            <Form.Item name={"username"} rules={[{required:true, message:'请输入用户名'}]}>
                <Input id={"username"} placeholder='用户名' />
            </Form.Item>
            <Form.Item name={"password"} rules={[{required:true, message:'请输入密码'}]}>
                <Input id={"password"}  placeholder='密码' />
            </Form.Item>
            <Form.Item>
                <LongButton type="primary" htmlType="submit">注册</LongButton>
            </Form.Item>
        </Form>
    )
}