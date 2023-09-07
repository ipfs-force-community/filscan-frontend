/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Item, MenuItem } from './type';
import Link from 'next/link';
import TagInput from '@/packages/tagInput';
import { formatDateTime, formatFil, formatFilNum, formatNumber, formatNumberPercentage, unitConversion } from '@/utils';
import Image from 'next/image';
import power from '@/assets/images/power.svg';
import pledge from '@/assets/images/pledge.svg';
import gas from '@/assets/images/gas.svg';
import reward from '@/assets/images/reward.svg';
import balance from '@/assets/images/balance.svg';

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

export const login_list = (type?: string) => {
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
      // {
      //   required: true,
      //   message: 'email_required',
      // },
      {
        type: 'email',
        required: true,
        message: 'email_rules',
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
    placeholder: 'personal_name_holder',
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
    placeholder: 'confirm_password',
    rules: [{ required: true, message: '${confirm_password} is required' }],
  },
];

export const overview = {
  headerList: [
    [
      {
        title: 'quality_power_24',
        icon: <Image src={power} width={40} height={40} alt='' />,
        dataIndex: 'sum_quality_adj_power',
        render: (text: any, record: any, tr: any) => {
          const changeText = record?.sum_power_change_24h
            ? Number(record.sum_power_change_24h)
            : '';
          const flag = changeText ? (changeText > 0 ? '+' : '') : '';
          const className = changeText
            ? changeText > 0
              ? 'text_green'
              : 'text_red'
            : '';
          const [textValue, unit] = unitConversion(text, 2).split( ' ' );
          return (
            <div className='flex w-full h-full flex-col justify-between'>
              <span className='flex flex-col'>
                <span className='text-sm text_des'>
                  {tr('quality_power_24')}
                </span>
                <span className={className}>
                  { changeText? flag + unitConversion(changeText,2) : '--'}
                </span>
              </span>
              <span className='flex items-baseline gap-x-1 text-xl font-DINPro-Bold font-semibold text_clip'>
                {textValue}
                <span className='text-sm text_color'>{unit}</span>
              </span>
            </div>
          );
        },
      },
      {
        title: 'total_reward_24',
        icon: <Image src={reward} width={40} height={40} alt='' />,
        dataIndex: 'sum_reward_change_24h',
        render: (text: any, record: any, tr: any) => {
          // const changeText = record?.sum_reward_change_24h
          //   ? Number(record.sum_reward_change_24h)
          //   : '';
          // const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
          // const className = changeText
          //   ? changeText > 0
          //     ? 'text_green'
          //     : 'text_red'
          //   : '';
          const [textValue,unit] = formatFil(text,'FIL',4,true).split(' ')
          return (
            <div className='flex w-full h-full flex-col justify-between'>
              <span className='flex flex-col'>
                <span className='text-sm text_des'>
                  {tr('total_reward_24')}
                </span>
                {/* <span className={className}>
                  {flag}
                  {changeText?formatFilNum(Math.abs(Number(changeText)), false, false, 2) : '--'}
                </span> */}
              </span>
              <span className='flex items-baseline gap-x-1 text-xl font-DINPro-Bold font-semibold text_clip'>
                {/* {flag}
                {changeText?formatFilNum(Math.abs(Number(changeText)), false, false, 2) : '--'} */}
                {textValue}
                <span className='text-sm'>{unit}</span>
              </span>
            </div>
          );
        },
      },
    ],
    [
      {
        title: 'total_out_come_gas',
        icon: <Image src={gas} width={40} height={40} alt='' />,
        dataIndex: 'sum_out_come',
        render: (text: any, record: any, tr: any) => {
          const changeText = record?.sum_gas ? Number(record.sum_gas) : '';
          const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
          const className = changeText
            ? changeText > 0
              ? 'text_green'
              : 'text_red'
            : 'text_des_unit';
          const [textValue, unit] = formatFil(text, 'FIL', 4, true).split(' ');
          return (
            <div className='flex w-full h-full flex-col justify-between'>
              <span className='flex flex-col'>
                <span className='text-sm text_des'>
                  {tr('total_out_come_gas')}
                </span>
                <span className={className}>
                  {flag}
                  {changeText?formatFil(Math.abs(Number(changeText)),'FIL', 4,true) : '--'}
                </span>
              </span>
              <span className='flex items-baseline gap-x-1 text-xl font-DINPro-Bold font-semibold text_clip'>
                {textValue}
                <span className='text-sm'>{unit}</span>
              </span>
            </div>
          );
        },
      },
      {
        title: 'pledge_amount_24',
        icon: <Image src={pledge} width={40} height={40} alt='' />,
        dataIndex: 'sum_pledge',
        render: (text: any, record: any, tr: any) => {
          const changeText = record?.sum_pledge_change_24h
            ? Number(record.sum_pledge_change_24h)
            : '';
          const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
          const className = changeText
            ? changeText > 0
              ? 'text_green'
              : 'text_red'
            : '';
          const [textValue, unit] = formatFil(text, 'FIL', 4, true).split(' ');
          return (
            <div className='flex w-full h-full flex-col justify-between'>
              <span className='flex flex-col'>
                <span className='text-sm text_des'>
                  {tr('pledge_amount_24')}
                </span>
                <span className={className}>
                  {flag}
                  {changeText?formatFil(Math.abs(Number(changeText)),'FIL', 2,true): '--'}
                </span>
              </span>
              <span className='flex items-baseline gap-x-1 text-xl font-DINPro-Bold font-semibold text_clip'>
                {textValue}
                <span className='text-sm'>{ unit}</span>
              </span>
            </div>
          );
        },
      },
      {
        title: 'balance_24',
        icon: <Image src={balance} width={40} height={40} alt='' />,
        dataIndex: 'sum_balance',
        render: (text: any, record: any, tr: any) => {
          const changeText = record?.sum_balance_change_24h
            ? Number(record.sum_balance_change_24h)
            : '';
          const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
          const className = changeText
            ? changeText > 0
              ? 'text_green'
              : 'text_red'
            : '';
          const [textValue, unit] = formatFil(text, 'FIL', 4, true).split(' ');
          return (
            <div className='flex w-full h-full flex-col justify-between'>
              <span className='flex flex-col'>
                <span className='text-sm text_des'>{tr('balance_24')}</span>
                <span className={className}>
                  {flag}
                  {changeText?formatFil(Math.abs(Number(changeText)),'FIL', 2,true): '--'}
                </span>
              </span>
              <span className='flex items-baseline gap-x-1 text-xl font-DINPro-Bold font-semibold text_clip'>
                {textValue}
                <span className='text-sm'>{ unit}</span>
              </span>
            </div>
          );
        },
      },
    ],
  ],
  columns: (tr: any) => [
    {
      title: 'tag',
      dataIndex: 'tag',
      fixed: 'left',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        return <TagInput text={text} isEdit={false} record={record} />;
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
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        const showText = record.is_default ? tr('default_group'):text
        return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
      },
    },
    {
      title: 'quality_power',
      dataIndex: 'total_quality_adj_power',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'raw_power',
      dataIndex: 'total_raw_byte_power',
      render: (text: string, record: any) => unitConversion(text, 2),
    },
    {
      title: 'total_reward_24',
      dataIndex: 'reward_change_24h',
      //  exports: ['reward_change_24h'],
      amountUnit: {
        reward_change_24h: { unit: 'fil'},
      },
      render: (text:string) => renderFil(text)
      // render: (text: string, record: any) => {
      //   const changeText = Number(record?.reward_change_24h)
      //     ? Number(record.reward_change_24h)
      //     :'';
      //   const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
      //   const className = changeText
      //     ? changeText > 0
      //       ? 'text_green'
      //       : 'text_red'
      //     : '';
      //   return renderFil(text, changeText, flag, className)

      // },
    },
    {
      title: 'total_out_come_gas',
      dataIndex: 'total_out_come',
      exports: ['total_gas'],
      amountUnit: {
        total_out_come: { unit: 'fil', number: 2 },
        total_gas: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.total_gas ? Number(record.total_gas) : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return renderFil(text, changeText, flag, className)
      },
    },
    {
      title: 'pledge_amount_24',
      dataIndex: 'total_pledge_amount',
      exports: ['pledge_change_24h'],
      amountUnit: {
        pledge_change_24h: { unit: 'fil', number: 2 },
        total_pledge_amount: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.pledge_change_24h
          ? Number(record.pledge_change_24h)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return renderFil(text, changeText, flag, className)
      },
    },
    {
      title: 'balance_24',
      dataIndex: 'total_balance',
      exports: ['balance_change_24h'],
      amountUnit: {
        balance_change_24h: { unit: 'fil', number: 2 },
        total_balance: { unit: 'fil', number: 2 },
      },
      render: (text: string, record: any) => {
        const changeText = record?.balance_change_24h
          ? Number(record.balance_change_24h)
          : '';
        const flag = changeText ? (changeText > 0 ? '+' : '-') : '';
        const className = changeText
          ? changeText > 0
            ? 'text_green'
            : 'text_red'
          : '';
        return renderFil(text, changeText, flag, className)
      },
    },
  ],
};

export const account_lucky = {
  columns: (tr: any) => [
    {
      title: 'tag',
      dataIndex: 'tag',
      width: '20%',
      fixed: 'left',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        return <TagInput isEdit={false} text={text} record={record} />;
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
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        const showText = record.is_default ? tr('default_group'):text
        return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
      },
    },
    {
      title: '24h_lucky', dataIndex: 'lucky_rate_24h', width: '15%',
      amountUnit: {
        lucky_rate_24h: { unit: '%', number: 2 },
      },
      render: (text: string | number) => text ? formatNumberPercentage(text) + '%' : text
    },
    {
      title: '7d_lucky', dataIndex: 'lucky_rate_7d', width: '15%',
      amountUnit: {
        'lucky_rate_7d': { unit: '%', number: 2 },
      },
      render: (text: string | number) => text ? formatNumberPercentage(text) + '%' : text
    },
    {
      title: '30d_lucky', dataIndex: 'lucky_rate_30d',
      amountUnit: {
        'lucky_rate_30d': { unit: '%', number: 2 },
      }, width: '15%', render: (text: string | number) => text ?formatNumberPercentage(text) + '%' : text
    },
  ],
};

export const account_balance = {
  columns: (tr: any) => [
    {
      title: 'tag',
      dataIndex: 'tag',
      fixed: 'left',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        return <TagInput isEdit={false} text={text} record={record} />;
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
      width: 150,
      fixed: 'left',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        const showText = record.is_default ? tr('default_group'):text
        return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
      },
    },
    {
      title: 'miner_balance',
      dataIndex: 'miner_balance',
      exports: ['miner_balance_changed'],
      amountUnit: {
        miner_balance_changed: { unit: 'fil', number: 2 },
        miner_balance: { unit: 'fil', number: 0 },
      },

      // width: 200,
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
        return renderFil(text,changeText,flag,className);
        //   (
        //   <span className='flex flex-col'>
        //     <span>{formatFilNum(text, false, false, 2)}</span>
        //     <span className={`${className}`}>
        //       {flag +
        //         formatFilNum(Math.abs(Number(changeText)), false, false, 2)}
        //     </span>
        //   </span>
        // );
      },
    },
    {
      title: 'owner_balance',
      dataIndex: 'owner_balance',
      // width: 200,
      exports: ['Owner_balance_changed'],
      amountUnit: {
        owner_balance: { unit: 'fil', number: 0 },
        Owner_balance_changed: { unit: 'fil', number: 0 },
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
        return renderFil(text,changeText,flag,className);

      },
    },
    {
      title: 'worker_balance',
      dataIndex: 'worker_balance',
      // width: 200,
      exports: ['Worker_balance_changed'],

      amountUnit: {
        worker_balance: { unit: 'fil'},
        Worker_balance_changed: { unit: 'fil' },
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
        return renderFil(text,changeText,flag,className);
      },
    },
    {
      title: 'controller_0_balance',
      dataIndex: 'controller_0_balance',
      // width: 200,
      exports: ['Controller_0_balance_changed'],
      amountUnit: {
        controller_0_balance: { unit: 'fil'},
        Controller_0_balance_changed: { unit: 'fil'},
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
        return renderFil(text,changeText,flag,className);
      },
    },
    {
      title: 'controller_1_balance',
      dataIndex: 'controller_1_balance',
      // width: 200,
      exports: ['controller_1_balance_changed'],

      amountUnit: {
        controller_1_balance: { unit: 'fil' },
        controller_1_balance_changed: { unit: 'fil' },
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
        return renderFil(text,changeText,flag,className);
      },
    },
    {
      title: 'controller_2_balance',
      dataIndex: 'controller_2_balance',
      // width: 200,
      exports: ['controller_2_balance_changed'],
      amountUnit: {
        controller_2_balance: { unit: 'fil', },
        controller_2_balance_changed: { unit: 'fil', },
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
        return renderFil(text,changeText,flag,className);
      },
    },
    {
      title: 'beneficiary_balance',
      dataIndex: 'beneficiary_balance',
      // width: 200,
      exports: ['beneficiary_balance_changed'],
      amountUnit: {
        beneficiary_balance: { unit: 'fil', },
        beneficiary_balance_changed: { unit: 'fil', },
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
        return renderFil(text,changeText,flag,className);
      },
    },
    {
      title: 'market_balance',
      dataIndex: 'market_balance',
      // width: 200,
      exports: ['market_balance_changed'],
      amountUnit: {
        market_balance: { unit: 'fil', },
        market_balance_changed: { unit: 'fil',},
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
        return renderFil(text,changeText,flag,className);

      },
    },
  ],
};
export const account_reward = {
  columns: (tr: any, type?: string) => {
    let arr:Array<any> = [
      {
        title: 'tag',
        dataIndex: 'tag',
        width: '20%',
        fixed: 'left',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          return <TagInput isEdit={false} text={text} record={record} />;
        },
      },
      {
        title: 'miner_id',
        dataIndex: 'miner_id',
        width: '15%',
        fixed: 'left',
        render: (text: string) => (
          <Link href={`/account#reward?miner=${text}`} className='link_text'>
            {text}
          </Link>
        ),
      },
      {
        title: 'group_name',
        dataIndex: 'group_name',
        fixed: 'left',
        width: '25%',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group'):text
          return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
        },
      },
      { title: 'block_count', dataIndex: 'block_count', width: '20%' },
      { title: 'win_count', dataIndex: 'win_count', width: '10%' },
      {
        title: 'block_reward', dataIndex: 'block_reward', width: '10%',
        amountUnit: {
          block_reward: { unit: 'fil', number: 4 },
        },
        render: (text: string) => formatFilNum(text)
      },
      // {
      //   title: 'total_reward', dataIndex: 'total_reward', width: '15%',
      //   amountUnit: {
      //     total_reward: { unit: 'fil', number: 4 }
      //   },
      //   render: (text: string) => renderFil(text)
      // },
    ]
    if (type&&type === 'detail') {
      arr.unshift({
        title: 'date',
        dataIndex: 'date',
        fixed: 'left',
        width: '10%',
        render: (text: string) => formatDateTime(text, 'YYYY-MM-DD')
      },)
      arr[1].width = '15%';
      arr[2].width = '10%';
      arr[2].render = (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      )
    }
    return arr;
  },
};
export const account_power = {
  columns: (tr: any,type?:string) => {
    let arr:Array<any> = [
      {
        title: 'tag',
        dataIndex: 'tag',
        fixed: 'left',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          return <TagInput isEdit={false} text={text} record={record} />;
        },
      },
      {
        title: 'miner_id',
        dataIndex: 'miner_id',
        width: 100,
        fixed: 'left',
        render: (text: string) => (
          <Link href={`/account#power?miner=${text}`} className='link_text'>
            {text}
          </Link>
        ),
      },
      {
        title: 'group_name',
        dataIndex: 'group_name',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        fixed: 'left',
        render: (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group'):text
          return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
        },
      },
      {
        title: 'quality_power',
        dataIndex: 'quality_power',
        amountUnit: {
          quality_power: { unit: 'power', number: 2 },
        },
        //width: 150,
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'raw_power',
        dataIndex: 'raw_power',
        /// width: 100,
        amountUnit: {
          raw_power: { unit: 'power', number: 2 },
        },
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'dc_power',
        dataIndex: 'dc_power',
        //  width: 100,
        amountUnit: {
          dc_power: { unit: 'power', number: 2 },
        },
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'cc_power',
        dataIndex: 'cc_power',
        //// width: 200,
        amountUnit: {
          cc_power: { unit: 'power', number: 2 },
        },
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'sector_size',
        dataIndex: 'sector_size',
        //// width: 200,
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'sector_power_change',
        dataIndex: 'sector_power_change',
        exports: ['sector_count_change'],
        titleTip:'sector_power_change_tip',
        amountUnit: {
          sector_power_change: { unit: 'power', number: 2 },
        },
        //width: 200,
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
        title: 'pledge_changed',
        dataIndex: 'pledge_changed',
        titleTip:'pledge_changed_tip',

        //width: 200,
        amountUnit: {
          pledge_changed: { unit: 'fil' },
        },
        render: (text: string, record: any) => renderFil(text)

      },
      {
        title: 'pledge_changed_per_t',
        dataIndex: 'pledge_changed_per_t',
        titleTip:'pledge_changed_per_t_tip',

        //width: 200,
        amountUnit: {
          pledge_changed_per_t: { unit: 'fil/T'},
        },
        render: (text: string, record: any) => {
          return renderFil(text,undefined,undefined,undefined,'FIL/T')
        }
      },
      {
        title: 'penalty',
        dataIndex: 'penalty',
        titleTip:'penalty_tip',

        //// width: 200,
        amountUnit: {
          penalty: { unit: 'fil', },
        },
        render: (text: string, record: any) =>renderFil(text)
      },
      {
        title: 'fault_sectors',
        dataIndex: 'fault_sectors',
        titleTip:'fault_sectors_tip',
        //width: 200,
        render: (text: string, record: any) => formatNumber(text),
      },
    ]
    if (type&&type === 'detail') {
      arr.unshift({
        title: 'date',
        dataIndex: 'date',
        fixed: 'left',
        // width: 200,
        render: (text: string) => formatDateTime(text, 'YYYY-MM-DD')
      },)
      arr[2].render = (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      )
    }
    return arr;
  }
};

export const account_gas = {
  columns: (tr: any, type?: string) => {
    let arr:Array<any> = [
      {
        title: 'tag',
        dataIndex: 'tag',
        fixed: 'left',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          return <TagInput isEdit={false} text={text} record={record} />;
        },
      },
      {
        title: 'miner_id',
        dataIndex: 'miner_id',
        width: 100,
        fixed: 'left',
        render: (text: string) => (
          <Link href={`/account#gas?miner=${text}`} className='link_text'>
            {text}
          </Link>
        ),
      },
      {
        title: 'group_name',
        dataIndex: 'group_name',
        width: 150,
        fixed: 'left',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group'):text
          return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
        },
      },
      {
        title: 'sector_power_change',
        dataIndex: 'sector_power_change',
        titleTip:'sector_power_change_tip',
        exports: ['sector_count_change'],
        amountUnit: {
          sector_power_change: { unit: 'power', number: 2 },
        },
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
        titleTip:'total_gas_cost_tip',

        // width: 200,
        amountUnit: {
          total_gas_cost: { unit: 'fil' },
        },
        render: (text: any) => renderFil(text),
      },
      {
        title: 'seal_gas_cost',
        dataIndex: 'seal_gas_cost',
        titleTip:'seal_gas_cost_tip',
        // width: 200,
        amountUnit: {
          total_gas_cost: { unit: 'fil' },
        },
        render: (text: any) =>renderFil(text,undefined,undefined,undefined,'FIL'),
      },
      {
        title: 'seal_gas_per_t',
        dataIndex: 'seal_gas_per_t',
        titleTip:'seal_gas_per_t_tip',
        // width: 200,
        amountUnit: {
          total_gas_cost: { unit: 'fil/T' },
        },
        render: (text: any) =>renderFil(text,undefined,undefined,undefined,'FIL/T'),
      },
      {
        title: 'deal_gas_cost',
        dataIndex: 'deal_gas_cost',
        titleTip:'deal_gas_cost_tip',

        // width: 200,
        amountUnit: {
          deal_gas_cost: { unit: 'fil' },
        },
        render: (text: any) => renderFil(text),
      },
      {
        title: 'wd_post_gas_cost',
        titleTip:'wd_post_gas_cost_tip',
        dataIndex: 'wd_post_gas_cost',
        // width: 200,
        amountUnit: {
          wd_post_gas_cost: { unit: 'fil' },
        },
        render: (text: any) => renderFil(text),
      },
      {
        title: 'wd_post_gas_per_t',
        dataIndex: 'wd_post_gas_per_t',
        titleTip:'wd_post_gas_per_t_tip',
        // width: 200,
        amountUnit: {
          wd_post_gas_per_t: { unit: 'fil/T' },
        },
        render: (text: any) => renderFil(text,undefined,undefined,undefined,'FIL/T'),
      },
    ];
    if (type&&type === 'detail') {
      arr.unshift({
        title: 'date',
        dataIndex: 'date',
        fixed: 'left',
        // width: 200,
        render: (text: string) => formatDateTime(text, 'YYYY-MM-DD')
      },)
      arr[2].render = (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      )
    }
    return arr;
  }
};

export const account_expired = {
  headerList: [
    {
      title: 'exp_month',
      dataIndex: 'exp_month',
      width: '20%',
      render: (text: string, record: any, tr: any) => {
        const [year, month] = text.split('-');
        return <span>{ formatDateTime(text,'YYYY-MM')}</span>
        // return <span>{tr('exp_month', { year, month })}</span>;
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
      render: (text: string | number) => renderFil(text),
    },
  ],
  columns: (tr: any, type?: 'detail') => {
    let arr:Array<any> = [
      {
        title: 'tag',
        dataIndex: 'tag',
        width: '15%',
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          return <TagInput isEdit={false} text={text} record={record} />;
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
        ellipsis: {
          showTitle: false,
        },
        render: (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group'):text
          return <div className='bg-bg_hover text-xs text-primary rounded-[5px] p-2 w-fit'> {showText}</div>
        },
      },
      {
        title: 'exp_power',
        dataIndex: 'exp_power',
        width: '15%',
        amountUnit: {
          exp_power: { unit: 'power', number: 2 }
        },
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
        amountUnit: {
          exp_dc: { unit: 'power', number: 2 }
        },
        render: (text: string, record: any) => unitConversion(text, 2),
      },
      {
        title: 'exp_pledge',
        dataIndex: 'exp_pledge',
        amountUnit: {
          exp_dc: { unit: 'fil', number: 4 }
        },
        width: '15%',
        render: (text: string | number) => renderFil(text),
      },
    ]
    if (type&&type === 'detail') {
      arr.unshift({
        title: 'exp_time',
        dataIndex: 'exp_date',
        fixed: 'left',
        width: '10%',
        render: (text: string) => formatDateTime(text, 'YYYY-MM-DD')
      },)
      arr[1].width = '10%',
      arr[3].width = '10%',
      arr[2].render = (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      )
    }
    return arr
  },
};

export const account_miners = {
  groups_miners_columns: [
    {
      dataIndex: 'miner_tag',
      title: 'custom_tag',
      width: '45%',
    },
    {
      dataIndex: 'miner_id',
      title: 'miner_id',
      width: '45%',
      render: (text: string) => (
        <Link href={`/miner/${text}`} className='link_text'>
          {text}
        </Link>
      ),
    },
    {
      dataIndex: 'edit',
      title: 'edit',
      width: '10%',
    },
  ],
};

function renderFil(text: string | number, changeText?: number | string, flag: string = '', className?: string,unit:string ='FIL') {
  const textValue = formatFil(text, unit, 4, true)
  return (
    <span className='flex flex-col'>
      <span className={ `${Number(text) ? '':'text_des_unit'}`}>{textValue}</span>
      { changeText !== undefined && <span className={`${changeText ? className:'text_des_unit'}`}>
        {flag + ' '}
        {formatFil(Math.abs(Number(changeText)), unit, 4, true)}
      </span>}

    </span>
  );
}