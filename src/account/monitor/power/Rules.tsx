import { Translation } from '@/components/hooks/Translation'
import monitorStore from '@/store/modules/account/monitor'
import { Button, Modal } from 'antd'
import Warn from '../warn'
import { defaultWarn } from '@/contents/account'
import { useEffect, useState } from 'react'
import { warn } from 'console'

interface Props {
  showModal: boolean
  record?: Record<string, any>
  onChange: (type: string, value: any) => void
}

export default (props: Props) => {
  const { showModal, onChange, record } = props
  const { tr } = Translation({ ns: 'account' })
  const { saveLoading } = monitorStore
  const [rules, setRules] = useState<Record<string, any>>({})

  const handleSave = () => {
    const payload: Array<Record<string, any>> = []
    const emailList = rules?.warnList?.email_warn || []
    const messageList = rules?.warnList?.message_warn || []
    const phoneListList = rules?.warnList?.phone_warn || []
    const obj = {
      monitor_type: 'PowerMonitor',
      group_id_or_all: rules.group_id === 'all' ? -1 : Number(rules.group_id),
      mail_alert: emailList[0]?.checked
        ? emailList?.map((v: any) => v.inputValue).join(',')
        : '',
      msg_alert: messageList[0]?.checked
        ? messageList?.map((v: any) => v.inputValue).join(',')
        : '',
      call_alert: phoneListList[0]?.checked
        ? phoneListList?.map((v: any) => v.inputValue).join(',')
        : '',
      rules: rules.rules,
    }
    payload.push(obj)
    onChange('save', payload)
  }

  useEffect(() => {
    if (record && Object.keys(record).length > 0) {
      //编辑
      const newRules = {
        group_id: record.group_id === -1 ? 'all' : String(record.group_id),
        miner_id: record.miner_id_or_all,
        warnList: {
          email_warn: record?.mail_alert,
          message_warn: record?.msg_alert,
          phone_warn: record?.call_alert,
        },
        rules: [
          {
            account_type: '',
            account_addr: '',
          },
        ],
      }
      const warnData: Record<string, any> = {
        email_warn: record?.mail_alert,
        message_warn: record?.msg_alert,
        phone_warn: record?.call_alert,
      }
      const newObjWarn: any = {}
      Object.keys(defaultWarn).forEach((key: string) => {
        const obj = defaultWarn[key] || {}
        if (warnData[key] && warnData[key].length > 0) {
          newObjWarn[key] = []
          warnData[key].forEach((item: string, index: number) => {
            //最后一位是默认邮箱
            if (key === 'email_warn') {
              if (warnData[key].length === 1) {
                newObjWarn[key].push({
                  ...obj,
                  checked: true,
                  inputValue: '',
                })
              } else if (index !== warnData[key].length - 1) {
                newObjWarn[key].push({
                  ...obj,
                  checked: true,
                  inputValue: item,
                })
              }
            } else {
              newObjWarn[key].push({
                ...obj,
                checked: true,
                inputValue: item,
              })
            }
          })
        } else {
          newObjWarn[key] = [{ ...obj }]
        }
      })
      newRules.warnList = newObjWarn
      setRules({ ...newRules })
    } else {
      //添加
      setRules({})
    }
  }, [record])

  const handleChange = (type: string, value: any) => {
    const newRules = { ...rules }
    if (type === 'warnOk') {
      newRules.warnList = value
    } else if (type === 'cancel') {
      onChange('cancel', false)
    }
    setRules({ ...newRules })
  }

  return (
    <Modal
      title={`${tr('warn_title')}`}
      destroyOnClose={true}
      closeIcon={false}
      width={630}
      wrapClassName="custom_left_modal"
      open={showModal}
      onOk={handleSave}
      onCancel={() => onChange('cancel', false)}
      footer={[
        <Button
          className="cancel_btn"
          key="cancel_btn"
          onClick={() => onChange('cancel', false)}
        >
          {tr('cancel')}
        </Button>,
        <Button
          className="primary_btn"
          key="primary_btn"
          loading={saveLoading}
          onClick={handleSave}
        >
          {tr('confirm')}
        </Button>,
      ]}
    >
      <Warn
        noModal={true}
        onChange={(type, value) => handleChange(type, value)}
        warnData={rules?.warnList}
      />
    </Modal>
  )
}
