import { Translation } from "@/components/hooks/Translation";
import { apiUrl, heightDetail } from "@/contents/apiUrl";
import { cid_list, height_list } from "@/contents/detail";
import Content from "@/packages/content";
import useAxiosData from "@/store/useAxiosData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CidTable from '@/src/detail/cidDetail'
import styles from './index.module.scss'
import classNames from "classnames";

export default () => {
  const router = useRouter()
  const { cid } = router.query;
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData()
  const [loading, setLoading] = useState(false)
  const [options,setOptions]= useState<Array<any>>([])
  const [data, setData] = useState({})
  useEffect(() => {
    load()
  }, [cid])

  const load = async () => {
    setLoading(true)
    const optionsResult = await axiosData(apiUrl.tipset_block_message_opt, { cid });
    const newObj = optionsResult?.method_name_list || {};
    const opt:Array<any> = [];
    opt.push({ label: `${tr("all")}` , value: 'all', key:'all' });
    Object.keys(newObj).forEach((key: string) => {
      opt.push({ label: `${tr(key)} (${newObj[key]})` , value: key, key:key });
    });
    setOptions(opt);
    const result = await axiosData(apiUrl.tipset_BlockDetails, { block_cid:cid })
    setData(result?.block_details || {})
    setLoading(false)
  }
  return <div className={classNames(styles.cid,"main_contain")}>
    <div className='mx-2.5 font-PingFang font-semibold text-lg '>
      {tr('chain_cid_detail')}
    </div>
    <div className="mt-4 border rounded-xl p-5 card_shadow border_color text_xs">
      <Content contents={cid_list.headerList} ns={"detail"} data={data} />
    </div>
    <CidTable options={options} cid={ cid} />
  </div>
}