import { doc } from 'prettier';
import {useState,useEffect, useRef} from 'react'

export const isFalsy = (value:unknown) => {return value === 0 ? false : !value};
export const isVoid = (value:unknown)=> value === undefined || value === null || value === '';
export const cleanObject = (obj:Record<string,unknown>) => {
    const result:any = {...obj}
    Object.keys(result).forEach((key)=>{
        const value = result[key]
        if(isVoid(value)){
            delete result[key]
        }
    });
    return result
};

export const useMount = (callback:Function) =>{
    useEffect(() => {
        callback()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}

export const useDebounce = <V>(value:V,delay?:number)=>{
    const [debouncedValue,setDebouncedValue] = useState(value)
    useEffect(()=>{
        const timeout = setTimeout(()=>
            setDebouncedValue(value)
        ,delay)
        return ()=>{clearTimeout(timeout)}
    },[value,delay])
    return debouncedValue
}

export const useDocumentTitle = (title:string, keepOnUnmount:boolean = true)=>{
    const oldTitle = useRef(document.title).current
    //页面加载时：旧title:jira
    //加载后：新title
    useEffect(()=>{
        document.title = title

    },[title])

    useEffect(()=>{
     return ()=>{   
        if(!keepOnUnmount){
            //如果不指定依赖，读到的就是旧title
            //指定依赖后，读到的就是新title
            document.title = oldTitle
        }
    }
    },[keepOnUnmount,oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin