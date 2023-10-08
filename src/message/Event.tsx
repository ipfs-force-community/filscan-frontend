import { Translation } from "@/components/hooks/Translation";
import Loading from "@/components/loading";
import { apiUrl } from "@/contents/apiUrl";
import { message_detail } from "@/contents/detail"
import Content from "@/packages/content";
import NoData from "@/packages/noData";
import Skeleton from "@/packages/skeleton";
import useAxiosData from "@/store/useAxiosData";
import { useEffect, useState } from "react"

export default ({ cid }: {cid?:string | string[]}) => {
  const { axiosData } = useAxiosData()
  const [loading, setLoading] = useState(false);
  const [data,setData]= useState([])

  useEffect(() => {
    load()
  }, [cid])

  const load = async () => {
    setLoading(true)
    const result = await axiosData(apiUrl.detail_message_event, { cid })
    setLoading(false)
    setData(result?.logs || [])
  }

  if (loading) {
    return <Loading />
  }

  if (!loading &&data.length === 0) {
    return <div className="card_shadow border border_color rounded-xl p-5 min-h-[500px]">
      <NoData />
    </div>
  }
  return <div className="card_shadow border border_color rounded-xl p-5 min-h-[500px]">
    {data.map((item,index) => {
      return <Content contents={message_detail.eventLog} className="border-b border_color mt-5 last:border-none" ns={"detail"} data={item} key={index} />

    })}
  </div>
}