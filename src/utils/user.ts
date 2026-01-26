import { useEffect } from "react";
import { useHttp } from "./http"
import { useAsync } from "./use-async";
import { cleanObject } from "utils";
import { Users } from "types/user";

export const useUsers = (param?: Partial<Users>) =>{
    const client = useHttp();
    const {run, ...result} = useAsync<Users[]>();
    useEffect(()=>{
        run(client('users', {data:cleanObject(param || {})}))
    }, [param])
    return result;
}