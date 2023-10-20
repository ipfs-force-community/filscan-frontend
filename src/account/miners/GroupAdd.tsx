/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Button, Input } from 'antd';
import AddNode from './AddNode';
import { MinerNum, groupsItem } from '../type';
import Breadcrumb from '@/packages/breadcrumb';
import { useEffect, useState } from 'react';
import messageManager from '@/packages/message';
import { useRouter } from 'next/router';
import accountStore from '@/store/modules/account';

/** @format */

export default ({
  groupId,
  groupDetail,
  minersNum,
}: {
  groupId?: string | number | null;
  groupDetail?: groupsItem;
  minersNum: MinerNum;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const {groupMiners } = accountStore;

  const routerItems = [
    { title: tr('miners'), path: '/account#miners' },
    {
      title: tr('miners_group_manage'),
      path: '/account#miners?type=miners_group',
    },
  ];
  const router = useRouter();
  const [groupName, setGroupName] = useState(groupDetail?.group_name);
  const [groupMinders, setGroupMiners] = useState(groupDetail?.miners_info);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setGroupName(groupDetail?.group_name);
    setGroupMiners(groupDetail?.miners_info || []);
  }, [groupDetail, groupId]);

  const handleSave = async () => {
    //添加分组及节点
    setSaveLoading(true);
    const groupDetail = groupMiners?.find((v) => v.group_id === Number(groupId));
    const data = await accountStore.saveGroups({
      group_id: Number(groupId),
      is_default:groupDetail?.is_default,
      group_name: groupName,
      miners_info: groupMinders,
    })
    setSaveLoading(false);
    if (!data.error) {
      messageManager.showMessage({
        type: 'success',
        content: 'Save Group successfully',
      });
      router.push('/account#miners');
    } else {
      if (data && data?.code) {
        messageManager.showMessage({
          type: 'error',
          content: data?.message || '',
        });
      }
    }
  };
  return (
    <>
      <Breadcrumb items={routerItems} />
      <div className='mt-8 mb-10 font-PingFang font-semibold text-lg'>
        {tr('miners_group_manage')}
      </div>
      <div className='border_color card_shadow px-5 py-7 rounded-xl	 flex flex-col flex-1'>
        <ul className='flex-1'>
          <li className='flex flex-col'>
            <span className='text_des mb-2'>{tr('group_name')}</span>
            <Input
              disabled={groupDetail&&groupDetail.is_default}
              placeholder={tr('create_group_holder')}
              className='h-12 w-full custom_input mt-2'
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </li>
          <li className='mt-5'>
            <span className='text_des'>{tr('miners')}</span>
            <AddNode
              className='mt-2'
              defaultMiners={groupMinders}
              minersNum={minersNum}
              onChange={(values) => {
                setGroupMiners(values);
              }}
            />
          </li>
        </ul>
        <div className='mt-5 flex gap-x-4 justify-end'>
          <Button className='cancel_btn'>{tr('cancel')}</Button>
          <Button
            className='confirm_btn'
            onClick={handleSave}
            loading={saveLoading}>
            {tr('confirm')}
          </Button>
        </div>
      </div>
    </>
  );
};
