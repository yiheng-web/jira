export  interface User {
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
}
interface SearchPanelProps {
    users:User[],
    param: {
        name:string;
        personId:string;
    },
    setParam:(param:SearchPanelProps['param'])=>void
}
export const SearchPanel = ({param,setParam,users}:SearchPanelProps) => {
    return (
        <form action="">
             {/* setParam(Object.assign({},param,{name:evt.target.value})) */}
            <input type="text"  value={param.name} onChange={c=>{
                setParam({
                    ...param,
                    name:c.target.value
                })
            }}/>
            <select value={param.personId} onChange={c => setParam({
                ...param,
                personId:c.target.value
            })}>
                <option value="">负责人</option>
                {/* ✅ 只改这一行 */}
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </form>
    )
}