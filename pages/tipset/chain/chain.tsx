/** @format */

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import ChainCharts from "@/packages/chain-charts";
import ChainCard from "@/packages/chain-card";
import CidDetail from '@/src/chain/cid_detail'
import styles from "./index.module.scss";
import { useRouter } from 'next/router'

import {
  LoadingOutlined,LeftOutlined,RightOutlined  
} from '@ant-design/icons';
// import { notification, Pagination } from "antd";
// import { isMobile } from "@/utils/utils";

export default () => {
  const [data, setData] = useState<any>([]); //链式图
  const [listData, setListData] = useState<any>([]); //列表
  const [block_size,setBlockSize] = useState<number>()
   const [loading, setLoading] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [record,setRecord] = useState<any>()
  const router = useRouter();
  const asPath = router.asPath;
  const height1 = asPath.split('height=')[1];
  const jumpHeight = asPath.split('jumpHeight=')[1];
  const cid1 = asPath.split('cid=')[1]
  

   const  hash= asPath.split('hash=')[1]
  
  const height = useMemo(() => {
    return height1 || jumpHeight
   },[jumpHeight, height1])

  const cid = useMemo(() => { 
      return  cid1 || hash;
  }, [cid1, hash])
  

  useEffect(() => { 
    setMaxHeight(0)
    setRecord(null)
  },[jumpHeight, height1])

  const heightDetail = useMemo(() => {
    const data = listData.filter((v: any) => Number(v.height) === Number(height));
    return data
  }, [height, listData])


  // const handleResize = () => { 
  //   const window_width = window.innerWidth;
  //   if (window_width < 1100 && window_width >= 800 && block_size !== 8) {
  //     re_load(8);
  //     setBlockSize(8);
  //   } else if (window_width < 800 && block_size !== 6) {
  //     re_load(6);
  //     setBlockSize(6)
  //   } else if (block_size !== 12) {
  //     setBlockSize(12)
  //     re_load(12);
  //   } else { 
  //     re_load(block_size);
  //   }
  // }

  useEffect(() => { 
     postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
      setMaxHeight(res?.result?.height || 0);
     })
     re_load(block_size);
    // window.addEventListener('resize', handleResize);
    // return () => { 
    //   window.removeEventListener('resize', handleResize);
    // }
  }, [])
  
  const re_load = (page_size?: number) => { 
     if (height) {
       const index = data.findIndex((v: any) => v.height === Number(height))
       if (index < 0) { 
        load(Number(height),true,page_size)
      }
    } else { 
      load(undefined,false,page_size);
    }
  }

  useEffect(() => {
      re_load(block_size);
   },[height])

  const load = (maxHeight?: number, search?: boolean,page_size?:number) => {
      let obj = {};
      if (search) {
          obj = {
              start: maxHeight,
              input_type: "height"
          }
      }else { 
         obj = {
                    end: maxHeight,
                }
            }
    setLoading(true)
     postAxios(apiUrl.tipset_chain, {
      filters: {
        page_size:page_size||block_size,
        ...obj
      }
    } ).then(
        (res: any) => {
            setLoading(false)
        const data = res?.result?.tipset_list || [];
        setData(data);
        setListData(data)
      }
    );
 
    
  };

  const showData = height&& heightDetail.length > 0 ? heightDetail : listData;
  
  const handleChange = (value:any) => { 
    setRecord(value);  
  }

    if (loading) { 
         return <div style={{margin:'20% 45%'}}>
         <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} /> 
      </div> 
    }
  return (
    <div className={styles.chain}>
      {/* {!isMobile() && <div className={styles.chain_chart}>
        <span className={styles.chain_chart_leftIcon} onClick={() => { 
          const num = data.length;
          if (num > 0) { 
          if (height) { 
            router.push(`/tipset/chain`)
          } else {
              load(data[num - 1].height);
          }
          } 
              }}>
           
      <LeftOutlined rev={undefined} />
        </span>
        <ChainCharts record={ record} data={[...data]} jumpSafeHeight={Number(height)} maxHeight={data[0]?.height} />
        <span className={styles.chain_chart_rightIcon}
          onClick={() => { 
             const calcHeight = data[0]?.height <= maxHeight;
             if (calcHeight) {
               load(data[0]?.height + block_size + 1);
             } else { 
                postAxios(apiUrl.tipset_chain_FinalHeight, {}).then((res:any) => {
                  setMaxHeight(res?.result?.height || 0);
                  const showHeight = res?.result?.height;
                  if (showHeight > data[0]?.height) {
                    notification.warning({
                      message: 'Warning',
                      placement: 'topRight',
                      description: 'block height overflow'
                    })
                  } else { 
                    load(data[0]?.height + block_size + 1);
                  }
              })
             

            }
        } }
        ><RightOutlined rev={undefined} /></span>
      </div> } */}
       <div className={styles.chain_content}>
        {cid && <CidDetail cid={cid} onChange={ handleChange} />} 
        {!cid && showData.map((dataItem: Record<string, any>,index:number) => {
          return <ChainCard isHeight={!!height} data={dataItem} key={ index}/>;
        })}  
      </div> 
      {/* <Pagination showQuickJumper className={`custom_Pagination ${styles.chain_content_pg}`} current={1} total={showData[0]?.height} onChange={() => { 

      } } />  */}

    </div>
  );
};
