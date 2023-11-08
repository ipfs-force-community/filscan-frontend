import { useEffect, useMemo, useState } from 'react'
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
  const { rules } = monitorStore
  const [showRules, setShowRules] = useState(false);
  const [selectGroup, setSelectGroup] = useState('all');
  const [selectMiner, setSelectMiner] = useState('all');
  const [selectTag, setSelectTag] = useState('all');

  const handleChange = (type:string,value:string|boolean|number|any) => {
    switch (type) {
    case 'addRules':
      setShowRules(true)
      break;
    case 'cancel':
      setShowRules(false)
      break;
    case 'ok':
      setShowRules(false)
      break;
    case 'group':
      setSelectGroup(value);
      setSelectMiner('all');
      setSelectTag('all');

      loadRules({miner_tag: 'all',miner_id:'all',group_id:value});

      break;
    case "miner":
      setSelectMiner(value);
      setSelectTag('all');
      loadRules({miner_tag: 'all',miner_id:value});

      break;
    case 'miner_tag':
      setSelectTag(value);
      loadRules({miner_tag: value});
      break;
    };

  }

  useEffect(() => {
    loadRules()
  },[])

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup;
    const miner_tag = obj?.miner_tag || selectTag;
    const payload = {
      monitor_type:'ExpireSectorMonitor',
      group_id_or_all: group_id === 'all' ? -1:group_id,
      miner_or_all: obj?.miner_id|| selectMiner,
      miner_tag: miner_tag === 'all' ? '' :miner_tag,
    }
    monitorStore.getUserRules(payload)
  }

  const handleChangeRule = (type:string,value:any,index:number) => {
  }

  const columns = useMemo(() => {
    return monitor_list(tr,handleChangeRule).map(v => {
      return {...v,title:tr(v.title)}
    })
  }, [tr])

  return <div className={styles.sector}>
    <div className={styles.sector_title}>
      {tr('monitor_sector') }
    </div>
    <Header onChange={handleChange} selectGroup={selectGroup} selectMiner={selectMiner} selectTag={selectTag } addRule={true } />
    <div className={ styles.sector_table}>
      <Table data={[...rules]} columns={columns} loading={false} />
    </div>
    <Rules showModal={showRules} onChange={handleChange}/>
  </div>
})