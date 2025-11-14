import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000"
interface config extends RequestInit {
    data?: string
    token?: string
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig//写在后面会覆盖前面的值，如果里面有method则会覆盖掉前面的
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    //axios和fetch表现不一样，axios在状态码不为2xx时候直接抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()//主要作用就是将响应主体中的数据解析为 JavaScript 对象。
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }//此处加catch只要在网络异常情况下才会捕获，返回只要有sattus只要有就不报错
        })
}

export const useHttp = () => {
    const { user } = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}