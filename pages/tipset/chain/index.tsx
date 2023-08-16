/** @format */

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import CidDetail from '@/src/chain/cid_detail'
import styles from "./index.module.scss";
import Router,{ useRouter } from 'next/router'

import {
  LoadingOutlined,LeftOutlined,RightOutlined  
} from '@ant-design/icons';
import { Pagination } from "antd";
import { pageLimit } from "@/contants/varible";
// import { notification, Pagination } from "antd";
// import { isMobile } from "@/utils/utils";

export default () => {
  const [listData, setListData] = useState<any>([]); //列表
  const [current,setCurrent]= useState(1); //
   const [loading, setLoading] = useState(false);
  // const [maxHeight, setMaxHeight] = useState(0);
    const [record,setRecord] = useState<any>()
  const router = useRouter();
  const [total,setTotal] = useState(0)
  const { cid,height } = router.query;


  const heightDetail = useMemo(() => {
    const data = listData.filter((v: any) => Number(v.height) === Number(height));
    return data
  }, [height, listData])


  useEffect(() => { 
    //  postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
    //   setMaxHeight(res?.result?.height || 0);
    //  })
    load();
  }, [height])



  const load = (cur?:number) => {
    const index = cur || current
    setLoading(true)
    let obj = {}
    if (height) { 
      obj = {
        start: Number(height),
        input_type:'height'
      }
    }
     postAxios(apiUrl.tipset_chain, {
      filters: {
        limit:10,
         index: index - 1,
         ...obj,
        
      }
    } ).then(
        (res: any) => {
        setLoading(false)
        const data = res?.result?.tipset_list || [];
        setTotal(res.result?.total_count ||0)
        setListData(data)
      }
    );
 
    
  };

  
  const handleChange = (value:any) => { 
    setRecord(value);  
  }

    if (loading) { 
         return <div style={{margin:'20% 45%'}}>
         <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} /> 
      </div> 
    }
  
    const showData = height&& heightDetail.length > 0 ? heightDetail : listData;

  return (
    <div className={styles.chain}>
       <div className={styles.chain_content}>
        {cid && <CidDetail cid={cid} onChange={ handleChange} />} 
        {!cid && showData.map((dataItem: Record<string, any>,index:number) => {
          return <ChainCard isHeight={ !!height}  data={dataItem} key={ index}/>;
        })}  
        
      </div> 
      {!height && !cid && <Pagination showQuickJumper className={`custom_Pagination ${styles.chain_content_pg}`} current={current} total={total} onChange={(cur) => { 
        load(cur);
        setCurrent(cur)
      } } /> }
    

    </div>
  );
};
