/** @format */

import ErrorIcon from '@/assets/images/error.svg'
import DelLight from '@/assets/images/del_light.svg'
import Search from '@/components/search'
import messageManager from '@/packages/message'
import { useEffect, useState } from 'react'
import { getSvgIcon } from '@/svgsIcon'
import { MinerNum } from '../type'
import { Translation } from '@/components/hooks/Translation'

export default ({
  className,
  defaultMiners,
  minersNum,
  onChange,
}: {
  className?: string
  defaultMiners?: Array<any>
  minersNum: MinerNum
  onChange?: (minerArr: Array<any>) => void
}) => {
  const [addMiners, setAddMiner] = useState<Array<any>>(defaultMiners || [])
  const { tr } = Translation({ ns: 'account' })

  useEffect(() => {
    setAddMiner(defaultMiners || [])
  }, [defaultMiners])

  const handleSearch = (values: any) => {
    if (addMiners.length > Number(minersNum?.max_miners_count)) {
      return messageManager.showMessage({
        type: 'error',
        content: '添加节点已达上限，请删除部分节点后添加新',
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
    const newMiners = [...addMiners, { miner_id: values }]
    setAddMiner(newMiners)
    if (onChange) onChange(newMiners)
  }

  return (
    <>
      <Search
        ns={'account'}
        className={`mt-4 !h-12 w-full ${className}`}
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
        <ul className="border_color mt-5 flex h-fit w-full list-none flex-wrap gap-x-4 rounded-[5px] border p-4">
          {addMiners?.map((miner, index: number) => {
            return (
              <li
                className="flex w-fit items-center justify-between gap-x-6 rounded-[5px] bg-bg_hover px-2 py-1"
                key={miner + index}
              >
                {miner.miner_id}
                <DelLight
                  className="cursor-pointer"
                  width={12}
                  height={12}
                  onClick={() => {
                    const newArr = [...addMiners]
                    newArr.splice(index, 1)
                    setAddMiner(newArr)
                    if (onChange) onChange(newArr)
                  }}
                />
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
