/** @format */
/** @format */

import { apiUrl } from '@/contents/apiUrl'
import fetchData from '@/store/server'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AccountBalance from '@/src/detail/accountBalance'
import Power from '@/src/detail/Power'
import OverView from '@/src/detail/overView'
import { miner_overview, owner_detail } from '@/contents/detail'
import AccountChange from '@/src/detail/accountChange'
import PowerChange from '@/src/detail/powerChange'
import { Translation } from '@/components/hooks/Translation'
import Copy from '@/components/copy'
import classNames from 'classnames'
import styles from './[owner].module.scss'
import Link from 'next/link'
import CopySvgMobile from '@/assets/images/icon-copy.svg'
import useWindow from '@/components/hooks/useWindown'
import { BrowserView, MobileView } from '@/components/device-detect'

export default () => {
  const router = useRouter()
  const { owner } = router.query
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const { tr } = Translation({ ns: 'detail' })
  const { isMobile } = useWindow()
  useEffect(() => {
    if (owner) {
      loadData()
    }
  }, [owner])

  const loadData = async () => {
    setLoading(true)
    const result: any = await fetchData(apiUrl.detail_owner, {
      owner_id: owner,
    })
    setLoading(false)
    setData(result?.account_owner || {})
  }

  return (
    <div className={classNames('main_contain', styles.miner)}>
      <div
        className={
          'DINPro-Medium mb-2.5 flex items-center gap-x-2 text-lg font-medium'
        }
      >
        <BrowserView>
          <span>{owner}</span>
          {owner && typeof owner === 'string' && <Copy text={owner} />}
        </BrowserView>
        <MobileView>
          <span className="copy-row">
            <span className="normal-text">{owner}</span>
            {owner && typeof owner === 'string' && (
              <Copy text={owner} icon={<CopySvgMobile />} className="copy-lg" />
            )}
          </span>
        </MobileView>
      </div>
      <div className="card_shadow w-full rounded-xl">
        <div
          className={classNames(
            'border_color flex w-full border-b',
            styles.column,
          )}
        >
          <AccountBalance
            data={data?.account_indicator || {}}
            loading={loading}
          />
          <Power data={data?.account_indicator || {}} />
        </div>

        <ul
          className={classNames(
            'flex flex-col  gap-y-6 px-7 py-8',
            styles['owner-wrap'],
          )}
        >
          {owner_detail.list.map((item) => {
            if (isMobile) {
              if (item.dataIndex === 'account_address') {
                item.render = (text: string) => {
                  return (
                    <div className={classNames('copy-row')}>
                      <span className="text">
                        <Link className="link" href={`/address/${text}`}>
                          {text}
                        </Link>
                      </span>
                      <Copy
                        text={text}
                        icon={<CopySvgMobile />}
                        className="copy"
                      />
                    </div>
                  )
                }
              }
              if (
                item.dataIndex === 'owned_miners' ||
                item.dataIndex === 'active_miners'
              ) {
                item.render = (text: Array<any>, record: any) => {
                  return (
                    <span className="grid grid-cols-4 gap-4">
                      {text &&
                        Array.isArray(text) &&
                        text?.map((item: any, index: number) => {
                          return (
                            <Link
                              className="link"
                              key={index}
                              href={`/miner/${item}`}
                            >
                              {item}
                            </Link>
                          )
                        })}
                    </span>
                  )
                }
              }
            }

            const { title, render, dataIndex } = item
            const value = data[dataIndex]
            const renderDom = render ? render(value, data) : value

            return (
              <li
                key={dataIndex}
                className={classNames(
                  'flex w-full items-baseline',
                  styles['owner-item-reset'],
                  (item.dataIndex === 'owned_miners' ||
                    item.dataIndex === 'active_miners') &&
                    styles['owner-item'],
                )}
              >
                <div className="text_des w-28 text-sm">{tr(title)}</div>
                <span className="flex-1">{renderDom}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <OverView overView={miner_overview} accountId={owner} />

      <div className={classNames('mt-6 flex gap-x-5', styles.bottom)}>
        <AccountChange accountId={owner} interval={'1m'} />
        <PowerChange accountId={owner} type="owner" />
      </div>
    </div>
  )
}
