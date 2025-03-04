/** @format */

import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { account_lucky } from '@/contents/account'
import ExportExcel from '@/packages/exportExcel'
import { formatDateTime } from '@/utils'
import manageStore from '@/store/modules/account/manage'
import Groups from '../../Groups'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './index.module.scss'
import MTable from '@/packages/mobile/table'
import useWindow from '@/components/hooks/useWindown'
import classNames from 'classnames'
interface Props {
  selectedKey: string
}
export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { luckyData, luckyLoading } = manageStore
  const [active, setActive] = useState<string>('-1')
  const { isMobile } = useWindow()
  const columns = useMemo(() => {
    return account_lucky.columns(tr).map((item) => {
      if (isMobile) {
        item.fixed = 'auto'
        item.width = 'unset'
      }
      return { ...item, title: tr(item.title) }
    })
  }, [tr, isMobile])

  useEffect(() => {
    load()
  }, [])

  const load = (value?: string) => {
    const group_id = value ? Number(value) : Number(active)
    manageStore.getLuckyData({ group_id: group_id })
  }

  return (
    <div className={styles.wrap}>
      <BrowserView>
        <div className="flex items-center justify-between">
          <div className="flex  flex-col">
            <span className="w-full font-HarmonyOS text-lg font-semibold	">
              {tr(selectedKey)}
            </span>
            <span className="text_des text-xs">
              <span>{tr('last_time')}</span>
              <span className="ml-2">
                {formatDateTime(luckyData?.epoch_time, 'YYYY/MM/DD HH:mm')}
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
              data={luckyData?.lucky_rate_list || []}
              fileName={tr(selectedKey)}
            />
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className={styles['title-wrap']}>
          <div className="flex  flex-col">
            <span className={styles.title}>{tr(selectedKey)}</span>
            <span className={styles.time}>
              <span>{tr('last_time')}</span>
              <span className="ml-2">
                {formatDateTime(luckyData?.epoch_time, 'YYYY/MM/DD HH:mm')}
              </span>
            </span>
          </div>
          <div className={styles.group}>
            <Groups
              selectGroup={active}
              onChange={(value: string) => {
                load(value)
                setActive(value)
              }}
            />
          </div>
        </div>
      </MobileView>
      <div
        className={classNames(
          'card_shadow border_color mt-5 rounded-xl border p-4',
          styles['table-wrap'],
        )}
      >
        <BrowserView>
          <Table
            data={luckyData?.lucky_rate_list || []}
            columns={columns}
            loading={luckyLoading}
          />
        </BrowserView>
        <MobileView>
          <MTable
            scroll={{ x: 'max-content' }}
            dataSource={luckyData?.lucky_rate_list || []}
            columns={columns as any}
            loading={luckyLoading}
          />
        </MobileView>
      </div>
    </div>
  )
})
