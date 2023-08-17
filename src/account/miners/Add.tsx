/** @format */

import { Translation } from '@/components/hooks/Translation';
import Search from '@/components/search';
import Breadcrumb from '@/packages/breadcrumb';
import del_light from '@/assets/images/del_light.svg';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import errorIcon from '@/assets/images/error.svg';
import messageManager from '@/packages/message';
import { getSvgIcon } from '@/svgsIcon';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const routerItems = [
    { title: tr('miners'), path: '/account#miners' },
    { title: tr('miners_add'), path: '/account#miners?type=miner_add' },
  ];

  const [addMiners, setAddMiner] = useState<string[]>([]);
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const groups = await fetchData(proApi.getGroups);
    console.log('---3', groups);
  };

  const handleSearch = (values: any) => {
    if (addMiners.length > 4) {
      return messageManager.showMessage({
        type: 'error',
        content: '添加节点已达上限，请删除部分节点后添加新',
        icon: <Image src={errorIcon} width={18} height={18} alt='' />,
        suffix: (
          <span
            className='cursor-pointer'
            onClick={() => {
              messageManager.hide();
            }}>
            {getSvgIcon('closeIcon')}
          </span>
        ),
      });
    }
    setAddMiner([...addMiners, values]);
  };

  return (
    <div>
      <Breadcrumb items={routerItems} />
      <div className='mt-8 mb-10 font-PingFang font-semibold text-lg'>
        {tr('miners_add')}
      </div>
      <div className='border-color card_shadow px-5 py-7 rounded-xl	'>
        <div className='text_des'>{tr('miners_add')}</div>
        <div>
          <Search
            ns={'account'}
            className='w-full mt-4'
            placeholder='miner_add_placeholder'
            clear
            suffix={
              <span className='p-2 w-fit h-8 rounded-[5px] reverse_color flex items-center cursor-pointer'>
                回车确认
              </span>
            }
            onSearch={handleSearch}
          />
          {addMiners.length > 0 && (
            <ul className='list-none border border-color rounded-[5px] mt-5 p-4 w-full h-fit flex gap-x-4 flex-wrap'>
              {addMiners?.map((miner, index: number) => {
                return (
                  <li
                    className='bg-bg_hover px-2 py-1 w-fit rounded-[5px] flex items-center justify-between gap-x-6'
                    key={miner + index}>
                    {miner}
                    <Image
                      className='cursor-pointer'
                      width={12}
                      height={12}
                      onClick={() => {
                        const newArr = [...addMiners];
                        newArr.splice(index, 1), setAddMiner(newArr);
                      }}
                      alt='del'
                      src={del_light}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div className='mt-5'></div>
        </div>
      </div>
    </div>
  );
};
