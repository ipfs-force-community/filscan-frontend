/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Breadcrumb, Button, Input } from 'antd';
import AddNode from './AddNode';
import { Group } from '../type';

/** @format */

export default ({
  groupId,
  groupDetail,
}: {
  groupId?: string | number | null;
  groupDetail?: Group;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const routerItems = [
    { title: tr('miners'), path: '/account#miners' },
    {
      title: tr('miners_group_manage'),
      path: '/account#miners?type=miners_group',
    },
  ];

  const handleSave = () => {
    //添加分组及节点
  };

  return (
    <>
      <Breadcrumb items={routerItems} />
      <div className='mt-8 mb-10 font-PingFang font-semibold text-lg'>
        {tr('miners_group_manage')}
      </div>
      <div className='border-color card_shadow px-5 py-7 rounded-xl	 flex flex-col flex-1'>
        <ul className='flex-1'>
          <li className='flex flex-col'>
            <span className='text_des'>{tr('group_name')}</span>
            <Input
              placeholder={tr('create_group_holder')}
              className='h-12 w-full mt-2'
              defaultValue={groupDetail?.label}
            />
          </li>
          <li className='mt-5'>
            <span className='text_des'>{tr('miners')}</span>
            <AddNode className='mt-2' defaultMiners={groupDetail?.miners_id} />
          </li>
        </ul>
        <div className='mt-5 flex gap-x-4 justify-end'>
          <Button className='cancel_btn'>{tr('cancel')}</Button>
          <Button className='confirm_btn' onClick={handleSave}>
            {tr('confirm')}
          </Button>
        </div>
      </div>
    </>
  );
};
