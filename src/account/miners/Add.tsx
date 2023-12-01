/** @format */

import { Translation } from '@/components/hooks/Translation'
import Search from '@/components/search'
import Breadcrumb from '@/packages/breadcrumb'
import DelLight from '@/assets/images/del_light.svg'
import { useState } from 'react'
import ErrorIcon from '@/assets/images/error.svg'
import messageManager from '@/packages/message'
import CreateGroup from './CreateGroup'
import { getSvgIcon } from '@/svgsIcon'
import { Button } from 'antd'
import SearchSelect from '@/packages/searchSelect'
import { MinerNum } from '../type'
import { useRouter } from 'next/router'
import accountStore from '@/store/modules/account'

export default ({
  groups,
  minersNum,
  defaultId,
}: {
  groups: Array<any>
  minersNum: MinerNum
  defaultId?: number
}) => {
  const { tr } = Translation({ ns: 'account' })
  const { groupMiners } = accountStore
  const router = useRouter()
  const routerItems = [
    { title: tr('miners'), path: '/account#miners' },
    { title: tr('miners_add'), path: '/account#miners?type=miner_add' },
  ]

  const [addMiners, setAddMiner] = useState<Array<any>>([])
  const [show, setShow] = useState<boolean>(false)
  const [selectGroup, setSelectGroup] = useState<string | number>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = (values: any) => {
    if (!values.startsWith('f0')) {
      return messageManager.showMessage({
        type: 'error',
        content: 'please add minerId',
        icon: <ErrorIcon width={18} height={18} />,
        suffix: (
          <span
            className="cursor-pointer"
            onClick={() => {
              messageManager.hide()
            }}
          >
            {getSvgIcon('closeIcon')}
          </span>
        ),
      })
    }
    if (addMiners.length > Number(minersNum?.max_miners_count)) {
      return messageManager.showMessage({
        type: 'error',
        content: '',
        //content: '添加节点已达上限，请删除部分节点后添加新',
        icon: <ErrorIcon width={18} height={18} />,
        suffix: (
          <span
            className="cursor-pointer"
            onClick={() => {
              messageManager.hide()
            }}
          >
            {getSvgIcon('closeIcon')}
          </span>
        ),
      })
    }
    setAddMiner([...addMiners, { miner_id: values?.trim() }])
  }

  const handleSave = async () => {
    if (addMiners.length > 0) {
      setLoading(true)
      const selectedGroup = selectGroup || defaultId
      const groupDetail = groupMiners?.find((v) => v.group_id === selectedGroup)
      let payload = {}
      if (groupDetail) {
        //更新旧分组
        payload = {
          group_id: selectedGroup,
          group_name: groupDetail?.group_name,
          is_default: groupDetail.is_default,
          miners_info: (groupDetail?.miners_info || []).concat(addMiners),
        }
      } else {
        //添加新分组
        payload = {
          group_id: selectedGroup,
          miners_info: addMiners,
        }
      }
      const data = await accountStore.saveGroups(payload)
      setLoading(false)
      if (!data.error) {
        messageManager.showMessage({
          type: 'success',
          content: 'Add Miner successfully',
        })
        router.push('/account#miners')
      }
    } else {
      messageManager.showMessage({
        type: 'warning',
        content: 'Please add miner',
      })
    }
  }
  return (
    <>
      <Breadcrumb items={routerItems} />
      <div className="font-HarmonyOS mb-10 mt-8 text-lg font-semibold">
        {tr('miners_add')}
      </div>
      <div className="border_color card_shadow flex flex-1 flex-col	rounded-xl px-5 py-7">
        <div className="text_des">{tr('miners_add')}</div>
        <div className="flex-1">
          <Search
            ns={'account'}
            className="mt-4 !h-12 w-full"
            placeholder="miner_add_placeholder"
            clear
            onClick={handleSearch}
            suffix={
              <span className="reverse_color flex h-8 w-fit cursor-pointer items-center rounded-[5px] p-2">
                {tr('miner_add')}
              </span>
            }
            onSearch={handleSearch}
          />
          {addMiners.length > 0 && (
            <ul className="border_color mt-5 flex h-fit w-full list-none flex-wrap gap-x-4 gap-y-2.5 rounded-[5px] border p-4">
              {addMiners?.map((miner, index: number) => {
                return (
                  <li
                    className="flex w-fit items-center justify-between gap-x-6 rounded-[5px] bg-bg_hover px-2 py-1"
                    key={miner.miner_id + index}
                  >
                    {miner.miner_id}
                    <DelLight
                      className="cursor-pointer"
                      width={12}
                      height={12}
                      onClick={() => {
                        const newArr = [...addMiners]
                        newArr.splice(index, 1), setAddMiner(newArr)
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          )}
          <SearchSelect
            className="caret-transparent"
            ns="account"
            options={groups}
            isShow={true}
            onChange={(value) => {
              setSelectGroup(value)
            }}
            suffix={
              <li className="mt-4" onClick={() => setShow(true)}>
                <hr className=" border_color" />
                <span className="mt-4 flex w-full cursor-pointer items-center gap-x-2 rounded-[5px] px-5 py-4 hover:bg-bg_hover hover:text-primary">
                  {getSvgIcon('addIcon')}
                  {tr('group_add')}
                </span>
              </li>
            }
          />
        </div>
        <div className="mt-5 flex justify-end gap-x-4">
          <Button
            className="cancel_btn"
            onClick={() => {
              router.back()
            }}
          >
            {tr('back')}
          </Button>
          <Button
            className="confirm_btn"
            loading={loading}
            onClick={handleSave}
          >
            {tr('confirm')}
          </Button>
        </div>
      </div>
      <CreateGroup
        show={show}
        onChange={(name) => {
          setShow(false)
        }}
      />
    </>
  )
}
