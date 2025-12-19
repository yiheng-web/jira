import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { cleanObject } from "./index"

export const useUrlQueryParam = <K extends string>(keys:K[])=>{
    const [searchParams, setSearchParams] = useSearchParams()
    return [
        useMemo(
            ()=>keys.reduce(
            (prev:{[key in K]: string},key:K)=>{
            return {...prev,[key]: searchParams.get(key) || ''}
            },{} as {[key in K]: string}),
            [searchParams]),
    (params: Partial<{[key in K]: unknown}>)=>{
        const o = cleanObject( {...Object.fromEntries(searchParams), ...params})
        return setSearchParams(o)
    }
] as const
}   