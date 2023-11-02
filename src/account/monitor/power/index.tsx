import { useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const [selectGroup, setSelectGroup] = useState('all');

  const handleChange = (type:string,value:string|boolean|number|any) => {
    switch (type) {
    case 'group':
        setSelectGroup(value);
        break;
    };

  }

  const columns = useMemo(() => {
    return monitor_list.map(v => {
      return {...v,title:tr(v.title)}
    })
  }, [tr])

  return <div className={styles.power}>
    <div className={styles.power_title}>
      {tr('monitor_power') }
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} showMiner={false } addRule={false} />
    <div className={ styles.power_table}>
      <Table data={[]} columns={columns} loading={false} />
    </div>
  </div>
}