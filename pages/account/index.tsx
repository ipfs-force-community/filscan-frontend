import React, { useEffect, useMemo, useState } from 'react';
import { Translation } from '@/components/hooks/Translation';
import { account_manager } from '@/contents/account';
import useHash from '@/components/hooks/useHash';


const Account: React.FC = () => {
    const { tr } = Translation({ ns: 'account' });
    const hash = useHash();
    const rootSubmenuKeys:Array<string> = [];

  const [selectedKey,setSelectKey] = useState('')

  useEffect(() => {
        if (hash) { 
             setSelectKey(hash)
        }
     },[hash])


    function getChildren(arr: Array<any>) { 
        return arr.map(v => { 
            return {...v,label:tr(v.label)}
        })
    }
  const menuData = useMemo(() => { 
    let itemsArr:any = [];
      account_manager.forEach(item => { 
        rootSubmenuKeys.push(item.key);
        let others = []
        const obj = { ...item, label: item.label};
        delete obj.children
        if (item?.children) {
          others = getChildren(item?.children || [])
            itemsArr.push({ ...obj })
            itemsArr.push(...others)
        } else { 
          itemsArr.push({ ...obj })
        }
      })
    return itemsArr
  },[])
    


    
    return ( 
        <div className='main_contain !py-6 '>
          <div className='flex bg-bgColor rounded-xl border border-border '>
            <div className='w-[210px] border-r border-border  py-10'>
            <p className='w-full px-5 mb-10 font-semibold font-PingFang	'>{tr('account_title')}</p>
            <ul className="list-none px-4">
            {menuData.map((parent: any) => { 
              return <li key={parent.label}
                className={`cursor-pointer  flex gap-x-2 items-center p-2.5 rounded-[5px] hover:text-primary ${parent?.icon ? 'font-medium' : 'ml-5 font-normal'} ${selectedKey === parent.key ? 'text-primary bg-bg_hover' : ''}`}
                onClick={() => { setSelectKey(parent.key)}} 
              >
                    { parent.icon}
                    {tr(parent.label)}
                </li>
            })}
          </ul> 
            </div> 
          <div className='px-5 py-10'>
             <p className='w-full px-5 mb-10 font-semibold font-PingFang	'>DashBoard</p>
            
          </div>
        </div>
      </div>
     
  );
};

export default Account;  //已登录/注册