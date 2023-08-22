/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from './type';
import Link from 'next/link';

export const logTabs = [
  {
    title: 'password_login',
    dataIndex: 'login',
  },
  {
    title: 'verification_code',
    dataIndex: 'code',
  },
];

export const login_list = (type: string) => {
  const arr = [
    {
      label: 'email',
      name: 'email',
      prefix: <UserOutlined className='site-form-item-icon' />,
      placeholder: 'email_placeholder',
      rules: [{ required: true, message: '${email} is required' }],
    },
  ];
  if (type === 'code') {
    return [
      ...arr,
      {
        label: 'code',
        name: 'code',
        placeholder: 'code_placeholder',
        prefix: <LockOutlined className='site-form-item-icon' />,
        rules: [{ required: true, message: '${code} is required' }],
      },
    ];
  }

  return [
    ...arr,
    {
      label: 'password',
      name: 'password',
      placeholder: 'password_placeholder',
      prefix: <LockOutlined className='site-form-item-icon' />,
      rules: [{ required: true, message: '${password} is required' }],
    },
  ];
};

export const registerList = [
  {
    label: 'email',
    name: 'email',
    prefix: <UserOutlined className='site-form-item-icon' />,
    placeholder: 'email_placeholder',
    rules: [
      {
        type: 'email',
        required: true,
        message: 'email_rules',
      },
      {
        required: true,
        message: 'email_required',
      },
    ],
  },
  {
    label: 'code',
    name: 'code',
    placeholder: 'code_placeholder',
    prefix: <LockOutlined className='site-form-item-icon' />,
    rules: [{ required: true, message: '${password} is required' }],
  },
  {
    label: 'password',
    name: 'new_password',
    placeholder: 'new_password',
    prefix: <LockOutlined className='site-form-item-icon' />,
    rules: [{ required: true, message: '${password} is required' }],
  },
  {
    label: 'password',
    name: 'confirm_password',
    placeholder: 'confirm_password',
    prefix: <LockOutlined className='site-form-item-icon' />,
    rules: [{ required: true, message: '${password} is required' }],
  },
];

export const account_manager: Array<MenuItem> = [
  {
    label: 'overview',
    icon: getSvgIcon('account_overview'),
    href: 'overview',
    key: 'overview',
    children: [
      {
        label: 'overview_power', //算力概览
        key: 'power',
      },
      {
        label: 'overview_gas', //gas 消耗
        key: 'gas',
      },
      {
        label: 'overview_expired', //到期扇区
        key: 'expired',
      },
      {
        label: 'overview_reward', //出块奖励
        key: 'reward',
      },
      {
        label: 'overview_lucky', //幸运值
        key: 'lucky',
      },
      {
        label: 'overview_balance', //地址余额
        key: 'balance',
      },
    ],
  },
  {
    label: 'miners',
    icon: getSvgIcon('account_miners'),
    key: 'miners',
    href: 'miners',
  },
  {
    label: 'personal',
    icon: getSvgIcon('account_personal'),
    key: 'personal',
    href: 'personal',
  },
  {
    label: 'logout',
    icon: getSvgIcon('account_logout'),
    href: '',
    key: 'logout',
  },
];

export const personal_setting = [
  {
    title: 'personal_name',
    dataIndex: 'name',
  },
  {
    title: 'old_password',
    placeholder: 'old_placeholder',
    dataIndex: 'old_password',
    rules: [{ required: true, message: '${old_placeholder} is required' }],
  },
  {
    title: 'new_password',
    placeholder: 'new_placeholder',
    dataIndex: 'new_password',
    rules: [{ required: true, message: '${new_password} is required' }],
  },
  {
    title: 'confirm_password',
    dataIndex: 'confirm_password',
    rules: [{ required: true, message: '${confirm_password} is required' }],
  },
];

export const account_power = {
  columns: [
    {
      title: '',
      dataIndex: '',
    },
    {
      title: '',
      dataIndex: '',
    },
    {
      title: '',
      dataIndex: '',
    },
    {
      title: '',
      dataIndex: '',
    },
    {
      title: '',
      dataIndex: '',
    },
    {
      title: '',
      dataIndex: '',
    },
  ],
};

/*
24h幸运值：近24h的幸运值



7天幸运值：近7天的幸运值



30天幸运值：近30天的幸运值



1年幸运值：近1年的幸运值*/
export const account_lucky = {
  headerOptions: [
    {
      label: 'all',
      value: 'all',
    },
    {
      label: '24h_lucky',
      value: '24h',
    },
    {
      label: '7d_lucky',
      value: '7d',
    },
    {
      label: '30d_lucky',
      value: '30d',
    },
    {
      label: '1year_lucky',
      value: '1year',
    },
  ],
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      width: '20%',
      fixed: 'left',

      render: (text: string) => (
        <span className='des_bg_color  p-2  rounded-[5px]'>{text || '--'}</span>
      ),
    },
    {
      title: 'miner_id',
      dataIndex: 'miner_id',
      width: '15%',
      fixed: 'left',

      render: (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      ),
    },
    {
      title: 'group_name',
      dataIndex: 'group_name',
      fixed: 'left',
      width: '20%',
    },
    { title: '24h_lucky', dataIndex: 'lucky_rate_24h', width: '15%' },
    { title: '7d_lucky', dataIndex: 'lucky_rate_7d', width: '15%' },
    { title: '30d_lucky', dataIndex: 'lucky_rate_30d', width: '15%' },
  ],
};

export const account_balance = {
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      fixed: 'left',
      width: 100,
      render: (text: string) => (
        <span className='des_bg_color  p-2  rounded-[5px]'>{text}</span>
      ),
    },
    {
      title: 'miner_id',
      dataIndex: 'miner_id',
      width: 100,
      fixed: 'left',
      render: (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      ),
    },
    {
      title: 'group_name',
      dataIndex: 'group_name',
      width: 100,
      fixed: 'left',
    },
    { title: 'miner_balance', dataIndex: 'miner_balance', width: 200 },
    { title: 'owner_balance', dataIndex: 'owner_balance', width: 200 },
    { title: 'worker_balance', dataIndex: 'worker_balance', width: 200 },
    {
      title: 'controller_0_balance',
      dataIndex: 'controller_0_balance',
      width: 200,
    },
    {
      title: 'controller_1_balance',
      dataIndex: 'controller_1_balance',
      width: 200,
    },
    {
      title: 'controller_2_balance',
      dataIndex: 'controller_2_balance',
      width: 200,
    },
    {
      title: 'beneficiary_balance',
      dataIndex: 'beneficiary_balance',
      width: 200,
    },
    { title: 'market_balance', dataIndex: 'market_balance', width: 200 },
  ],
};
