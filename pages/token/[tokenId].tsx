/** @format */

import useAxiosData from '@/store/useAxiosData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiUrl } from '@/contents/apiUrl'
import { token_details } from '@/contents/contract'
import Content from '@/packages/content'
import Image from '@/packages/image'
import { Translation } from '@/components/hooks/Translation'
import List from '@/src/fevm/list'
import styles from './[tokenId].module.scss'
import useWindow from '@/components/hooks/useWindown'
import TwitterIcon from '@/assets/images/twitter.svg'
import NetworkIcon from '@/assets/images/network.svg'
import classNames from 'classnames'
import Link from 'next/link'
import Copy from '@/components/copy'

export default () => {
  const router = useRouter()
  const { tokenId } = router.query
  const { tr } = Translation({ ns: 'contract' })
  const { axiosData } = useAxiosData()
  const [marketData, setMarket] = useState({})
  const [overviewData, setOverview] = useState<any>({})
  const { isMobile } = useWindow()

  useEffect(() => {
    if (tokenId) {
      axiosData(
        apiUrl.contract_ERC20Summary,
        {
          contract_id: tokenId,
        },
        { isCancel: false },
      ).then((res: any) => {
        setOverview(res || {})
      })
      axiosData(
        apiUrl.contract_ERC20Market,
        {
          contract_id: tokenId,
        },
        { isCancel: false },
      ).then((res: any) => {
        setMarket({ ...res, tokenName: res?.token_name } || {})
      })
    }
    load()
  }, [tokenId])
  const load = () => {}
  return (
    <div className={classNames('main_contain', styles.wrap)}>
      <div
        className={classNames(
          'mb-4 flex items-center justify-between gap-x-1 px-2.5 font-HarmonyOS_Bold text-xl',
          styles.token,
        )}
      >
        <div className="flex items-center gap-x-1">
          {overviewData?.token_name && (
            <Image width={40} height={40} src={overviewData.icon_url} alt="" />
          )}
          {overviewData?.token_name?.toLocaleUpperCase()}
        </div>
        <div className="flex gap-x-2">
          {overviewData.twitter_link && (
            <span
              onClick={() => {
                if (overviewData.twitter_link) {
                  window.open(overviewData.twitter_link)
                }
              }}
              className={classNames(
                'border_color reverse_color cursor-pointer rounded-[5px] border p-[4px] hover:bg-primary',
              )}
            >
              <TwitterIcon />
            </span>
          )}
          {overviewData.main_site && (
            <span
              onClick={() => {
                if (overviewData.main_site) {
                  window.open(overviewData.main_site)
                }
              }}
              className={classNames(
                'border_color reverse_color cursor-pointer rounded-[5px] border p-[4px] hover:bg-primary',
              )}
            >
              <NetworkIcon />
            </span>
          )}
        </div>
      </div>
      <div className={classNames('flex gap-x-5', styles['card-wrap'])}>
        {token_details.headerList.map((tokenItem, index) => {
          const showData =
            tokenItem.title === 'market' ? marketData : overviewData
          if (isMobile && tokenItem.title === 'market') {
            tokenItem.list.forEach((value) => {
              if (value.dataIndex === 'contract_id') {
                value.render = (text: string, record: any) => {
                  if (!text) {
                    return '--'
                  }
                  return (
                    <span className="flex items-center gap-x-2">
                      <Link href={`/address/${text}`} className="link">
                        {text}
                      </Link>
                      <Copy text={text} />
                    </span>
                  )
                }
              }
            })
          }

          return (
            <div
              className={classNames(
                'border_color card_shadow flex-1 rounded-lg border px-2.5 py-5',
                styles['item'],
              )}
              key={index}
            >
              <div
                className={classNames(
                  'px-2.5 text-base font-medium',
                  styles.title,
                )}
              >
                {tr(tokenItem.title)}
              </div>
              <Content
                className={classNames(styles['content'])}
                contents={tokenItem.list}
                ns={'contract'}
                data={showData || {}}
              />
            </div>
          )
        })}
      </div>
      <List
        className={classNames(styles['list-wrap'])}
        tabList={token_details.tabList}
        defaultActive={'transfer'}
        type="token"
        ids={tokenId}
      />
    </div>
  )
}
