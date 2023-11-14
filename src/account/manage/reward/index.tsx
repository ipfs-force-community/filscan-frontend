/** @format */

import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { account_reward } from '@/contents/account'
import ExportExcel from '@/packages/exportExcel'
import DateTime from '@/src/account/DateTIme'
import { formatDateTime } from '@/utils'
import { useHash } from '@/components/hooks/useHash'
import Detail from './Detail'
import manageStore from '@/store/modules/account/manage'
import Groups from '../../Groups'
import { observer } from 'mobx-react'
interface Props {
  selectedKey: string
}
export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { rewardData, rewardLoading } = manageStore
  const { hashParams } = useHash()
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
    return account_reward.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) }
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
    manageStore.getRewardData(payload)
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
            <span className="ml-2">
              {formatDateTime(rewardData?.epoch_time)}
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
            data={rewardData?.reward_detail_list || []}
            fileName={tr(selectedKey)}
          />
        </div>
      </div>
      <div className="card_shadow border_color mt-5 rounded-xl border p-4">
        <Table
          data={rewardData?.reward_detail_list || []}
          columns={columns}
          loading={rewardLoading}
        />
      </div>
    </>
  )
})
