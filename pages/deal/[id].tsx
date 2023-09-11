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
  return <div className="main_contain">
    <div className='font-PingFang font-semibold text-lg'>
      {tr('deal_details')}
    </div>
    <div className="mt-4 h-full border rounded-xl p-5 card_shadow border_color text_xs">
      <Content contents={deal_list.list} ns={'detail'} data={data} />
      <div className="flex border-t border_color text_des pt-5 mt-2.5">
        <div className="w-28 min-w-28 ">
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
    </div>
  </div>
}