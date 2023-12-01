/** @format */

import useAxiosData from '@/store/useAxiosData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiUrl } from '@/contents/apiUrl'
import { nft_details } from '@/contents/contract'
import Content from '@/packages/content'
import Image from '@/packages/image'
import { Translation } from '@/components/hooks/Translation'
import List from '@/src/fevm/list'
import styles from './index.module.scss'
import classNames from 'classnames'
import TwitterIcon from '@/assets/images/twitter.svg'
import NetworkIcon from '@/assets/images/network.svg'
import { BrowserView, MobileView } from '@/components/device-detect'
export default () => {
  const router = useRouter()
  const { nftId } = router.query
  const { tr } = Translation({ ns: 'contract' })
  const { axiosData } = useAxiosData()
  const [overviewData, setOverview] = useState<any>({})

  useEffect(() => {
    if (nftId) {
      axiosData(
        apiUrl.contract_FnsSummary,
        {
          contract: nftId,
        },
        { isCancel: false },
      ).then((res: any) => {
        setOverview(res || {})
      })
    }
  }, [nftId])
  return (
    <div className={classNames(styles.nft, 'main_contain')}>
      <div
        className={classNames(
          'font-HarmonyOS_Bold flex items-center justify-between gap-x-1 px-2.5 text-xl',
          styles.token,
        )}
      >
        <div className="font-HarmonyOS_Bold mb-4 flex items-center gap-x-1 text-xl">
          {overviewData?.token_name && (
            <Image width={40} height={40} src={overviewData.logo} alt="" />
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

      <div className={classNames(styles['mobile-column'], 'flex gap-x-5')}>
        {nft_details.headerList.map((tokenItem, index) => {
          return (
            <>
              <MobileView>
                <div className="nft-title px-2.5 text-base font-medium">
                  {tr(tokenItem.title)}
                </div>
              </MobileView>
              <div
                className="border_color card_shadow nft-card flex-1 rounded-lg border px-2.5 py-5"
                key={index}
              >
                <BrowserView>
                  <div className="px-2.5 text-base font-medium">
                    {tr(tokenItem.title)}
                  </div>
                </BrowserView>
                <Content
                  contents={tokenItem.list}
                  ns={'contract'}
                  data={overviewData || {}}
                />
              </div>
            </>
          )
        })}
      </div>
      <List
        tabList={nft_details.tabList}
        defaultActive={'transfer'}
        type="nfts"
        ids={nftId}
      />
    </div>
  )
}
