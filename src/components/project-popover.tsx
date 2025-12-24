import styled from "@emotion/styled"
import { Popover,  Typography, List, Divider, Button} from "antd"
import { useProjects } from "utils/project"

export const ProjectPopover = (props:{projectButton: React.ReactNode}) => {
    const {data: projects, isLoading} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map(project=><List.Item key={project.id}>
                    {/* <a href={`#/projects/${project.id}/board`}>{project.name}</a> */}
                    <List.Item.Meta title={project.name} />
                </List.Item>)}
            </List>
            <Divider/>
            {props.projectButton}
        </ContentContainer>
    )
    return <Popover placement={"bottom"} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`