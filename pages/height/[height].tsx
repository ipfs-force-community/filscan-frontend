import { Translation } from "@/components/hooks/Translation";
import { heightDetail } from "@/contents/apiUrl";
import { height_list } from "@/contents/detail";
import useAxiosData from "@/store/useAxiosData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
export default () => {
  const router = useRouter()
  const { height } = router.query;
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    load()
  }, [height])

  const load = async () => {
    const result:any = await axiosData(heightDetail, { height:Number(height) })
    setData(result?.tipset_detail)
  }
  return <div className={classNames(styles.height,"main_contain")}>
    <div className='font-PingFang font-semibold text-lg'>
      {tr('height')}
      { height&&<span className="ml-1"> #{height}</span> }
    </div>
    <div className="mt-4 border rounded-xl p-5 card_shadow border_color text_xs">
      <ul className="flex  flex-col gap-y-2.5 p-5 border-b border_color">
        {
          height_list.headerList.map(item => {
            const {dataIndex,render } = item
            let value = data&&data[dataIndex];
            if (render) {
              value = render(value)
            }
            return <li key={item.dataIndex} className="flex items-center">
              <span className="text_des min-w-40">{tr(item.title)}:</span>
              <span>{ value}</span>
            </li>
          })}
      </ul>
      <ul className="flex flex-col gap-y-2.5 p-5 border-b border_color last:border-none">
        {
          height_list.columns.map(item => {
            const {dataIndex,render } = item
            let value = data?.block_basic&&data?.block_basic[dataIndex];
            if (render) {
              value = render(value)
            }
            return <li key={item.dataIndex} className="flex items-center">
              <span className="text_des min-w-40">{tr(item.title)}:</span>
              <span>{value}</span>
            </li>
          })}
      </ul>
    </div>

  </div>
}