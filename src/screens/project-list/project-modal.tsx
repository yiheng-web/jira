import { Drawer, Button } from "antd"
import { useProjectModal } from "./util"

export const ProjectModal = () => {
    const {projectModalOpen, close} = useProjectModal()
    return <Drawer
            open={projectModalOpen}
            onClose={close}
            width={'100%'}
            >
                项目创建和编辑的弹窗
                <Button onClick={close}>关闭</Button>
            </Drawer>
}