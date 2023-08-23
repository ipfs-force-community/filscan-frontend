/** @format */

import errorIcon from '@/assets/images/error.svg';
import del_light from '@/assets/images/del_light.svg';
import Search from '@/components/search';
import messageManager from '@/packages/message';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSvgIcon } from '@/svgsIcon';
import { MinerNum } from '../type';

export default ({
  className,
  defaultMiners,
  minersNum,
}: {
  className?: string;
  defaultMiners?: Array<any>;
  minersNum: MinerNum;
}) => {
  const [addMiners, setAddMiner] = useState<Array<any>>(defaultMiners || []);

  useEffect(() => {
    setAddMiner(defaultMiners || []);
  }, [defaultMiners]);

  const handleSearch = (values: any) => {
    if (addMiners.length > Number(minersNum?.max_miners_count)) {
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
    setAddMiner([...addMiners, { miner_id: values }]);
  };

  return (
    <>
      <Search
        ns={'account'}
        className={`w-full mt-4 ${className}`}
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
                {miner.miner_id}
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
    </>
  );
};
