/** @format */

import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { account_gas } from '@/contents/account'
import { proApi } from '@/contents/apiUrl'
import Selects from '@/packages/selects'
import ExportExcel from '@/packages/exportExcel'
import useAxiosData from '@/store/useAxiosData'
import DateTime from '@/src/account/DateTIme'
import { formatDateTime } from '@/utils'
import { useHash } from '@/components/hooks/useHash'
import Detail from './Detail'
import Tooltip from '@/packages/tooltip'
import manageStore from '@/store/modules/account/manage'
import { observer } from 'mobx-react'
import Groups from '../../Groups'
interface Props {
  selectedKey: string
}

export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { hashParams } = useHash()
  const { gasData, gasLoading } = manageStore
  const [active, setActive] = useState<string>('-1')

  const [date, setDate] = useState({
    startTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ',
    ),
    endTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ',
    ),
  })

  const columns = useMemo(() => {
    return account_gas.columns(tr).map((item) => {
      if (item.titleTip) {
        ;(item.excelTitle =
          item.dataIndex === 'sector_count_change'
            ? `${tr('raw_power')}/${tr('sector_power_count')}`
            : tr(item.title)),
          (item.title = (
            <span className="flex items-center gap-x-1">
              {tr(item.title)}
              <Tooltip context={tr(item.titleTip)} />
            </span>
          ))
      } else {
        item.title = tr(item.title)
      }
      return { ...item }
    })
  }, [tr])

  useEffect(() => {
    load()
  }, [])

  const load = (value?: string, time?: Record<string, string>) => {
    const newDate = time || date
    const payload = {
      group_id: value ? Number(value) : Number(active),
      end_date: newDate.endTime || newDate.startTime,
      start_date: newDate.startTime,
    }
    manageStore.getGasData(payload)
  }

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} selectedKey={selectedKey} />
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex  flex-col">
          <span className="w-full font-PingFang text-lg font-semibold	">
            {tr(selectedKey)}
          </span>
          <span className="text_des text-xs">
            <span>{tr('last_time')}</span>
            <span className="ml-2">{formatDateTime(gasData?.epoch_time)}</span>
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
          <DateTime
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              load(undefined, {
                startTime: start,
                endTime: end,
              })
              setDate({
                startTime: start,
                endTime: end,
              })
            }}
          />
          <ExportExcel
            columns={columns}
            data={gasData?.gas_cost_detail_list || []}
          />
        </div>
      </div>
      <div className="card_shadow border_color mt-5 rounded-xl border p-4">
        <Table
          data={gasData?.gas_cost_detail_list || []}
          columns={columns}
          loading={gasLoading}
        />
      </div>
    </>
  )
})
