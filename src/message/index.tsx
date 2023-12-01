/** @format */

import { BrowserView, MobileView } from '@/components/device-detect'
import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import { apiUrl } from '@/contents/apiUrl'
import { message_detail } from '@/contents/detail'
import Content from '@/packages/content'
import NoData from '@/packages/noData'
import useAxiosData from '@/store/useAxiosData'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { get } from 'lodash'
import { formatFilNum } from '@/utils'
import Segmented from '@/packages/segmented'
import Trade from './Trade'
import Event from './Event'
import Loading from '@/components/loading'
import AccountLink from '@/components/accountLink'

export default ({ cid }: { cid: string | string[] }) => {
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData, loading } = useAxiosData()
  const [data, setData] = useState<any>({})
  const [dataLoading, setDataLoading] = useState(true)
  const [TransferData, setTransfer] = useState<any>(undefined)
  const [TransferNFTData, setTransferNft] = useState<any>(undefined)
  // const [isF4, setIsF4] = useState(false);
  const [swap, setSwap] = useState()
  const { hash } = useHash()

  const active = useMemo(() => {
    if (hash) {
      return hash
    }
    return 'detail'
  }, [hash])

  useEffect(() => {
    if (cid) {
      load()
    }
  }, [cid])

  const load = async () => {
    const result: any = await axiosData(apiUrl.detail_message, {
      message_cid: cid,
    })
    setDataLoading(false)
    setData(result?.MessageDetails || {})
    if (result?.MessageDetails.message_basic?.cid) {
      loadTrans(result?.MessageDetails.message_basic?.cid)
    }
  }

  const loadTrans = (id: string) => {
    //erc20
    if (id) {
      axiosData(apiUrl.contract_transferInMessage, { cid: id }).then(
        (result: any) => {
          setTransfer(result?.items || [])
        },
      )
      //nft
      axiosData(apiUrl.contract_transferInMessageNft, { cid: id }).then(
        (result: any) => {
          setTransferNft(result?.items || [])
        },
      )

      //contract_swap
      axiosData(apiUrl.contract_swap, { cid: id }).then((result: any) => {
        setSwap(result?.swap_info)
      })
    }
  }

  if (loading) {
    return <Loading />
  }
  if (!loading && Object.keys(data).length === 0) {
    return <NoData />
  }

  const renderItemChild = () => {
    switch (active) {
      case 'trade':
        return <Trade cid={cid} />
      case 'event_log':
        return <Event cid={cid} />
      default:
        return (
          <>
            <div
              className={classNames(
                styles.detail,
                'mb-5 flex flex-col gap-y-5',
              )}
            >
              <div
                className={classNames(
                  'card_shadow border_color rounded-xl border p-5',
                  styles['content-wrap'],
                )}
              >
                <Content
                  ns="detail"
                  contents={message_detail.trans}
                  data={{
                    ...data,
                    base_cid: cid,
                    message_ERC20Trans: TransferData,
                    nftTrans: TransferNFTData,
                    swap_info: swap,
                  }}
                />
              </div>
            </div>
            <MobileView>
              <div className={styles.title}>{tr('transfer_records')}</div>
              {get(data, 'consume_list')?.map((n: any, index: number) => {
                return (
                  <div className={styles.card} key={`card-${index}`}>
                    <div className={styles['card-item']}>
                      <div className={classNames(styles['card-item-label'])}>
                        {tr('from_ath')}：
                      </div>
                      <div className={styles['card-item-value']}>
                        <AccountLink value={n['from']} />
                      </div>
                    </div>
                    <div className={styles['card-item']}>
                      <div className={classNames(styles['card-item-label'])}>
                        {tr('to_ath')}：
                      </div>
                      <div className={styles['card-item-value']}>
                        <AccountLink value={n['to']} />
                      </div>
                    </div>
                    <div className={styles['card-item']}>
                      <div className={classNames(styles['card-item-label'])}>
                        {tr('value')}：
                      </div>
                      <div className={styles['card-item-value']}>
                        {' '}
                        {formatFilNum(n['value'], false, false, 4) || '--'}
                      </div>
                    </div>
                    <div className={styles['card-item']}>
                      <div className={classNames(styles['card-item-label'])}>
                        {tr('consume_type')}：
                      </div>
                      <div className={styles['card-item-value']}>
                        {' '}
                        {tr(n['consume_type'])}
                      </div>
                    </div>
                  </div>
                )
              })}
            </MobileView>
            <div className={classNames(styles.detail, 'flex flex-col gap-y-5')}>
              <div className="card_shadow border_color rounded-xl border p-5">
                <Content
                  ns="detail"
                  contents={message_detail.detail}
                  data={{
                    ...data,
                    message_ERC20Trans: TransferData,
                    nftTrans: TransferNFTData,
                  }}
                />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className={classNames(styles.message, 'main_contain')}>
      <div
        className={classNames('m-2.5 flex items-center', styles['title-wrap'])}
      >
        <span
          className={classNames(
            'font-HarmonyOS_Bold text-lg font-semibold',
            styles['top-title'],
          )}
        >
          {tr(message_detail?.title || '')}
        </span>
        <Segmented
          data={message_detail.tabs}
          defaultActive="detail"
          defaultValue={active}
          ns={'detail'}
          isHash={true}
        />
      </div>
      {renderItemChild()}
    </div>
  )
}
