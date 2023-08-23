/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from './type';
import Link from 'next/link';
import TagInput from '@/packages/tagInput';
import { formatFilNum, formatNumber, unitConversion } from '@/utils';

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

/*
24h幸运值：近24h的幸运值



7天幸运值：近7天的幸运值



30天幸运值：近30天的幸运值



1年幸运值：近1年的幸运值*/
export const account_lucky = {
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      width: '20%',
      fixed: 'left',

      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
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
      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
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
    {
      title: 'miner_balance',
      dataIndex: 'miner_balance',
      exports: ['miner_balance_changed'],
      amountUnit: {
        miner_balance_changed: { unit: 'fil', number: 2 },
        miner_balance: { unit: 'fil', number: 2 },
      },

      width: 200,
      render: (text: string, record: any) => {
        const changeText = record?.miner_balance_changed
          ? Number(record.miner_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'owner_balance',
      dataIndex: 'owner_balance',
      width: 200,
      exports: ['Owner_balance_changed'],
      amountUnit: {
        owner_balance: { unit: 'fil', number: 2 },
        Owner_balance_changed: { unit: 'fil', number: 2 },
      },

      render: (text: string, record: any) => {
        const changeText = record?.Owner_balance_changed
          ? Number(record.Owner_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'worker_balance',
      dataIndex: 'worker_balance',
      width: 200,
      exports: ['Worker_balance_changed'],

      amountUnit: {
        worker_balance: { unit: 'fil', number: 2 },
        Worker_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.Worker_balance_changed
          ? Number(record.Worker_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'controller_0_balance',
      dataIndex: 'controller_0_balance',
      width: 200,
      exports: ['Controller_0_balance_changed'],
      amountUnit: {
        controller_0_balance: { unit: 'fil', number: 2 },
        Controller_0_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.Controller_0_balance_changed
          ? Number(record.Controller_0_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'controller_1_balance',
      dataIndex: 'controller_1_balance',
      width: 200,
      exports: ['controller_1_balance_changed'],

      amountUnit: {
        controller_1_balance: { unit: 'fil', number: 2 },
        controller_1_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.controller_1_balance_changed
          ? Number(record.controller_1_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'controller_2_balance',
      dataIndex: 'controller_2_balance_changed',
      width: 200,
      exports: ['controller_2_balance_changed'],
      amountUnit: {
        controller_2_balance: { unit: 'fil', number: 2 },
        controller_2_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.controller_2_balance_changed
          ? Number(record.controller_2_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'beneficiary_balance',
      dataIndex: 'beneficiary_balance',
      width: 200,
      exports: ['beneficiary_balance_changed'],
      amountUnit: {
        beneficiary_balance: { unit: 'fil', number: 2 },
        beneficiary_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.beneficiary_balance_changed
          ? Number(record.beneficiary_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
    {
      title: 'market_balance',
      dataIndex: 'market_balance',
      width: 200,
      exports: ['market_balance_changed'],
      amountUnit: {
        market_balance: { unit: 'fil', number: 2 },
        market_balance_changed: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.market_balance_changed
          ? Number(record.market_balance_changed)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span className='flex flex-col'>
            <span>{formatFilNum(text, false, false, 2)}</span>
            <span className={`${className}`}>
              {flag + formatFilNum(changeText, false, false, 2)}
            </span>
          </span>
        );
      },
    },
  ],
};
export const account_reward = {
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      width: '20%',
      fixed: 'left',
      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
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
    { title: 'block_count', dataIndex: 'block_count', width: '10%' },
    { title: 'win_count', dataIndex: 'win_count', width: '10%' },
    { title: 'block_reward', dataIndex: 'block_reward', width: '10%' },
    { title: 'total_reward', dataIndex: 'total_reward', width: '15%' },
  ],
};
export const account_power = {
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      fixed: 'left',
      width: 100,
      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
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
    {
      title: 'quality_power',
      dataIndex: 'quality_power',
      amountUnit: {
        quality_power: { unit: 'power', number: 2 },
      },
      width: 200,
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'raw_power',
      dataIndex: 'raw_power',
      width: 200,
      amountUnit: {
        raw_power: { unit: 'power', number: 2 },
      },
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'dc_power',
      dataIndex: 'dc_power',
      width: 200,
      amountUnit: {
        dc_power: { unit: 'power', number: 2 },
      },
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'cc_power',
      dataIndex: 'cc_power',
      width: 200,
      amountUnit: {
        cc_power: { unit: 'power', number: 2 },
      },
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'sector_size',
      dataIndex: 'sector_size',
      width: 200,
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'sector_power_change',
      dataIndex: 'sector_power_change',
      exports: ['sector_count_change'],
      amountUnit: {
        sector_power_change: { unit: 'power', number: 2 },
      },
      width: 200,
      render: (text: any, record: any) => {
        const changeText = record.sector_count_change
          ? Number(record.sector_count_change)
          : record.sector_count_change;
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span>
            <span className={className}>
              {flag}
              {changeText}
            </span>
            <span>/{unitConversion(text, 2)}</span>
          </span>
        );
      },
    },
  ],
};

export const account_gas = {
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      fixed: 'left',
      width: 100,
      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
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
    {
      title: 'sector_power_change',
      dataIndex: 'sector_count_change',
      exports: ['sector_count_change'],
      amountUnit: {
        sector_power_change: { unit: 'power', number: 2 },
      },
      width: 200,
      render: (text: any, record: any) => {
        const changeText = record.sector_count_change
          ? Number(record.sector_count_change)
          : record.sector_count_change;
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return (
          <span>
            <span className={className}>
              {flag}
              {changeText}
            </span>
            <span>/{unitConversion(text, 2)}</span>
          </span>
        );
      },
    },
    {
      title: 'total_gas_cost',
      dataIndex: 'total_gas_cost',
      width: 200,
      amountUnit: {
        total_gas_cost: { unit: 'fil', number: 4 },
      },
      render: (text: any) => formatFilNum(text, false, false, 2),
    },
    {
      title: 'seal_gas_per_t',
      dataIndex: 'seal_gas_per_t',
      width: 200,
      amountUnit: {
        total_gas_cost: { unit: 'fil/T', number: 4 },
      },
      render: (text: any) => formatFilNum(text, false, false, 2) + '/T',
    },
    {
      title: 'deal_gas_cost',
      dataIndex: 'deal_gas_cost',
      width: 200,
      amountUnit: {
        deal_gas_cost: { unit: 'fil', number: 4 },
      },
      render: (text: any) => formatFilNum(text, false, false, 2),
    },
    {
      title: 'wd_post_gas_cost',
      dataIndex: 'wd_post_gas_cost',
      width: 200,
      amountUnit: {
        wd_post_gas_cost: { unit: 'fil', number: 4 },
      },
      render: (text: any) => formatFilNum(text, false, false, 2),
    },
    {
      title: 'wd_post_gas_per_t',
      dataIndex: 'wd_post_gas_per_t',
      width: 200,
      amountUnit: {
        wd_post_gas_per_t: { unit: 'fil/T', number: 4 },
      },
      render: (text: any) => formatFilNum(text, false, false, 2) + '/T',
    },
  ],
};

export const account_expired = {
  headerList: [
    {
      title: 'exp_month',
      dataIndex: 'exp_month',
      width: '20%',
      render: (text: string, record: any, tr: any) => {
        const [year, month] = text.split('-');
        return <span>{tr('exp_month', { year, month })}</span>;
      },
    },
    {
      title: 'miner_count',
      dataIndex: 'total_miner_count',
      width: '20%',
      render: (text: string | number) => formatNumber(text),
    },
    {
      title: 'exp_power',
      dataIndex: 'total_exp_power',
      width: '15%',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'sector_count',
      dataIndex: 'total_exp_sector_count',
      width: '15%',
      render: (text: string | number) => formatNumber(text),
    },
    {
      title: 'exp_dc',
      dataIndex: 'total_exp_dc',
      width: '15%',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'exp_pledge',
      dataIndex: 'total_exp_pledge',
      width: '15%',
      render: (text: string | number) => formatFilNum(text, false, false, 4),
    },
  ],
  columns: [
    {
      title: 'tag',
      dataIndex: 'tag',
      width: '15%',
      render: (text: string, record: any) => {
        return <TagInput text={text} record={record} />;
      },
    },
    {
      title: 'miner_id',
      dataIndex: 'miner_id',
      width: '10%',
      render: (text: string) => (
        <Link href={`/account#expired?miner=${text}`} className='link_text'>
          {text}
        </Link>
      ),
    },
    {
      title: 'group_name',
      dataIndex: 'group_name',
      width: '15%',
    },
    {
      title: 'exp_power',
      dataIndex: 'exp_power',
      width: '15%',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'sector_count',
      dataIndex: 'exp_sector_count',
      width: '15%',
      render: (text: string | number) => formatNumber(text),
    },
    {
      title: 'exp_dc',
      dataIndex: 'exp_dc',
      width: '15%',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'exp_pledge',
      dataIndex: 'exp_pledge',
      width: '15%',
      render: (text: string | number) => formatFilNum(text, false, false, 4),
    },
  ],
};
