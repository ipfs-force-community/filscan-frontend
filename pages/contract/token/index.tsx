/** @format */

import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { contract_token } from '@/contents/contract'
import Table from '@/packages/Table'
import useAxiosData from '@/store/useAxiosData'
import { useMemo } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import Tooltip from '@/packages/tooltip'
import { useFilscanStore } from '@/store/FilscanStore'
export default () => {
  const { tr } = Translation({ ns: 'contract' })
  const { isMobile } = useWindow()
  const { data: TokenData, loading } = useAxiosData(apiUrl.contract_ERC20List)
  const { lang } = useFilscanStore() // 使用你的 store 获取 lang 状态

  const columns = useMemo(() => {
    return contract_token.columns(tr).map((v) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          v.render = (value: string, record: any, index) => {
            return <>{`No.${index + 1}`}</>
          }
        }

        if (v.dataIndex === 'total_supply') {
          v.title = () => {
            return (
              <span className="flex items-center gap-x-2">
                <span
                  style={{
                    width: lang == 'en' ? 'min-content' : '',
                    wordBreak: 'initial',
                  }}
                >
                  {' '}
                  {tr('total_supply')}
                </span>
                <Tooltip context={tr('total_supply_tip')} />
              </span>
            )
          }
        }
      }
      v.title = typeof v.title === 'string' ? tr(v.title) : v.title
      return v
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tr, isMobile])

  return (
    <div className="main_contain">
      <div
        className={classNames(
          'mx-2.5 mb-4 flex flex-col gap-y-2.5 text-xl font-medium',
          styles.title,
        )}
      >
        <span>{tr('token_list')}</span>
      </div>
      <div
        className={classNames(
          'card_shadow  border_color flex	items-center rounded-xl border p-5',
          styles.table,
        )}
      >
        <Table
          limit={1000}
          data={TokenData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  )
}
