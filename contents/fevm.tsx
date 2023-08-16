/** @format */
import Image from '@/packages/image';
import { formatNumber, get$Number } from '@/utils';

export const defi_list = {
  title: 'defi_list',
  total_msg: 'defi_list_total',
  columns: [
    {
      title: 'rank',
      dataIndex: 'rank',
      width: '5%',
    },
    {
      dataIndex: 'protocol',
      title: 'Protocol',
      width: '25%',
      render: (text: string, record: any) => {
        return (
          <div
            className='flex_align_center'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (record.main_site) {
                window.open(record.main_site);
              }
            }}>
            <Image
              src={record.icon_url || ''}
              width={35}
              height={35}
              style={{ borderRadius: '50%' }}
              alt='logo'
            />
            <span className='margin-10'>{text}</span>
          </div>
        );
      },
    },
    {
      dataIndex: 'tvl',
      title: 'tvl',
      width: '15%',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (text: string, record: any) => get$Number(text),
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
      title: (tr: any) => {
        return (
          <span className='flex_align_center'>
            {tr('tokens')}
            {/* <Tip context={tr('tokens_tip')} /> */}
          </span>
        );
      },
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
  protocol: '25%',
  tvl: '25%',
  tvl_change_rate_in_24h: '20%',
  user_count: '20%',
};
