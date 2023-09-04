import { Translation } from "@/components/hooks/Translation";
import { heightDetail } from "@/contents/apiUrl";
import { height_list } from "@/contents/detail";
import useAxiosData from "@/store/useAxiosData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  const router = useRouter()
  const { height } = router.query;
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData()
  const [data, setData] = useState({})
  useEffect(() => {
    load()
  }, [height])

  const load = async () => {
    const result = await axiosData(heightDetail, { height:Number(height) })
    console.log('---dd',result)
  }
  return <div className="main_contain">
    <div className='font-PingFang font-semibold text-lg'>
      {tr('height')}
      { height&&<span className="ml-1"> #{height}</span> }
    </div>
    <div className="mt-4 h-full border rounded-xl p-5 card_shadow border_color text_xs">
      <ul className="flex  flex-col gap-y-2.5 p-5 border-b border_color">
        {
          height_list.headerList.map(item => {
            return <li key={item.dataIndex}>
              <span className="text_des min-w-40">{tr(item.title)}:</span>

            </li>
          })}
      </ul>
      <ul className="flex flex-col gap-y-2.5 p-5 border-b border_color last:border-none">
        {
          height_list.columns.map(item => {
            return <li key={item.dataIndex}>
              <span className="text_des min-w-40">{tr(item.title)}:</span>
            </li>
          })}
      </ul>
    </div>

  </div>
}