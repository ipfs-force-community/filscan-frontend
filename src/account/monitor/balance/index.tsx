import { useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import Rules from './Rules'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' });
  const [showRules, setShowRules] = useState(false);
  const [selectGroup, setSelectGroup] = useState('all');
  const [selectMiner, setSelectMiner] = useState('all');
  const [selectTag, setSelectTag] = useState('all');
  const [record, setRecord] = useState<Record<string,any>>({});

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
      setSelectMiner(value);
      setSelectTag('all');
      break;
    case 'miner_tag':
      setSelectTag(value);
      break;
    };
  }

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup;
    const miner_tag = obj?.miner_tag || selectTag;
    const miner_id = obj?.miner_id || selectMiner;
    const payload = {
      monitor_type:'ExpireSectorMonitor',
      group_id_or_all: group_id === 'all' ? -1: Number(group_id),
      miner_or_all: miner_id === 'all'? '':miner_id,
      miner_tag: miner_tag === 'all' ? '' :miner_tag,
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
      setShowRules(true)
      setRecord(record)
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

  return <div className={styles.balance}>
    <div className={styles.balance_title}>
      {tr('monitor_balance') }
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} selectMiner={selectMiner} selectTag={ selectTag} addRule={true } />
    <div className={ styles.balance_table}>
      <Table data={[]} columns={columns} loading={false} />
    </div>
    <Rules showModal={showRules} onChange={handleChange}/>
  </div>
})