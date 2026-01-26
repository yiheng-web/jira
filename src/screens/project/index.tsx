import {Link} from'react-router-dom'
import {Route, Routes,Navigate} from "react-router";
import {KanbanScreen} from "screens/kanban";
import {EpicScreen} from "screens/epic";
export const ProjectScreen = () => {
    return (
        <div>
            <h1>Project Screen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务栏</Link>
                <Routes>
                    <Route path={'/kanban'} element={<KanbanScreen/>}/>
                    <Route path={'/epic'} element={<EpicScreen/>}/>
                    <Route path={'/'} element={<Navigate to={'kanban'} replace/>}/>
                </Routes>
                
        </div>
    )
}