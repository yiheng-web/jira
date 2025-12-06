import { useAsync } from './use-async'
import type {Project} from 'screens/project-list/list'
import {useEffect} from 'react'
import { cleanObject, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    
    const {run, ...result} = useAsync<Project[]>()
    useEffect(() => {
            run(client('projects', { data: cleanObject(param || {}) }))         
        }, [param])

    return result
}