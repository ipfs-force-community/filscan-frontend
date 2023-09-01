import { useEffect } from 'react';
import styles from './style.module.scss';
import { observer } from 'mobx-react';
import homeStore from '@/store/modules/home';
import { useTranslation } from 'react-i18next';
import { getShowData } from '@/utils';
import _ from 'lodash';
import Tooltip from '@/packages/tooltip';
interface TipsType {
  label:string,
  value:string,
  unit:string,
}
interface CardType {
  label:string,
  value:string,
  unit:string,
  increase:string,
  inCount:string,
  tooltip:boolean,
  tips: TipsType[]
}

const Meta = (props: any)=> {
  const { t } = useTranslation('home');
  useEffect(() => {
    homeStore.fetchHomeMeta()
  }, []);

  const cards:Array<CardType> = [
    {
      label:'power_increase_24h',
      value:homeStore.formatMeta.power_increase_24h,
      unit:homeStore.formatMeta.power_increase_24h_unit,
      increase:'increase',
      inCount:"46.23",
      tooltip:true,
      tips:[
        {
          label:'',
          value:'',
          unit:''
        },
        {
          label:'',
          value:'',
          unit:''
        }
      ]
    },
    {
      label:'add_power_in_32g',
      value:"19.74",
      unit:'EIB',
      increase:'',
      inCount:"",
      tooltip:false,
      tips:[]
    },
    {
      label:'miner_initial_pledge',
      value:"19.74",
      unit:'EIB',
      increase:'',
      inCount:"",
      tooltip:false,
      tips:[]
    },
    {
      label:'fil_per_tera_24h',
      value:"19.74",
      unit:'EIB',
      increase:'',
      inCount:"",
      tooltip:false,
      tips:[]
    },
    {
      label:`total_contract/24h_contract`,
      value:"255",
      unit:'',
      increase:'reduce',
      inCount:"46.23",
      tooltip:true,
      tips:[]
    },
    {
      label:`contract_transaction/24h_change`,
      value:"88174",
      unit:'',
      increase:'reduce',
      inCount:"463",
      tooltip:true,
      tips:[]
    },
    {
      label:`contract_address/24h_change`,
      value:"19.74",
      unit:'',
      increase:'increase',
      inCount:"246",
      tooltip:true,
      tips:[]
    },
    {
      label:'gas_24',
      value:"1974",
      unit:'FIL',
      increase:'',
      inCount:"",
      tooltip:false,
      tips:[]
    }
  ]

  const renderCard = (n:CardType)=>{
    const renderIncrease = (key:string)=>{
      const obj = {
        increase:<div className={styles.increase}>+{n.inCount}</div>,
        reduce:<div className={styles.reduce}>-{n.inCount}</div>,
        '':<></>
      }
      const res = _.get(obj,key)

      return res ?? <></>
    }
    const code = <>
      <div className={styles['card-top']}>
        <div className={styles.value}>{n.value}</div>
        {
          n.unit ? <div className={styles.unit}>{n.unit}</div>:<></>
        }
        {renderIncrease(n.increase)}
      </div>
      <div className={styles['card-bottom']}>
        <div className={styles.label}>
          {t(n.label)}
        </div>
      </div>
    </>

    const tooltip = <>tooltip</>

    if(n.tooltip){
      return <Tooltip icon={false} context={<>123:123</>}>{code}</Tooltip>
    }
    return code
  }
  return <div className={styles.meta}>
    <div className={styles.cards}>
      {
        cards.map((n,index)=>{
          return <div className={styles.card} key={`card-${index}`}>
            {renderCard(n)}
          </div>
        })
      }
    </div>
  </div>;
}

export default observer(Meta);
