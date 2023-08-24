/** @format */

import React, { useEffect, useState } from 'react';
import { Collapse, Popconfirm } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';
import { Translation } from '@/components/hooks/Translation';
import { account_miners } from '@/contents/account';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';
import { useGroupsStore } from './content';

const Groups = ({ groups }: { groups: Array<any> }) => {
  const { tr } = Translation({ ns: 'account' });
  const { axiosData } = useAxiosData();
  const { setGroups } = useGroupsStore();
  const [data, setData] = useState<any>(groups);

  useEffect(() => {
    setData(groups || []);
  }, [groups]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      console.log('---4', result);
    } else {
      const { source, destination } = result;
      const sourceIndex: number = source.index; //移动的index
      const destinationIndex = destination.index; //目标index
      const [groupId, groupIndex] = source.droppableId.split('_');
      const sourceMinerItem = data[groupIndex].miners_info[sourceIndex];

      const [dest_itemId, dest_index] = destination.droppableId.split('_');
      const groupItem: any = data[Number(groupIndex)]; //内容group minerIem
      const destinationGroup = data[Number(dest_index)]; //移动

      if (groupId !== dest_itemId) {
        //不同的组内拖拽
        destinationGroup.miners_info = destinationGroup?.miners_info || [];
        destinationGroup.miners_info?.splice(
          destinationIndex,
          0,
          sourceMinerItem
        );
        groupItem?.miners_info?.splice(sourceIndex, 1);
      } else {
        //同组内拖拽
        groupItem?.miners_info?.splice(destinationIndex, 0, sourceMinerItem);
      }
    }

    setData([...data]);
    //保存分组 todo
  };

  const handleDelMiner = async (
    minerItem: any,
    minerIndex: number,
    groupItem: any
  ) => {
    groupItem.miners_info.splice(minerIndex, 1);

    const data = await axiosData(proApi.saveGroup, { ...groupItem });
    const newGroups = await axiosData(proApi.getGroups);
    setGroups(newGroups.group_info_list || []);
    // setLoading(false);
    // onChange(false);
  };

  const GroupItemHeader = (item: any) => {
    return (
      <li
        className='custom_Collapse_item cursor-pointer w-full rounded-xl h-[38px] flex items-center justify-between'
        key={item.group_id}>
        <span className='flex gap-x-5 items-center'>
          <span className='des_bg_color flex items-center text-xs border_color border text_des w-fit px-1 rounded-[5px] '>
            {tr(item.label)}
          </span>
          <span>
            {tr('item_value', {
              value: item?.miners_info?.length || 0,
            })}
          </span>
        </span>
        <div className='flex gap-x-5 items-center'>
          <Link
            href={`/account#miners?type=miners_group&group=${item.group_id}`}
            className='cursor-pointer text_color'>
            {getSvgIcon('editIcon')}
          </Link>
        </div>
      </li>
    );
  };

  const minersChildren = (
    minerItem: any,
    minerIndex: number,
    groupItem: any
  ) => {
    return (
      <ul
        className='w-full flex border-t border_color px-5'
        key={minerIndex}
        id={`${minerItem.miner_id}-${minerIndex}`}>
        {account_miners.groups_miners_columns.map((itemDate, index) => {
          const { render, title, width, dataIndex } = itemDate;
          const value = minerItem[dataIndex];
          let showValue = render
            ? render(value, minerItem)
            : minerItem[dataIndex];
          if (dataIndex == 'edit') {
            showValue = (
              <span className='flex items-center gap-x-2'>
                <span className='cursor-pointer hover:text-primary'>
                  {getSvgIcon('openAllIcon')}
                </span>
                <Popconfirm
                  title='Delete the miner'
                  overlayClassName='custom_Popconfirm'
                  description='Are you sure to delete this miner?'
                  onConfirm={() =>
                    handleDelMiner(minerItem, minerIndex, groupItem)
                  }
                  okText='Yes'
                  cancelText='No'>
                  <span className='cursor-pointer hover:text-primary'>
                    {getSvgIcon('deleteIcon')}
                  </span>
                </Popconfirm>
              </span>
            );
          }
          return (
            <li style={{ width }} className=' py-5' key={index}>
              {showValue}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Collapse
        className='custom_collapse_gaps'
        collapsible='header'
        expandIconPosition='end'>
        {data.map((groupItem: any, dataIndex: number) => (
          <Collapse.Panel
            header={GroupItemHeader(groupItem)}
            key={groupItem.group_id}>
            <Droppable droppableId={groupItem.group_id + '_' + dataIndex}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='main_bgColor text-sm font-medium text_des rounded-xl min-h-[200px]'>
                  <ul className='flex p-5'>
                    {account_miners.groups_miners_columns.map((minerHeader) => {
                      return (
                        <li
                          className='w-full'
                          style={{ width: minerHeader.width }}>
                          {tr(minerHeader.title)}
                        </li>
                      );
                    })}
                  </ul>
                  {groupItem?.miners_info?.map(
                    (minerItem: any, minerIndex: number) => (
                      <Draggable
                        key={minerItem.miner_id}
                        draggableId={minerItem.miner_id + '_' + minerIndex}
                        index={minerIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            {minersChildren(minerItem, minerIndex, groupItem)}
                          </div>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Collapse.Panel>
        ))}
      </Collapse>
    </DragDropContext>
  );
};

export default Groups;
