import style from './index.module.scss';

const data = {
  Valuation: {
    cid: 'test',
    miner: 'f01234',
    height: 3235210,
    time:'test',
  },
  heightDetails: {
    '3235210': [{
      cid: 'test',
      miner: 'f01234',
      height: 3235210,
      time:'test', }],
    '3235211': [{
      cid: 'test',
      miner: 'f01234',
      height: 3235210,
      time:'test',

    }],
    '3235212': [{
      cid: 'test',
      miner: 'f01234',
      height: 3235210,
      time:'test',

    }],
    '3235213': [{
      cid: 'test',
      miner: 'f01234',
      height: 3235210,
      time:'test',

    }],
    '3235214': [{
      cid: 'test',
      miner: 'f01234',
      height: 3235210,
      time: 'test',
    }
    ]

  }
}

export default () => {
  const {heightDetails } = data;
  return <div className={`main_contain card_shadow ${style.cwContain}`}>

    <div className={style.cwContain_left }>
      {Object.keys(heightDetails).map((item,index) => {
        return <div key={index}>{ item}</div>
      })}
    </div>
    <div className={style.cwContain_right }>

    </div>

  </div>
}