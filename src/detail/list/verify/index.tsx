import { Translation } from "@/components/hooks/Translation"
import { verify_tabs } from "@/contents/contract"
import useAxiosData from "@/store/useAxiosData"
import { useEffect, useState } from "react"
import Code from "./Code"
import dynamic from "next/dynamic"
import classNames from "classnames"
import styles from './index.module.scss'
const Read = dynamic(() => import('./Read'), { ssr: false });

export default ({ actorId,verifyData }: { actorId?: string,verifyData:any }) => {
  const { tr } = Translation({ ns: 'contract' });
  const { axiosData } = useAxiosData()
  const [active,setActive] = useState('Verify_code')
  const [data, setData] = useState<any>()

  useEffect(() => {
    setData(verifyData)
  },[verifyData])

  // useEffect(() => {
  //   if (actorId && !verifyData) {
  //     load()
  //   }
  // },[actorId,verifyData])

  // const load = async () => {
  //   const result= await axiosData(apiUrl.contract_verify_des, {
  //     input_address:actorId
  //   })
  //   console.log('---33result',result)
  //   setData({ ...result});

  // }

  return <div data-content={tr('pleaseCheckContractWithPC')} className={classNames(styles.wrap)}>
    <ul className={classNames("flex items-center gap-x-2 des_bg_color rounded-md  w-fit")}>
      {verify_tabs.map(item => {
        return <li
          onClick={ ()=>setActive(item.dataIndex)}
          className={`p-2.5 cursor-pointer  ${active === item.dataIndex ? 'text-primary' : ''}`}
          key={item.dataIndex}>{tr(item.title)}
        </li>
      }) }
    </ul>
    {active === 'Verify_code' && <Code data={data} actorId={actorId} />}
    {active === 'Verify_read' && <Read verifyData={data?.compiled_file || {}} type={'view'} actorId={ actorId}/>}
    {active === 'Verify_write' && <Read verifyData={data?.compiled_file || {}} type={'write'} actorId={ actorId}/>}

  </div>
}