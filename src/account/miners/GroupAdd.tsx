/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Button, Input } from 'antd';
import AddNode from './AddNode';
import { Group, MinerNum, groupsItem } from '../type';
import Breadcrumb from '@/packages/breadcrumb';
import { useEffect, useState } from 'react';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';
import { useGroupsStore } from './content';
import messageManager from '@/packages/message';

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
  const { setGroups } = useGroupsStore();
  const routerItems = [
    { title: tr('miners'), path: '/account#miners' },
    {
      title: tr('miners_group_manage'),
      path: '/account#miners?type=miners_group',
    },
  ];
  const [groupName, setGroupName] = useState(groupDetail?.label);
  const [groupMinders, setGroupMiners] = useState(groupDetail?.miners_info);
  const [newMiners, setNewMiners] = useState<Array<any>>([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const { loading, axiosData } = useAxiosData();

  useEffect(() => {
    setGroupName(groupDetail?.label);
    setGroupMiners(groupDetail?.miners_info || []);
  }, [groupDetail, groupId]);

  const handleSave = async () => {
    //添加分组及节点
    setSaveLoading(true);
    // const detail
    const data = await axiosData(proApi.saveGroup, {
      group_id: Number(groupId),
      group_name: groupName,
      miners_info: newMiners,
    });
    setSaveLoading(false);
    const newGroups = await axiosData(proApi.getGroups);
    setGroups(newGroups?.group_info_list || []);
    if (data) {
      messageManager.showMessage({
        type: 'success',
        content: 'Save Group successfully',
      });
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
            <span className='text_des'>{tr('group_name')}</span>
            <Input
              placeholder={tr('create_group_holder')}
              className='h-12 w-full mt-2'
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
                setNewMiners(values);
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
