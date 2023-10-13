import { Translation } from "@/components/hooks/Translation";
import useWindow from "@/components/hooks/useWindown";
import { apiUrl } from "@/contents/apiUrl";
import { contract_log } from "@/contents/contract";
import Content from "@/packages/content";
import NoData from "@/packages/noData";
import Skeleton from "@/packages/skeleton";
import useAxiosData from "@/store/useAxiosData";
import { Pagination } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react"
import styles from './EventLog.module.scss'
export default ({ actorId }: {actorId?:string | string[]}) => {
  const { axiosData,loading } = useAxiosData()
  //const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total,setTotal]= useState(0)
  const {isMobile} = useWindow()
  useEffect(() => {
    if (actorId) {
      load()

    }
  }, [actorId])

  const load = async (cur?:number) => {
    // setLoading(true);
    const showIndex= cur||current
    const result = await axiosData(apiUrl.contract_verify_logs, {
      actor_id: actorId,
      page: showIndex -1,
      limit:5
    })
    // setLoading(false)
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
    return <NoData />
  }
  return <>
    <div className={classNames(styles.wrap)}>
      {data.map((item,index) => {
        return <Content contents={contract_log} className={classNames("border-b border_color mt-5 last:border-none",styles.content)} ns={"contract"} data={item} key={index} />
      })}
    </div>
    <Pagination showQuickJumper showLessItems={isMobile} className={`custom_Pagination`} style={{float:'right'}} pageSize={5} current={current} total={total} onChange={handleChange} />
  </>
}