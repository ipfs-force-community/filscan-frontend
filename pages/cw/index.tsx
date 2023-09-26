import { formatNumber, isIndent } from '@/utils';
import style from './index.module.scss';
import { cwStyle } from '@/utils/echarts';

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

export default () => {
  const { heightDetails } = data;

  const colors = cwStyle['light']

  return <div className={`main_contain`}>
    <div className={`card_shadow ${style.cwContain}`}>
      <div className={style.cwContain_left }>
        {Object.keys(heightDetails).map((item,index) => {
          return <div className={style.cwContain_leftItem} key={index}>{
            formatNumber(item)
          }</div>
        })}
      </div>
      <div className={style.cwContain_right }>
        {Object.keys(heightDetails).map((itemKey:any, index) => {
          const showData = heightDetails[itemKey];
          return <ul key={index} className={style.cwContain_rightContent} style={{backgroundColor: colors[index % colors.length]}}>
            {showData.map((item:any,itemIndex:number) => {
              return <li key={itemIndex} className={style.cwContain_rightContent_li}>
                <span className={style.cwContain_rightContent_li_heightMiner}>{ `${item.miner } - ${item.height}`}</span>
                <span>{ isIndent(item.cid)}</span>
                <span>{ item.time}</span>
              </li>
            }) }
          </ul>
        })}
      </div>
    </div>

  </div>
}