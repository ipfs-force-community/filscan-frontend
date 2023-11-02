import { useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import Rules from './Rules'

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const [showRules, setShowRules] = useState(true);
  const [selectGroup, setSelectGroup] = useState('all');
  const [selectMiner,setSelectMiner]= useState('all')
  const handleChange = (type:string,value:string|boolean|number|any) => {
    switch (type) {
    case 'addRules':
      setShowRules(true)
      break;
    case 'cancel':
      setShowRules(false)
      break;
    case 'group':
        setSelectGroup(value);
        setSelectMiner('all')
        break;
      case "miner":
        setSelectMiner(value)
    };

  }

  const columns = useMemo(() => {
    return monitor_list.map(v => {
      return {...v,title:tr(v.title)}
    })
  }, [tr])

  return <div className={styles.balance}>
       <div className={styles.balance_title}>
      {tr('monitor_balance') }
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} selectMiner={selectMiner} addRule={true } />
    <div className={ styles.balance_table}>
      <Table data={[]} columns={columns} loading={false} />
    </div>
     <Rules showModal={showRules} onChange={handleChange}/>
  </div>
}