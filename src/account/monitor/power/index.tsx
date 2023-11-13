import { useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import monitorStore from '@/store/modules/account/monitor'

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

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup;
    // const miner_tag = obj?.miner_tag || selectTag;
    // const miner_id = obj?.miner_id || selectMiner;
    const payload = {
      monitor_type:'PowerMonitor',
      group_id_or_all: group_id === 'all' ? -1: Number(group_id),
      // miner_or_all: miner_id === 'all'? '':miner_id,
      // miner_tag: miner_tag === 'all' ? '' :miner_tag,
    }
    monitorStore.getUserRules(payload)
  }

  const handleChangeRule = async (type: string, record: any, index: number) => {
    switch (type) {
    case 'isActive':
      const result1 = await monitorStore.ruleActive({ uuid: record.uuid });
      if (result1) {
        loadRules();
      }
      break;
    case 'edit_write':
      //setShowRules(true)
      // setRecord(record)
      break;
    case 'edit_delete':
      const result = await monitorStore.deleteRules({uuid:record.uuid});
      if (result) {
        loadRules();
      }
      break;

    }
  }

  const columns = useMemo(() => {
    return monitor_list(tr,handleChangeRule).map(v => {
      return {...v,title:tr(v.title)}
    })
  }, [tr])

  return <div className={styles.power}>
    <div className={styles.power_title}>
      {tr('monitor_power') }
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} addRule={false} />
    <div className={ styles.power_table}>
      <Table data={[]} columns={columns} loading={false} />
    </div>
  </div>
}