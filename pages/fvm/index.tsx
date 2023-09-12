import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl"
import useAxiosData from "@/store/useAxiosData"
import { useEffect, useMemo, useState } from "react";
import Image from '@/packages/image'

export default () => {
//  const [fvmListOpt, setFvmList] = useState<any>([])
  const { tr } = Translation({ ns: 'fvm' });
  const { data, loading } = useAxiosData(apiUrl.fvm_category);
  const {axiosData } = useAxiosData();
  const [active, setActive] = useState('all')
  const [content,setContent]= useState([])
  const fvmListOpt = useMemo(() => {
    let num = 0;
    let newData:Array<any>=[]
    data?.forEach((v:any) => {
      num = num + v.num
      newData.push({...v,value:v.label})
    })
    return [{ label: 'All',value:'all', num },...newData]
  }, [data])
  useEffect(() => {
    load()
  },[])

  const load = (act?: string) => {
    const category = act||active
    axiosData(apiUrl.fvm_items, {
      category
    }).then((result: any) => {
      setContent(result || []);
    });
  }
  const handleClick = (item: any) => {
    setActive(item.value)
    load(item.value)
  }

  return <div className="main_contain">
    <h3 className="text-lg font-DINPro-Medium mb-4">Explore FVM on FIlscan</h3>
    <div className="flex gap-x-5">
      <ul className="w-[210px] border border_color rounded-lg card_shadow px-4 py-5">
        {fvmListOpt.map(item => {
          return <li
            className={`flex items-center justify-between px-5 h-10 text-sm cursor-pointer rounded-md ${active === item.value ? 'bg-bg_hover text-primary' : 'text_des'}`}
            key={item.label} onClick={() => {handleClick(item)}}>
            <span>
              { tr(item.label)}
            </span>
            <span>{ item.num}</span>
          </li>
        })}
        <li className="primary_btn !w-full mt-[200px]">
          { tr('share')}
        </li>
      </ul>
      <div className="flex-1">
        {active === 'all'&&<div className="text-lg font-DINPro-Medium mb-5"> Hot Product</div>}
        <ul className="flex flex-wrap gap-4">
          {content.map((item:any,index:number) => {
            return <li key={index } className="flex justify-between items-center w-[240px] h-[78px] px-4 py-5 border border_color card_shadow rounded-[12px] ">
              <div className="flex items-center gap-x-1">
                <Image src={item.logo} alt='' width='36' height='36' />
                <span className="flex flex-col ">
                  <span className="text-lg font-DINPro-Bold">{item?.name||''}</span>
                  <span className="text-xs text_des">{item?.detail||''}</span>
                </span>
              </div>
              <div className="flex gap-x-2">
                { item.twitter && <span onClick={() => {
                  if (item.twitter) {
                    window.open(item.twitter);
                  }
                }}>
                  <Image src={`https://filscan-v2.oss-accelerate.aliyuncs.com/fvm_manage/images/twitter.svg`} alt="" width='20' height='20' />
                </span>
                }
                { item.main_site && <span onClick={() => {
                  if (item.main_site) {
                    window.open(item.main_site);
                  }
                }}>
                  <Image src={`https://filscan-v2.oss-accelerate.aliyuncs.com/fvm_manage/images/network.svg`} alt="" width='20' height='20' />
                </span>
                }
              </div>
            </li>
          })}

        </ul>
      </div>
    </div>
  </div>
}