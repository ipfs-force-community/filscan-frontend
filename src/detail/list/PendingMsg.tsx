import { BrowserView, MobileView } from '@/components/device-detect'
import { Translation } from '@/components/hooks/Translation'
import { message_list } from '@/contents/detail'
import Table from '@/packages/Table'
import { formatNumber } from '@/utils'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import { pendingMsg } from '@/contents/apiUrl'
import useAxiosData from '@/store/useAxiosData'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

interface Props {
  account_id: string
  account_address: string
}
export default observer((props: Props) => {
  const { account_id, account_address } = props
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData } = useAxiosData()
  const [pendingData, setPendingData] = useState<any>({})
  const { theme, lang } = filscanStore

  useEffect(() => {
    if (account_id || account_address) {
      loadPending(account_id, account_address)
    } else {
      setPendingData({})
    }
  }, [account_id, account_address])
  //pending
  //获取pendding消息
  const loadPending = async (account_id: string, account_address?: string) => {
    const result = await axiosData(
      pendingMsg,
      {
        account_id,
        account_address,
      },
      { isCancel: false },
    )

    const data: Array<any> = []
    result?.messages_pool_list?.forEach((v: any) => {
      data.push({ ...v.message_basic, exit_code: 'Pending' })
    })
    setPendingData({
      dataSource: data,
      total: result?.total_count,
    })
  }
  const columns = useMemo(() => {
    return message_list({}, {}).map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [theme, tr])
  return (
    <>
      <div className="mx-2.5 mb-2.5 mt-5 flex items-center justify-between">
        <span className="DINPro-Medium text-lg  font-medium">
          {tr('pending_title')}
        </span>
      </div>
      <MobileView>
        <div className="text_des text-xs">
          {tr('pending_total', { value: formatNumber(pendingData?.total) })}
        </div>
      </MobileView>
      <div
        className={classNames(
          'card_shadow border_color  min-h-[150px] rounded-xl border p-5',
          styles.table,
          styles.reset,
        )}
      >
        <BrowserView>
          <div className="text_des mb-4 text-xs">
            {tr('pending_total', { value: formatNumber(pendingData?.total) })}
          </div>
        </BrowserView>
        <Table
          className={styles['padding-table']}
          limit={5}
          data={pendingData?.dataSource || []}
          total={pendingData?.total}
          columns={columns}
          loading={false}
        />
      </div>
    </>
  )
})
