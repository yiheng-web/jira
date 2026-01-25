import { useMemo } from "react";
import { useProject } from "utils/project";
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

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams()
    return ['projects', params]
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))
    const open = () => setProjectCreate({projectCreate: true})
    const close = () => {
        setProjectCreate({projectCreate: undefined});
        setEditingProjectId({editingProjectId: undefined});
    }
    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}