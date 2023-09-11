import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { message_detail } from "@/contents/detail"
import Content from "@/packages/content";
import NoData from "@/packages/noData";
import Skeleton from "@/packages/skeleton";
import useAxiosData from "@/store/useAxiosData";
import { Pagination } from "antd";
import { useEffect, useState } from "react"

export default ({ actorId }: {actorId?:string | string[]}) => {
  const { axiosData } = useAxiosData()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total,setTotal]= useState(0)

  useEffect(() => {
    if (actorId) {
      load()

    }
  }, [actorId])

  const load = async (cur?:number) => {
    setLoading(true);
    const showIndex= cur||current
    const result = await axiosData(apiUrl.contract_verify_logs, {
      actor_id: actorId,
      page: showIndex -1,
      limit:5
    })
    setLoading(false)
    setData(result?.event_list || [])
    setTotal(result?.total_count)
  }

  const handleChange = (cur: number) => {
    setCurrent(cur);
    load(cur)
  }

  if (loading) {
    return (
      <div className='main_contain'>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!loading &&data.length === 0) {
    return <div className="card_shadow border border_color rounded-xl p-5 min-h-[500px]">
      <NoData />
    </div>
  }
  return <div className="card_shadow border border_color rounded-xl p-5 min-h-[500px]">
    {data.map((item,index) => {
      return <Content contents={message_detail.eventLog} ns={"detail"} data={item} key={index} />
    })}
    <Pagination showQuickJumper className={`custom_Pagination`} pageSize={5} current={current} total={total} onChange={handleChange} />

  </div>
}