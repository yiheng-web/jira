import {useState,useEffect} from 'react'

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