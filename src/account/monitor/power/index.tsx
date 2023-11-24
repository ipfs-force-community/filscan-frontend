import { useEffect, useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { monitor_list } from '@/contents/account'
import Table from '@/packages/Table'
import Header from '../header'
import styles from './index.module.scss'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'
import Rules from './Rules'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' })
  const { isMobile } = useWindow()
  const { rules } = monitorStore

  const [selectGroup, setSelectGroup] = useState('all')
  const [showRules, setShowRules] = useState(false)
  const [record, setRecord] = useState<Record<string, any>>({})

  const handleChange = (
    type: string,
    value: string | boolean | number | any,
  ) => {
    switch (type) {
      case 'group':
        setSelectGroup(value)
        break
      case 'save':
        saveRules(value)
        break
      case 'cancel':
        setShowRules(false)
      default:
        break
    }
  }

  useEffect(() => {
    loadRules()
  }, [])

  const loadRules = (obj?: Record<string, string>) => {
    const group_id = obj?.group_id || selectGroup
    const payload = {
      monitor_type: 'PowerMonitor',
      group_id_or_all: group_id === 'all' ? -1 : Number(group_id),
    }
    monitorStore.getUserRules(payload)
  }

  const saveRules = async (payload: Record<string, any>) => {
    const result = await monitorStore.saveUserRules(payload)
    if (result) {
      setShowRules(false)
      loadRules()
    }
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
      default:
        break
    }
  }

  const columns = useMemo(() => {
    let list = monitor_list(tr, handleChangeRule, 'power')
    if (isMobile) {
      list = list.slice(0, list.length - 1)
    }
    return list.map((v) => {
      if (isMobile && v.dataIndex === 'group_name') {
        return { ...v, title: tr(v.title), render: (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group') : text
          return showText
        }}
      }
      return { ...v, title: tr(v.title) }
    })
  }, [tr, isMobile])

  return (
    <div className={styles.power}>
      <div className={classNames('flex', styles.power_title)}>
        {tr('monitor_power')}
        {
            isMobile && (<div className={styles.tip}><ExclamationCircleOutlined className='mr-[2px]' />{tr('monitor_mobile_edit_tip')}</div>)
          }
      </div>
      <Header
        onChange={handleChange}
        selectGroup={selectGroup}
        addRule={false}
      />
      <div className={styles.power_table}>
        <Table data={[...rules]} columns={columns} loading={false} />
      </div>
      <Rules showModal={showRules} onChange={handleChange} record={record} />
    </div>
  )
})
