import { LockOutlined, UserOutlined } from '@ant-design/icons';


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