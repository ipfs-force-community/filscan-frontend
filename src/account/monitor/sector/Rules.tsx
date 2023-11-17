import { Button, Input, Modal } from 'antd'
import Header from '../header'
import { useEffect, useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import styles from './index.module.scss'
import Selects from '@/packages/selects'
import { isPositiveInteger } from '@/utils'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'
import Warn from '@/src/account/monitor/warn'
import { defaultWarn } from '@/contents/account'
import { getSvgIcon } from '@/svgsIcon'
import messageManager from '@/packages/message'
interface Props {
  showModal: boolean
  record?: Record<string, any>
  onChange: (type: string, value: any) => void
}

const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: [
    {
      operand: '30',
      operator: '<=',
      placeholder: 'sector_ruler_placeholder',
      warning: false,
      warningText: 'sector_ruler_warningText',
    },
  ],
  warnList: undefined,
}
export default observer((props: Props) => {
  const { showModal, onChange, record } = props
  const { saveLoading } = monitorStore
  const { tr } = Translation({ ns: 'account' })
  const [rules, setRules] = useState<any>([{ ...defaultRules }])
  const [otherRules, setOtherRules] = useState<Record<string, any>>({})
  useEffect(() => {
    if (record && Object.keys(record).length > 0) {
      //编辑
      const newRules = {
        group_id: record.group_id === -1 ? 'all' : String(record.group_id),
        miner_id: record.miner_id_or_all,
        rule: record.rules.map((v: any) => {
          return {
            operand: v.operand,
            operator: v.operator,
            placeholder: 'sector_ruler_placeholder',
            warning: false,
            warningText: 'sector_ruler_warningText',
          }
        }),
        warnList: {
          email_warn: record?.mail_alert,
          message_warn: record?.msg_alert,
          phone_warn: record?.call_alert,
        },
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
      setRules([{ ...newRules }])
    } else {
      //添加
      setRules([
        {
          ...defaultRules,
        },
      ])
    }
  }, [record])

  const handleChange = (type: string, value: any, index: number) => {
    const newRules = [...rules]
    const newItem = rules[index]
    switch (type) {
      case 'group':
        newItem.group_id = value
        newItem.miner_id = undefined
        break
      case 'miner':
        newItem.miner_id = value
        break
      case 'warnOk':
        newItem.warnList = value
        break
      case 'rule':
        if (value) {
          if (!isPositiveInteger(value)) {
            newItem.rule[0].warning = true
          } else {
            newItem.rule[0].warning = false
          }
        }
        newItem.rule[0].operand = value
        break
      default:
        break
    }
    newRules.splice(index, 1, newItem)
    setRules(newRules)
  }

  const handleSave = async () => {
    const payload: Array<Record<string, any>> = []
    let warnings = false
    let warn_text: string = ''
    const other_rules: Record<string, any> = {}
    rules.forEach((rule: any, ruleIndex: number) => {
      const emailList = rule?.warnList?.email_warn || []
      const messageList = rule?.warnList?.message_warn || []
      const phoneList = rule?.warnList?.phone_warn || []
      if (!rule.group_id) {
        warnings = true
        other_rules[`${ruleIndex}`] = {
          ...(other_rules[`${ruleIndex}`] || {}),
          group: true,
        }
        return
      }
      if (!rule.miner_id) {
        warnings = true
        other_rules[`${ruleIndex}`] = {
          ...(other_rules[`${ruleIndex}`] || {}),
          miner: true,
        }
        return
      }
      rule?.rule.forEach((v: any) => {
        if (v.warning) {
          warnings = true
          return
        }
        rulesList.push({
          account_type: v.category,
          account_addr: v.addr,
          operator: v.operator,
          operand: v.operand,
        })
      })
      emailList?.forEach((v: any) => {
        if (v.warning) {
          warn_text = 'email_warn_warning'
        }
      })
      if (!warn_text) {
        messageList?.forEach((v: any) => {
          if (v.warning) {
            warn_text = 'message_warn_warning'
          }
        })
      }
      if (!warn_text) {
        phoneList?.forEach((v: any) => {
          if (v.warning) {
            warn_text = 'message_warn_warning'
          }
        })
      }
      if (warn_text) {
        warnings = true
        return messageManager.showMessage({
          type: 'error',
          content: tr(warn_text),
        })
      }
      const rulesList: Array<any> = []

      const obj = {
        monitor_type: 'ExpireSectorMonitor',
        user_id: 27,
        group_id_or_all: rule.group_id === 'all' ? -1 : Number(rule.group_id),
        miner_or_all: rule.miner_id,
        mail_alert: emailList[0]?.checked
          ? emailList?.map((v: any) => v.inputValue).join(',')
          : '',
        msg_alert: messageList[0]?.checked
          ? messageList?.map((v: any) => v.inputValue).join(',')
          : '',
        call_alert: phoneList[0]?.checked
          ? phoneList?.map((v: any) => v.inputValue).join(',')
          : '',
        rules: rule?.rule.map((v: any) => {
          return {
            account_type: '',
            account_addr: '',
            operator: v.operator,
            operand: v.operand,
          }
        }),
      }
      payload.push(obj)
    })
    if (Object.keys(other_rules).length > 0) {
      setOtherRules(other_rules)
    }
    if (!warnings) {
      onChange('save', {
        items: payload,
        update: !!record?.hasOwnProperty('miner_id_or_all'),
      })
    }
  }

  const handleRules = (type: string, index: number) => {
    //保存规则
    const newRules = [...rules]
    if (type === 'delete') {
      newRules.splice(index, 1)
    } else if (type === 'add') {
      if (newRules.length >= 10) {
        return messageManager.showMessage({
          type: 'error',
          content: tr('rules_more'),
        })
      }
      newRules.push({ ...defaultRules })
    }
    setRules(newRules)
  }

  const rulesOptions = useMemo(() => {
    return [
      { label: tr('<='), value: '<=' }, //小于等于
    ]
  }, [tr])

  return (
    <Modal
      title={`${tr(record?.group_id ? 'edit_rules' : 'add_rules')}`}
      destroyOnClose={true}
      closeIcon={false}
      width={560}
      wrapClassName="custom_modal custom_left_modal"
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
      <div>
        {rules.map((ruleItem: any, index: number) => {
          const showIcon =
            index === rules.length - 1 &&
            !record?.hasOwnProperty('miner_id_or_all')
          const deleteIcon = rules.length > 1 && index !== 0
          return (
            <div key={index} className={styles.sector_contain}>
              <div className={styles.sector_contain_title}>
                {tr('rule_detail')}
              </div>
              <div className={styles.sector_contain_header}>
                <Header
                  disableAll={record?.group_id}
                  selectGroup={ruleItem.group_id}
                  selectMiner={ruleItem.miner_id}
                  classes={{
                    group: otherRules[`${index}`]?.group
                      ? 'custom_select_warn'
                      : '',
                    miner: otherRules[`${index}`]?.miner
                      ? 'custom_select_warn'
                      : '',
                  }}
                  onChange={(type, value) => handleChange(type, value, index)}
                />
                <div className={styles.sector_icons}>
                  {showIcon && (
                    <span
                      className={styles.sector_icons_icon}
                      onClick={() => handleRules('add', index)}
                    >
                      {getSvgIcon('add')}
                    </span>
                  )}
                  {deleteIcon && (
                    <span
                      className={styles.sector_icons_icon}
                      onClick={() => handleRules('delete', index)}
                    >
                      {getSvgIcon('cancel')}
                    </span>
                  )}
                </div>
              </div>
              {ruleItem.miner_id && (
                <>
                  <div className={styles.sector_rule}>
                    <div className={styles.sector_rule_title}>
                      {tr('sector_rule_title')}
                    </div>
                    {ruleItem.rule.map((rule: any) => {
                      return (
                        <>
                          <div className={styles.sector_rule_main}>
                            <Selects
                              className={styles.sector_rule_select}
                              value={rule.operator}
                              disabled={true}
                              options={rulesOptions}
                            />
                            <div className={styles.sector_rule_content}>
                              <Input
                                style={{
                                  borderColor: rule.warning ? 'red' : '',
                                }}
                                className={`custom_input ${styles.sector_rule_input}`}
                                value={rule.operand}
                                placeholder={tr(rule.placeholder)}
                                onChange={(e) =>
                                  handleChange('rule', e.target.value, index)
                                }
                              />
                              {rule.warning && (
                                <span
                                  className={styles.sector_rule_content_warning}
                                >
                                  {tr(rule.warningText)}
                                </span>
                              )}
                            </div>
                            <div className={styles.sector_rule_text}>
                              {tr('day')}
                            </div>
                          </div>
                          <div className={styles.sector_rule_des}>
                            {tr('sector_rule_des')}
                          </div>
                        </>
                      )
                    })}
                  </div>
                  <div className={styles.sector_warn}>
                    <Warn
                      noModal={true}
                      onChange={(type, value) =>
                        handleChange(type, value, index)
                      }
                      warnData={ruleItem?.warnList}
                    />
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </Modal>
  )
})
