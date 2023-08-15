import { getSvgIcon } from '@/svgsIcon';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from './type';


export const logTabs = [
    {
        title: 'password_login',
        dataIndex: 'login',
    },
     {
        title: 'verification_code',
        dataIndex: 'code'
    }
]

export const login_list = (type: string) => { 
    const arr =[{
        label: 'email',
        name: 'email',
        prefix: <UserOutlined className="site-form-item-icon" />,
        placeholder:'email_placeholder',
        rules:[{ required: true, message: '${email} is required' }]
    },]
    if (type === 'code') { 
        return [...arr,
        {
        label: 'code',
        name: 'code',
        placeholder:'code_placeholder',
        prefix:<LockOutlined className="site-form-item-icon" />,
        rules:[{ required: true, message: '${code} is required' }]
    }]
    }

    return [...arr, 
     {
        label: 'password',
        name: 'password',
        placeholder:'password_placeholder',
        prefix:<LockOutlined className="site-form-item-icon" />,
        rules:[{ required: true, message: '${password} is required' }]
    },]
}


export const registerList = [
    {
        label: 'email',
        name: 'email',
        prefix: <UserOutlined className="site-form-item-icon" />,
        placeholder:'email_placeholder',
       rules:[
          {
            type: 'email',
            required: true,
            message: 'email_rules',
          },
          {
            required: true,
            message: 'email_required',
          },
        ]
    },
     {
        label: 'code',
        name: 'code',
        placeholder:'code_placeholder',
        prefix:<LockOutlined className="site-form-item-icon" />,
        rules:[{ required: true, message: '${password} is required' }]
    },
     {
        label: 'password',
        name: 'new_password',
        placeholder:'new_password',
        prefix:<LockOutlined className="site-form-item-icon" />,
        rules:[{ required: true, message: '${password} is required' }]
    },
      {
        label: 'password',
        name: 'confirm_password',
        placeholder:'confirm_password',
        prefix:<LockOutlined className="site-form-item-icon" />,
        rules:[{ required: true, message: '${password} is required' }]
    }

]




export const account_manager: Array<MenuItem> = [
    {
        label: 'overview',
        icon:getSvgIcon('account_overview'),
        href: 'overview',
        key:'overview',
        children: [
            {
                label: 'overview_power', //算力概览
                key:'overview_power'
            },
            {
                label: 'overview_gas', //gas 消耗
                key:'overview_gas'
            },
            {
                label: 'overview_expired', //到期扇区
                key:'overview_expired'
            },
            {
                label: 'overview_reward', //出块奖励
                key:'overview_reward'
            },
            {
                label: 'overview_lucky', //幸运值
                key:'overview_lucky'
            },
            {
                label: 'overview_balance', //地址余额
                key:'overview_balance'
            },
        ]
        
    },
     {
        label: 'miners',
         icon: getSvgIcon('account_miners'),
         key:'miners',
        href: 'miners', 
    },
    {
        label: 'personal',
        icon: getSvgIcon('account_personal'),
        key:'personal',
        href: 'personal',
    },
    {
        label: 'logout',
        icon:getSvgIcon('account_logout'),
        href: '',
        key:'logout',
        
    },

]