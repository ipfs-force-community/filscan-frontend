import { useEffect, useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import Rules from './Rules'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' })
  const { isMobile } = useWindow()
  const { rules } = monitorStore
  const [showRules, setShowRules] = useState(false)
  const [selectGroup, setSelectGroup] = useState('all')
  const [selectMiner, setSelectMiner] = useState('all')
  const [selectTag, setSelectTag] = useState('all')
  const [record, setRecord] = useState<Record<string, any>>({})

  const handleChange = (
    type: string,
    value: string | boolean | number | any,
  ) => {
    switch (type) {
      case 'addRules':
        setShowRules(true)
        break
      case 'cancel':
        setShowRules(false)
        setRecord({})
        break
      case 'reset':
        setSelectGroup('all')
        setSelectMiner('all'), setSelectTag('all')
        loadRules({ miner_tag: 'all', miner_id: 'all', group_id: 'all' })
      case 'group':
        setSelectGroup(value)
        setSelectMiner('all')
        loadRules({ miner_tag: 'all', miner_id: 'all', group_id: value })
        break
      case 'miner':
        setSelectMiner(value)
        setSelectTag('all')
        loadRules({ miner_tag: 'all', miner_id: value })
        break
      case 'miner_tag':
        setSelectTag(value)
        loadRules({ miner_tag: value })
        break
      case 'save':
        saveRules(value)
        break
    }
  }

  useEffect(() => {
    loadRules()
  }, [])

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup
    const miner_tag = obj?.miner_tag || selectTag
    const miner_id = obj?.miner_id || selectMiner
    const payload = {
      monitor_type: 'BalanceMonitor',
      group_id_or_all: group_id === 'all' ? -1 : Number(group_id),
      miner_or_all: miner_id === 'all' ? '' : miner_id,
      miner_tag: miner_tag === 'all' ? '' : miner_tag,
    }
    monitorStore.getUserRules(payload)
  }

  const handleChangeRule = async (type: string, record: any, index: number) => {
    switch (type) {
      case 'isActive':
        const result1 = await monitorStore.ruleActive({ uuid: record.uuid })
        if (result1) {
          loadRules()
        }
        break
      case 'edit_write':
        setShowRules(true)
        setRecord(record)
        break
      case 'edit_delete':
        const result = await monitorStore.deleteRules({ uuid: record.uuid })
        if (result) {
          loadRules()
        }
        break
    }
  }

  const columns = useMemo(() => {
    let list = monitor_list(tr, handleChangeRule)
    if (isMobile) {
      list = list.slice(0, list.length - 1)
    }
    return list.map((v) => {
      if (isMobile && v.dataIndex === 'group_name') {
        return {
          ...v,
          title: tr(v.title),
          render: (text: string, record: any) => {
            const showText = record.is_default ? tr('default_group') : text
            return showText
          },
        }
      }
      return { ...v, title: tr(v.title) }
    })
  }, [tr, isMobile])

  const saveRules = async (payload: Record<string, any>) => {
    const result = await monitorStore.saveUserRules(payload)
    if (result) {
      setShowRules(false)
      setRecord({})
      loadRules()
    }
  }

  return (
    <div className={styles.balance}>
       <div className={classNames('flex gap-[10px] flex-wrap', styles.balance_title)}>
          {tr('monitor_balance')}
          {
            isMobile && (<div className={styles.tip}><ExclamationCircleOutlined className='mr-[2px]' />{tr('monitor_mobile_edit_tip')}</div>)
          }
      </div>
      <Header
        onChange={handleChange}
        selectGroup={selectGroup}
        selectMiner={selectMiner}
        selectTag={selectTag}
        reset={true}
        addRule={true}
      />
      <div className={styles.balance_table}>
        <Table data={[...rules]} columns={columns} loading={false} />
      </div>
      <Rules showModal={showRules} onChange={handleChange} record={record} />
    </div>
  )
})
