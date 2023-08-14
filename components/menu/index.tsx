import { account_manager } from "@/contents/account"
import { Translation } from "../hooks/Translation";
import { MenuItem } from "@/contents/type";
import { useState } from "react";

export default ({ data, ns }: {data:Array<MenuItem>,ns:string}) => { 
    const { tr } = Translation({ ns });
    const [selectOpen, setSelectOpen] = useState('')

    const renderChildren = (children: Array<any>) => { 
        if (Array.isArray(children)) { 
             return   children.map(child => { 
                    return <li className="p-2.5 ml-5 hover:bg-bg_hover hover:text-primary"  key={child.label}>{ tr(child.label)}</li>
            })
        }

    }

    const handleClick = (key: string) => { 
       
         setSelectOpen(selectOpen === key? '':key)
       

    }

    return <ul className="list-none ">
        {data.map((parent:MenuItem) => { 
            return <li key={parent.label} className="cursor-pointer " onClick={()=>handleClick(parent.key)}>
                <span className="flex gap-x-2 items-center p-2.5  hover:bg-bg_hover hover:text-primary ">
                { parent.icon}
                 {tr(parent.label)}
                </span>
                {parent.children && <ul className={`${selectOpen === parent.key ? 'block':'hidden'}`}>
                    { renderChildren(parent.children)}
                </ul>}
            </li>
        })}
    </ul>
}