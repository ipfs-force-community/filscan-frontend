import { formatDateTime, formatNumber, formatTime, isIndent } from '@/utils';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import DraggableDiv from '@/packages/DraggableDiv';
import SVGChart from './svgChart'
import useAxiosData from '@/store/useAxiosData';
import { cwUrl } from '@/contents/apiUrl';
import { observer } from 'mobx-react';
import cwStore from '@/store/modules/Cw';

const colors = ['rgba(29, 107, 253, 0.08)','rgba(112, 79, 228, 0.08)','rgba(240, 176, 71, 0.08)','rgba(57, 178, 226, 0.08)','rgba(233, 119, 70, 0.08)','rgba(116, 204, 110, 0.08)']

export default observer(() => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {finalHeight } = cwStore;
  const { axiosData } = useAxiosData();
  const [data,setData] = useState<any>([])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const result = await axiosData(cwUrl, {
      filters: {
        "start": 3315236,
        "end": 3315245
      }
    })
    setData(result?.tipset_list||[])
  }
  // if (data && data.length > 0) {
  //   return <SVGChart data={ data} />

  // }

  return <div className={`main_contain`}>
    <DraggableDiv
      className={style.cwContain}
      contentRef={contentRef}
    >
      <>
        <div className={style.cwContain_left }>
          {data?.map((item:any,index:number) => {
            return <div className={style.cwContain_leftItem} key={index}>{
              formatNumber(item.Height)
            }</div>
          })}
        </div>
        <div className={`${style.cwContain_right} custom_draggable`}
          ref={contentRef}
        >
          <>
            {data?.map((itemData:any, index:number) => {
              const { ChainBlocks=[], OrphanBlocks=[],Height } = itemData;
              return <div key={index} className={style.cwContain_rightContent}>
                { OrphanBlocks && OrphanBlocks.length > 0 && <ul className={style.cwContain_rightContent_orphan}>
                  {OrphanBlocks?.map((orphanItem:any,index:number) => {
                    return <li key={ index} className={style.cwContain_rightContent_orphan_Item}>
                      <span className={style.cwContain_rightContent_li_heightMiner}>{ `${orphanItem.Miner } - ${Height}`}</span>
                      <span>{isIndent(orphanItem._id)}</span>
                      <span>{ formatDateTime(orphanItem.FirstSeen)}</span>
                    </li>
                  })}
                </ul>}
                <ul
                  className={`${style.cwContain_rightContent_content} ${index === data.length-1 ? style.cwContain_rightContent_content_after:""}`}
                  style={{ backgroundColor: colors[index % colors.length] }}>
                  {ChainBlocks?.map((item:any,itemIndex:number) => {
                    return <li key={itemIndex} className={style.cwContain_rightContent_content_Item}>
                      <span className={style.cwContain_rightContent_li_heightMiner}>{ `${item.Miner } - ${Height}`}</span>
                      <span>{ isIndent(item._id)}</span>
                      <span>{ formatDateTime(item.FirstSeen)}</span>
                    </li>
                  }) }
                </ul>
              </div>
            })}
          </>
        </div>
        {/* <div className={style.cwContain_bottom}>
          <span>Top</span>
        </div> */}
      </>

    </DraggableDiv>

  </div>
})