import { useEffect, useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'
import Rules from './Rules'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' });
  const { rules } = monitorStore

  const [selectGroup, setSelectGroup] = useState('all');
  const [showRules, setShowRules] = useState(false);
  const [record, setRecord] = useState<Record<string, any>>({});

  const handleChange = (
    type: string,
    value: string | boolean | number | any,
  ) => {
    switch (type) {
    case 'group':
      setSelectGroup(value);
      break;
    case 'save':
      saveRules(value);
      break;
    };

  }

  useEffect(() => {
    loadRules();
  },[])

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup;
    const payload = {
      monitor_type:'PowerMonitor',
      group_id_or_all: group_id === 'all' ? -1: Number(group_id),
    }
    monitorStore.getUserRules(payload)
  }

  const saveRules = async (payload:Record<string,any>) => {
    const result = await monitorStore.saveUserRules(payload);
    if (result) {
      setShowRules(false);
      loadRules()
    }
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
    return monitor_list(tr,handleChangeRule,'power').map(v => {
      return {...v,title:tr(v.title)}
    })
  }, [tr])

  return (
    <div className={styles.power}>
      <div className={styles.power_title}>{tr('monitor_power')}</div>
      <Header
        onChange={handleChange}
        selectGroup={selectGroup}
        addRule={false}
      />
      <div className={styles.power_table}>
        <Table data={[]} columns={columns} loading={false} />
      </div>
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} addRule={false} />
    <div className={ styles.power_table}>
      <Table data={[...rules]} columns={columns} loading={false} />
    </div>
    <Rules showModal={showRules} onChange={handleChange} record={record}/>

  </div>
})
