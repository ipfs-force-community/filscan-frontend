/** @format */

import { Translation } from '@/components/hooks/Translation'
import Loading from '@/components/loading'
import { overview } from '@/contents/account'
import Table from '@/packages/Table'
import ExportExcel from '@/packages/exportExcel'
import { getSvgIcon } from '@/svgsIcon'
import { formatDateTime } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import Groups from './Groups'
import overviewStore from '@/store/modules/account/overview'
import { observer } from 'mobx-react'

interface Props {
  selectedKey: string
}

export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const [active, setActive] = useState<string>('-1')
  const { overviewData = {}, loading = true } = overviewStore

  const columns = useMemo(() => {
    return overview.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) }
    })
  }, [tr])

  useEffect(() => {
    load()
  }, [])

  const load = (value?: string) => {
    const groupId = value ? Number(value) : Number(active)
    overviewStore.getOverViewData(Number(groupId))
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex  flex-col">
          <span className="w-full font-HarmonyOS text-lg font-semibold	">
            {tr(selectedKey)}
          </span>
          <span className="text_des text-xs">
            <span>{tr('last_time')}</span>
            <span className="ml-2">
              {formatDateTime(overviewData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <Groups
            selectGroup={active}
            onChange={(value: string) => {
              load(value)
              setActive(value)
            }}
          />
          <ExportExcel
            columns={columns}
            data={overviewData?.miner_info_detail_list || []}
            fileName={'expired'}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-y-5">
        {overview.headerList.map((itemArray, index) => {
          return (
            <ul className={`flex min-h-[133px] flex-wrap gap-x-5`} key={index}>
              {itemArray.map((item) => {
                const { icon, dataIndex, render } = item
                const showValue = render(
                  overviewData && overviewData[dataIndex],
                  overviewData,
                  tr,
                )
                return (
                  <li
                    key={item.dataIndex}
                    className="card_shadow border_color flex flex-1 items-start justify-between  rounded-xl border p-6"
                  >
                    {showValue}
                    {icon && <span>{getSvgIcon(icon)}</span>}
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
      <div className="card_shadow border_color mt-5 overflow-auto rounded-xl border p-4">
        <Table
          data={overviewData?.miner_info_detail_list || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </>
  )
})
