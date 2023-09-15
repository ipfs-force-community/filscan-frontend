import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { deal_list } from "@/contents/detail";
import Content from "@/packages/content";
import useAxiosData from "@/store/useAxiosData";
import { formatDateTime, formatFilNum, get_account_type, unitConversion } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dealMiner from '@/assets/images/dealMiner.svg'
import dealClient from '@/assets/images/dealClient.svg'
import cloud from '@/assets/images/cloud.svg'
import Image from 'next/image'
import { BrowserView, MobileView } from "@/components/device-detect";
import styles from './index.module.scss'
import classNames from "classnames";
import Copy from "@/components/copy";
import copySvgMobile from '@/assets/images/icon-copy.svg';

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const { axiosData } = useAxiosData()
  const { tr } = Translation({ ns: 'detail' });
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])
  const load = async() => {
    const result = await axiosData(apiUrl.detail_deal, { deal_id: Number(id) })
    setData(result?.deal_details)
  }
  return <div className={classNames(styles.deal,"main_contain")}>
    <div className='font-PingFang font-semibold text-lg'>
      {tr('deal_details')}
    </div>
    <div className="mt-4 border rounded-xl p-5 card_shadow border_color text_xs">
      <Content contents={deal_list.list} ns={'detail'} data={data} />
      <BrowserView>
        <div className="flex border-t border_color text_des pt-5 mt-2.5">
          <div className="min-w-[120px] ">
            {tr('deal_hosting') }
          </div>
          <div className="flex gap-x-5 ml-4">
            <div className="flex items-center justify-center gap-y-2 flex-col py-2.5 w-[114px] h-[114px] rounded-[5px] border border-color ">
              <span>{tr(deal_list.content.left_title)}</span>
              <Image src={dealClient} width={36} height={ 36} alt='' />
              {data?.client_id &&<span className="flex gap-x-1 items-center">{get_account_type(data.client_id)}</span> }
            </div>
            <div className="flex items-center justify-center flex-col gap-y-4 py-2.5 w-[383px] h-[114px] rounded-[5px] border border-color ">
              <span className="flex items-center gap-x-1 text_color font-DINPro-Medium">
                <Image src={cloud} width={14} height={14} alt='' />

                { data?.piece_size && unitConversion( data.piece_size)}
              </span>
              <span>
                {formatDateTime(data?.service_start_time)}
                { tr(deal_list.content.time)}
                { formatDateTime(data?.end_time)}
              </span>
              <span>
                {tr(deal_list.content?.cash)}:
                <span className="text_color font-DINPro-Medium"> { data?.storage_price_per_epoch&&formatFilNum(data?.storage_price_per_epoch)}</span>

              </span>
            </div>
            <div className="flex items-center justify-center gap-y-2 flex-col py-2.5 w-[114px] h-[114px] rounded-[5px] border border-color ">
              <span>{tr(deal_list.content.right_title)}</span>
              <Image src={dealMiner} width={36} height={ 36} alt='' />
              {data?.provider_id &&<span className="flex gap-x-1 items-center"> {get_account_type(data.provider_id)}</span> }

            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className={styles.line}></div>
        <div className={styles.title}>
          {tr('deal_hosting') }
        </div>
        <div className={styles.card}>
          <div className={styles.left}>
            <Image src={dealClient} width={45} height={45} alt='' />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{tr(deal_list.content.left_title)}</div>

            {data?.client_id &&
             <span className='copy-row'>
               <span className='text'>{data?.client_id}</span>
               <Copy text={data.client_id} icon={copySvgMobile} className='copy'/>
             </span> }
          </div>
        </div>

        <div className={classNames(styles.space,`flex items-center justify-center flex-col gap-y-4 py-2.5 h-[114px] rounded-[5px] border border-color`)}>
          <span className="flex items-center gap-x-1 text_color font-DINPro-Medium">
            <Image src={cloud} width={14} height={14} alt='' />
            { data?.piece_size && unitConversion( data.piece_size)}
          </span>
          <span>
            {formatDateTime(data?.service_start_time)}
            { tr(deal_list.content.time)}
            { formatDateTime(data?.end_time)}
          </span>
          <span>
            {tr(deal_list.content?.cash)}:
            <span className="text_color font-DINPro-Medium">
              { data?.storage_price_per_epoch&&formatFilNum(data?.storage_price_per_epoch)}
            </span>
          </span>
        </div>

        <div className={styles.card}>
          <div className={styles.left}>
            <Image src={dealClient} width={45} height={45} alt='' />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{tr(deal_list.content.right_title)}</div>
            {data?.provider_id &&
             <span className='copy-row'>
               <span className='text'>{data.provider_id}</span>
               <Copy text={data.provider_id} icon={copySvgMobile} className='copy'/>
             </span>
            }
          </div>
        </div>
      </MobileView>
    </div>
  </div>
}