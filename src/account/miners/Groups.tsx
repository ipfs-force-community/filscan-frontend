/** @format */

import React, { useEffect, useMemo, useState } from 'react';
import { Collapse } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';
import { Translation } from '@/components/hooks/Translation';
import { account_miners } from '@/contents/account';
import Modal from '@/packages/modal';
import TagInput from '@/packages/tagInput';
import messageManager from '@/packages/message';
import accountStore from '@/store/modules/account';

const Groups = () => {
  const { tr } = Translation({ ns: 'account' });
  const { groupMiners } = accountStore;
  const [data, setData] = useState<any>(groupMiners);
  const [deleteLoading, setDeleteLoading] = useState<any>(false);
  const [modalItems, setModalItems] = useState<any>({});

  useEffect(() => {
    setData(groupMiners || []);
  }, [groupMiners]);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

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
      //给予目标group，miner_id 是唯一的
      accountStore.saveMiners(destinationGroup)
    } else {
      //同组内拖拽
      groupItem?.miners_info?.splice(sourceIndex, 1);
      groupItem?.miners_info?.splice(destinationIndex, 0, sourceMinerItem);
      accountStore.saveMiners(groupItem)
    }

  };

  const handleDelMiner = async (modalItem: any) => {
    setDeleteLoading(true);
    const { minerIndex, groupItem } = modalItem;
    groupItem.miners_info.splice(minerIndex, 1);
    await accountStore.saveMiners({...groupItem})
    setDeleteLoading(false);
  };

  const handleDelGroup = async (id: string | number) => {
    setDeleteLoading(true);
    await accountStore.delGroups(Number(id));
    setDeleteLoading(false);
  };

  const handleSaveMiners = async (group: any, minerInfo: any) => {
    const saveResult = await accountStore.saveMiners({
      ...group,
      miners_info: [minerInfo],
    })
    if (saveResult) {
      return messageManager.showMessage({
        type: 'success',
        content: '保存成功',
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
  };

  const GroupItemHeader = (item: any) => {
    return (
      <li
        className='custom_Collapse_item cursor-pointer w-full rounded-xl h-[38px] flex items-center justify-between'
        key={item.group_id}>
        <span className='flex gap-x-5 items-center'>
          <span className='des_bg_color flex items-center text-xs border_color border text_des w-fit px-1 rounded-[5px] '>
            {tr(item.group_name)}
          </span>
          <span>
            {tr('item_value', {
              value: item?.miners_info?.length || 0,
            })}
          </span>
        </span>
        <div className='flex gap-x-5 items-center'>
          <Link
            href={`/account#miners?group=${item.group_id}`}
            className='cursor-pointer text_color'>
            {getSvgIcon('editIcon')}
          </Link>
          {!item.is_default && (
            <>
              <span
                className='cursor-pointer hover:text-primary'
                onClick={(e) => {
                  e.stopPropagation();
                  setModalItems({
                    id: item.group_name,
                    group_id: item.group_id,
                    type: 'group',
                    show: true,
                    groupItem: item,
                  });
                }}>
                {getSvgIcon('deleteIcon')}
              </span>
            </>
          )}
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
          let showValue = render ? render(value) : minerItem[dataIndex];
          if (dataIndex === 'miner_tag') {
            showValue = (
              <TagInput
                text={value}
                record={{ ...minerItem }}
                onChange={(value) =>
                  handleSaveMiners({
                    group_id: Number(groupItem.group_id),
                    is_default:groupItem.is_default,
                  }, {
                    ...minerItem,
                    miner_tag: value,
                  })
                }
              />
            );
          } else if (dataIndex == 'edit') {
            showValue = (
              <span className='flex items-center gap-x-2'>
                <span className='cursor-pointer hover:text-primary'>
                  {getSvgIcon('openAllIcon')}
                </span>
                <>
                  <span
                    className='cursor-pointer hover:text-primary'
                    onClick={() => {
                      setModalItems({
                        id: minerItem.miner_id,
                        minerItem,
                        type: 'miner',
                        show: true,
                        groupItem,
                        minerIndex,
                      });
                    }}>
                    {getSvgIcon('deleteIcon')}
                  </span>
                </>
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
  const showType = useMemo(() => {
    return modalItems?.type || 'miner';
  }, [modalItems]);

  return (
    <>
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
                    className='main_bgColor text-sm font-medium text_des rounded-xl'>
                    <ul className='flex p-5'>
                      {account_miners.groups_miners_columns.map(
                        (minerHeader,index) => {
                          return (
                            <li
                              key={index}
                              className='w-full'
                              style={{ width: minerHeader.width }}>
                              {tr(minerHeader.title)}
                            </li>
                          );
                        }
                      )}
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
      <Modal
        closeIcon={false}
        title={tr(`delete_${showType}`)}
        show={modalItems.show}
        loading={deleteLoading}
        onOk={(e: any) => {
          //  e.stopPropagation();
          if (modalItems.type === 'miner') {
            handleDelMiner(modalItems);
          } else {
            handleDelGroup(modalItems.group_id);
          }
          setModalItems({
            show: false,
          });
        }}
        onCancel={(e: any) => {
          e.stopPropagation();
          setModalItems({
            show: false,
          });
          //  setShowDeleteModal(false);
        }}>
        <div className='m-5'>
          <div className='mb-1'>
            {tr(`delete_record_${showType}`, {
              value: modalItems?.id,
            })}
          </div>
          <div>{tr(`delete_${showType}_text`)}</div>
        </div>
      </Modal>
    </>
  );
};

export default Groups;
