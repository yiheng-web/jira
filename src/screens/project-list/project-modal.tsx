import { Drawer, Button } from "antd"

export const ProjectModal = (props: {onOpen: boolean, onClose: () => void}) => {
    return <Drawer
            open={props.onOpen}
            onClose={props.onClose}
            width={'100%'}
            >
                项目创建和编辑的弹窗
                <Button onClick={props.onClose}>关闭</Button>
            </Drawer>
}