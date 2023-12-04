/** @format */

import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { account_balance } from '@/contents/account'
import ExportExcel from '@/packages/exportExcel'
import { formatDateTime } from '@/utils'
import manageStore from '@/store/modules/account/manage'
import Groups from '../../Groups'
import { observer } from 'mobx-react'

interface Props {
  selectedKey: string
}

export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { balanceData, balanceLoading } = manageStore
  const [active, setActive] = useState<string>('-1')
  const columns = useMemo(() => {
    return account_balance.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) }
    })
  }, [tr])

  useEffect(() => {
    load()
  }, [])

  const load = (value?: string) => {
    const group_id = value ? Number(value) : Number(active)
    manageStore.getBalanceData({ group_id: group_id })
  }

  return (
    <div className="overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex  flex-col">
          <span className="w-full font-HarmonyOS text-lg font-semibold	">
            {tr(selectedKey)}
          </span>
          <span className="text_des text-xs">
            <span>{tr('last_time')}</span>
            <span className="ml-2">
              {formatDateTime(balanceData?.epoch_time, 'YYYY/MM/DD HH:mm')}
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
            data={balanceData?.address_balance_list || []}
            fileName={tr(selectedKey)}
          />
        </div>
      </div>
      <div className="card_shadow border_color mt-5 overflow-auto rounded-xl border p-4">
        <Table
          data={balanceData?.address_balance_list || []}
          columns={columns}
          loading={balanceLoading}
          // onChange={handleChange}
        />
      </div>
    </div>
  )
})
