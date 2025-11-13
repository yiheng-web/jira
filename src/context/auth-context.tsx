import React,{ useState, ReactNode } from "react";
import * as auth from "auth-provider"
import {Users} from "screens/project-list/search-panel"

interface AuthForm {
    username:string,
    password:string
}
const AuthContext = React.createContext<{
    user:Users | null,
    login:(form:AuthForm) => Promise<void>,
    register:(form:AuthForm) => Promise<void>,
    logout:()=>Promise<void>
} | undefined>(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState<Users | null>(null)

    //point free
    const login = (form:AuthForm) => {
       return auth.login(form).then(setUser)
    }
    const register = (form:AuthForm) => {
        return auth.register(form).then(setUser)
    }
    const logout = () => auth.logout().then(user => setUser(null))
    return (
        <AuthContext.Provider children={children} value={{user,login,register,logout}}/>
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
