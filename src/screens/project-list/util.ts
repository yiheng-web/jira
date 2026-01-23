import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
//项目列表搜索参数
export const useProjectsSearchParams = () => {
    const [params, setParams] = useUrlQueryParam(['name','personId'])
    return [
        useMemo(()=>{
            return {...params, personId: Number(params.personId) || undefined}
        },[params])
        , setParams] as const
}; 

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])

    const open = () => setProjectCreate({projectCreate: true})
    const close = () => setProjectCreate({projectCreate: ''})

    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}