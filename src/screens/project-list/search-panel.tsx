import { Input, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";


export interface Users{
    id:number;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string;
}
interface SearchParams{
    params: Partial<Pick<Project,'name'|'personId'>>;
    users:Users[];
    setParams:(params:SearchParams['params'])=>void;
}



export const SearchPanel = ({params,setParams,users}:SearchParams) => {
    return (
        <Form style={{marginBottom:'2rem'}} layout={"inline"}>
            <Form.Item>
                <Input 
                    placeholder="项目名称" 
                    type="text"  
                    value={params.name} 
                    onChange={c=>{
                    setParams({
                        ...params,
                        name:c.target.value
                    })
                }}/>
            </Form.Item>
            
            <Form.Item>
                <UserSelect 
                    defaultOptionName={"负责人"}
                    value={params.personId} 
                    onChange={(value : number | undefined)=>setParams({
                        ...params,
                        personId:value
                    })}/>
                
            </Form.Item>
            
        </Form>
    )
}