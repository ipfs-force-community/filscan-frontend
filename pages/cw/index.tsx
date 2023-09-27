import { formatNumber, isIndent } from '@/utils';
import style from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import DraggableDiv from '@/packages/DraggableDiv';
import SVGChart from './svgChart'

const data:any = {
  Valuation: {
    cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
    miner: 'f01234',
    height: 3235210,
    time:'2023-09-25 13:14:00',
  },
  heightDetails: {
    '3235210': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }],
    '3235211': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '3235212': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '3235213': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '3235214': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }
    ],
    '3235215': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }],
    '3235216': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '3235217': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '32352138': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',

    }],
    '3235219': [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }
    ]

  }
}

const newData:any = {
  '3235210': {
    orphanBlock: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }],
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235209': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235208': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235207': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235206': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235205': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235204': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  },
  '3235203': {
    list: [{
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    },
    {
      cid: 'bafy2bzaceavdnmbdk46aiz2k37bmxvwzcoegu6foarn2rncwowx6fex63odje',
      miner: 'f01234',
      height: 3235210,
      time:'2023-09-25 13:14:00',
    }]
  }
}

const colors = ['rgba(29, 107, 253, 0.08)','rgba(112, 79, 228, 0.08)','rgba(240, 176, 71, 0.08)','rgba(57, 178, 226, 0.08)','rgba(233, 119, 70, 0.08)','rgba(116, 204, 110, 0.08)']

export default () => {
  console.log('===3',)
  const keys = Object.keys(newData)?.reverse() || []

  // return <SVGChart newData={ newData} />
  return <div className={`main_contain`}>
    <DraggableDiv className={style.cwContain}>
      <>
        <div className={style.cwContain_left }>
          {keys?.map((item,index) => {
            return <div className={style.cwContain_leftItem} key={index}>{
              formatNumber(item)
            }</div>
          })}
        </div>
        <div className={style.cwContain_right}
        >
          {keys?.map((itemKey:any, index) => {
            const { list, orphanBlock } = newData[itemKey];
            return <div key={index} className={style.cwContain_rightContent}>
              <ul className={style.cwContain_rightContent_orphan}>
                {orphanBlock?.map((orphanItem:any,index:number) => {
                  return <li key={ index} className={style.cwContain_rightContent_orphan_Item}>
                    <span className={style.cwContain_rightContent_li_heightMiner}>{ `${orphanItem.miner } - ${orphanItem.height}`}</span>
                    <span>{ isIndent(orphanItem.cid)}</span>
                    <span>{ orphanItem.time}</span>
                  </li>
                })}
              </ul>
              <ul
                className={style.cwContain_rightContent_content}
                style={{ backgroundColor: colors[index % colors.length] }}>
                {list?.map((item:any,itemIndex:number) => {
                  return <li key={itemIndex} className={style.cwContain_rightContent_content_Item}>
                    <span className={style.cwContain_rightContent_li_heightMiner}>{ `${item.miner } - ${item.height}`}</span>
                    <span>{ isIndent(item.cid)}</span>
                    <span>{ item.time}</span>
                  </li>
                }) }
              </ul>
            </div>
          })}
        </div>
      </>
    </DraggableDiv>

  </div>
}