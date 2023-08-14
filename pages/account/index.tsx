import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Translation } from '@/components/hooks/Translation';
import { account_manager } from '@/contents/account';
import { Menu } from 'antd'
import useHash from '@/components/hooks/useHash';
import { spawn } from 'child_process';
// import Menu from '@/components/menu'

type MenuItem = Required<MenuProps>['items'][number];





// submenu keys of first level


const Account: React.FC = () => {
    const { tr } = Translation({ ns: 'account' });
    const hash = useHash();
    const rootSubmenuKeys:Array<string> = [];

    const [openKeys, setOpenKeys] = useState(['']);

  useEffect(() => {
      console.log('==33',hash)
        if (hash) { 
             setOpenKeys([hash])
        }

     },[hash])


    function getChildren(arr: Array<any>) { 
        return arr.map(v => { 
            return {...v,label:tr(v.label),icon:<span />}
        })
    }
      const items: any = [];
      account_manager.forEach(item => { 
        rootSubmenuKeys.push(item.key);
        let others = []
        const obj = { ...item, label: <span className='text-font font-medium'>{ tr(item.label) }</span> };
        delete obj.children
        if (item?.children) {
          others = getChildren(item?.children || [])
            items.push({ ...obj })
            items.push(...others)
        } else { 
          items.push({ ...obj })
        }
    })

  console.log('===333',items)



    
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

    
    return ( 
        <div className='main_contain py-6 '>
            <div className='bg-bgColor rounded-xl border border-border '>
            <div className='w-[210px] border-r border-border  py-10'>
                <p className='w-full px-5 mb-10 font-semibold font-PingFang	'>{tr('account_title')}</p>
                <Menu
                className='custom_menu !w-[210px] !p-0 !m-0'
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: 256 }}
                items={items}
                />     
           
            </div> 
        </div>
      </div>
    
  );
};

export default Account;  //已登录/注册