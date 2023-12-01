/** @format */

import { Translation } from '@/components/hooks/Translation'
import Breadcrumb from '@/packages/breadcrumb'
import { useEffect, useMemo, useState } from 'react'
import { formatDateTime, getCalcTime } from '@/utils'
import ExportExcel from '@/packages/exportExcel'
import Table from '@/packages/Table'
import DateTime from '@/src/account/DateTIme'
import { account_reward } from '@/contents/account'
import manageStore from '@/store/modules/account/manage'
import { observer } from 'mobx-react'

/** @format */
interface Props {
  miner?: string | number | null
  selectedKey: string
}
export default observer((props: Props) => {
  const { miner, selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { rewardDetailData, rewardDetailLoading } = manageStore

  const routerItems = useMemo(() => {
    if (miner && typeof miner === 'string') {
      return [
        {
          title: tr('overview_reward'),
          path: '/account#reward',
        },
        {
          title: <span>{miner}</span>,
          path: `/account#reward?miner=${miner}`,
        },
      ]
    }
    return []
  }, [miner])

  const [date, setDate] = useState({
    startTime: formatDateTime(getCalcTime(6), 'YYYY-MM-DDTHH:mm:ssZ'),
    endTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ',
    ),
  })

  useEffect(() => {
    if (miner) {
      load()
    }
  }, [miner])

  const load = (time?: Record<string, string>) => {
    const newDate = time || date
    if (miner) {
      const payload = {
        miner_id: miner,
        end_date: newDate.endTime || newDate.startTime,
        start_date: newDate.startTime,
      }
      manageStore.getRewardDetailData(payload)
    }
  }

  const columns = useMemo(() => {
    return account_reward.columns(tr, 'detail').map((item: any) => {
      return { ...item, title: tr(item.title) }
    })
  }, [tr])

  return (
    <>
      {routerItems && routerItems.length > 0 && (
        <Breadcrumb items={routerItems} />
      )}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex  flex-col">
          <span className="w-full font-HarmonyOS text-lg font-semibold	">
            {miner}
          </span>
          <span className="text_des text-xs">
            <span>{tr('last_time')}</span>
            <span className="ml-2">
              {formatDateTime(rewardDetailData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className="flex gap-x-2.5">
          <DateTime
            showEnd={true}
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              load({
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
            data={rewardDetailData?.reward_detail_list || []}
            fileName={tr(selectedKey) + miner ? String(miner) : ''}
          />
        </div>
      </div>
      <div className="card_shadow border_color mt-5 overflow-auto rounded-xl border p-4">
        <Table
          data={rewardDetailData?.reward_detail_list || []}
          columns={columns}
          loading={rewardDetailLoading}
        />
      </div>
    </>
  )
})
