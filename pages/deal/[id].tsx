import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { deal_list } from '@/contents/detail'
import Content from '@/packages/content'
import useAxiosData from '@/store/useAxiosData'
import { formatDateTime, formatFilNum, unitConversion } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DealMiner from '@/assets/images/dealMiner.svg'
import DealClient from '@/assets/images/dealClient.svg'
import Cloud from '@/assets/images/cloud.svg'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './index.module.scss'
import classNames from 'classnames'
import Copy from '@/components/copy'
import CopySvgMobile from '@/assets/images/icon-copy.svg'
import AccountLink from '@/components/accountLink'

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { axiosData } = useAxiosData()
  const { tr } = Translation({ ns: 'detail' })
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])
  const load = async () => {
    const result = await axiosData(apiUrl.detail_deal, { deal_id: Number(id) })
    setData(result?.deal_details)
  }
  return (
    <div className={classNames(styles.deal, 'main_contain')}>
      <div className="font-HarmonyOS text-lg font-semibold">
        {tr('deal_details')}
      </div>
      <div className="card_shadow border_color text_xs mt-4 rounded-xl border p-5">
        <Content contents={deal_list.list} ns={'detail'} data={data} />
        <BrowserView>
          <div className="border_color text_des mt-2.5 flex border-t pt-5">
            <div className="min-w-[120px] ">{tr('deal_hosting')}</div>
            <div className="ml-4 flex gap-x-5">
              <div className="border-color flex h-[114px] w-[114px] flex-col items-center justify-center gap-y-2 rounded-[5px] border py-2.5 ">
                <span>{tr(deal_list.content.left_title)}</span>
                <DealClient width={36} height={36} />
                {data?.client_id && (
                  <span className="flex items-center gap-x-1">
                    <AccountLink value={data.client_id} />
                  </span>
                )}
              </div>
              <div className="border-color flex h-[114px] w-[383px] flex-col items-center justify-center gap-y-4 rounded-[5px] border py-2.5 ">
                <span className="text_color font-HarmonyOS_Medium flex items-center gap-x-1">
                  <Cloud width={14} height={14} />
                  {data?.piece_size && unitConversion(data.piece_size)}
                </span>
                <span>
                  {formatDateTime(data?.service_start_time)}
                  {tr(deal_list.content.time)}
                  {formatDateTime(data?.end_time)}
                </span>
                <span>
                  {tr(deal_list.content?.cash)}:
                  <span className="text_color font-HarmonyOS_Medium">
                    {data?.storage_price_per_epoch &&
                      formatFilNum(data?.storage_price_per_epoch)}
                  </span>
                </span>
              </div>
              <div className="border-color flex h-[114px] w-[114px] flex-col items-center justify-center gap-y-2 rounded-[5px] border py-2.5 ">
                <span>{tr(deal_list.content.right_title)}</span>
                <DealMiner width={36} height={36} />
                {data?.provider_id && (
                  <span className="flex items-center gap-x-1">
                    <AccountLink value={data.provider_id} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div className={styles.line}></div>
          <div className={styles.title}>{tr('deal_hosting')}</div>
          <div className={styles.card}>
            <div className={styles.left}>
              <DealClient width={45} height={45} />
            </div>
            <div className={styles.right}>
              <div className={styles.name}>
                {tr(deal_list.content.left_title)}
              </div>

              {data?.client_id && (
                <span className="copy-row">
                  <span className="text">{data?.client_id}</span>
                  <Copy
                    text={data.client_id}
                    icon={<CopySvgMobile />}
                    className="copy"
                  />
                </span>
              )}
            </div>
          </div>

          <div
            className={classNames(
              styles.space,
              `border-color flex h-[114px] flex-col items-center justify-center gap-y-4 rounded-[5px] border py-2.5`,
            )}
          >
            <span className="text_color font-HarmonyOS_Medium flex items-center gap-x-1">
              <Cloud width={14} height={14} />
              {data?.piece_size && unitConversion(data.piece_size)}
            </span>
            <span className={classNames(styles.time)}>
              {formatDateTime(data?.service_start_time)}
              {tr(deal_list.content.time)}
              {formatDateTime(data?.end_time)}
            </span>
            <span>
              <span className={styles.cash}>
                {tr(deal_list.content?.cash)}:
              </span>
              <span className="text_color font-HarmonyOS_Medium">
                {data?.storage_price_per_epoch &&
                  formatFilNum(data?.storage_price_per_epoch)}
              </span>
            </span>
          </div>

          <div className={styles.card}>
            <div className={styles.left}>
              <DealMiner width={45} height={45} />
            </div>
            <div className={styles.right}>
              <div className={styles.name}>
                {tr(deal_list.content.right_title)}
              </div>
              {data?.provider_id && (
                <span className="copy-row">
                  <span className="text">{data.provider_id}</span>
                  <Copy
                    text={data.provider_id}
                    icon={<CopySvgMobile />}
                    className="copy"
                  />
                </span>
              )}
            </div>
          </div>
        </MobileView>
      </div>
    </div>
  )
}
