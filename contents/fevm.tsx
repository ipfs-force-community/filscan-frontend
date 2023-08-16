/** @format */
import Image from '@/packages/image';
import { formatNumber, get$Number } from '@/utils';
import TextTip from '@/packages/textTooltip';
import { Tooltip } from 'antd';

export const defi_list = {
  title: 'defi_list',
  total_msg: 'defi_list_total',
  columns: [
    {
      title: 'rank',
      dataIndex: 'rank',
      width: '5%',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'Protocol',
      width: '25%',
      dataIndex: 'protocol',
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => {
        return (
          <span
            className='flex items-center gap-x-1'
            onClick={() => {
              if (record.main_site) {
                window.open(record.main_site);
              }
            }}>
            <Image
              src={record.icon_url || ''}
              width={25}
              height={25}
              alt='logo'
            />
            <TextTip text={text} />
          </span>
        );
      },
    },
    {
      title: 'tvl',
      dataIndex: 'tvl',
      width: '15%',
      defaultSortOrder: 'descend',
      sorter: true,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string, record: any) => (
        <TextTip text={get$Number(text)} />
      ),
    },
    {
      dataIndex: 'tvl_change_rate_in_24h',
      title: 'tvl_change_rate_in_24h',
      sorter: true,
      width: '20%',
      render: (text: string) => (
        <span className={Number(text) < 0 ? 'down-color' : 'ups-color'}>
          {Number(text).toFixed(2) + '%'}
        </span>
      ),
    },
    {
      dataIndex: 'tvl_change_in_24h',
      title: 'tvl_change_in_24h',
      sorter: true,
      width: '15%',
      render: (text: string) => {
        return (
          <span className={Number(text) < 0 ? 'down-color' : 'ups-color'}>
            {get$Number(text)}
          </span>
        );
      },
    },
    {
      dataIndex: 'users',
      title: 'users',
      width: '10%',
      sorter: true,
      render: (text: string | number) => formatNumber(text),
    },
    {
      dataIndex: 'tokens',
      title: 'tokens',
      width: '10%',
      render: (text: any) => {
        if (Array.isArray(text)) {
          return (
            <div>
              {text.map((item_t, index) => {
                return (
                  <li key={index} className='flex_align_center'>
                    <Image
                      src={item_t.icon_url}
                      width={20}
                      height={20}
                      alt=''
                      style={{ borderRadius: '50%' }}
                    />
                    <span className='margin-6'>{item_t.rate}%</span>
                  </li>
                );
              })}
            </div>
          );
        }
        return '--';
      },
    },
  ],
};

export const homeDefiColumns: any = {
  rank: '10%',
  protocol: '30%',
  tvl: '40%',
  tvl_change_rate_in_24h: '10%',
  users: '10%',
};
