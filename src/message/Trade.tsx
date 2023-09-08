import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { message_detail } from "@/contents/detail"
import Table from "@/packages/Table"
import { useFilscanStore } from "@/store/FilscanStore";
import useAxiosData from "@/store/useAxiosData";
import { useEffect, useMemo, useState } from "react"

export default ({ cid }: {cid?:string | string[]}) => {
  const { tr } = Translation({ ns: 'detail' });
  const { theme, lang } = useFilscanStore();
  const { axiosData } = useAxiosData()
  const [loading, setLoading] = useState(false);
  const [data,setData]= useState([])

  useEffect(() => {
    load()
  }, [cid])
  const load = async () => {
    setLoading(true)
    const result = await axiosData(apiUrl.detail_message_trans, { cid })
    setLoading(false)
    setData(result?.internal_transfers || [])
  }

  const columns = useMemo(() => {
    return message_detail.trade.map(item => {
      return {...item, title: tr(item.title)}
    })
  }, [lang])

  return <div className="card_shadow border border_color rounded-xl p-5 min-h-[500px]">
    <Table
      data={data}
      columns={columns}
      loading={loading}
    />
  </div>
}