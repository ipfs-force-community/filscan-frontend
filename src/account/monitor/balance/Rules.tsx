import { Translation } from '@/components/hooks/Translation'
import { Button, Input, Modal } from 'antd'
import styles from './index.module.scss'
import { useEffect, useMemo, useState } from 'react'
import Header from '../header'
import { formatFil, isPositiveInteger } from '@/utils'
import Selects from '@/packages/selects'
import Warn from '../warn'
import monitorStore from '@/store/modules/account/monitor'
import { observer } from 'mobx-react'
import { defaultWarn } from '@/contents/account'
import { getSvgIcon } from '@/svgsIcon'
import messageManager from '@/packages/message'
import { cloneDeep } from 'lodash'
interface Props {
  showModal: boolean
  record?: Record<string, any>
  onChange: (type: string, value: any) => void
}

const defaultRuleItem = {
  category: undefined,
  operand: '',
  addr: '',
  balance: '',
  placeholder: 'sector_ruler_placeholder',
  warning: false,
  operator: '<=',
  warningText: 'sector_ruler_warningText',
}
const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: [
    {
      ...cloneDeep(defaultRuleItem),
    },
  ],
}

export default observer((props: Props) => {
  const { showModal, record, onChange } = props
  const { tr } = Translation({ ns: 'account' })
  const { minersCategory, saveLoading } = monitorStore
  const [rules, setRules] = useState<any>([
    { ...(cloneDeep(defaultRules) || {}) },
  ])
  const [otherRules, setOtherRules] = useState<Record<string, any>>({})

  useEffect(() => {
    if (record && Object.keys(record).length > 0 && record.miner_id_or_all) {
      //编辑
      if (record.miner_id_or_all && record.miner_id_or_all.length > 0) {
        getCategory(record.miner_id_or_all)
      }
      const newRules = {
        group_id: record.group_id === -1 ? 'all' : String(record.group_id),
        miner_id: record.miner_id_or_all,
        rule: record.rules.map((v: any) => {
          return {
            category: v.account_type,
            addr: v.account_addr,
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
          ...cloneDeep(defaultRules),
        },
      ])
    }
    setOtherRules({})
  }, [record])

  const handleChange = (
    type: string,
    value: any,
    index: number,
    ruleItem: number = 0,
  ) => {
    const newRules = [...rules]
    const newItem = rules[index]
    switch (type) {
      case 'group':
        newItem.group_id = value
        newItem.miner_id = undefined
        break
      case 'miner':
        newItem.miner_id = value
        getCategory(value)
        break
      case 'warnOk':
        newItem.warnList = value
        break
      case 'category':
        newItem.rule[ruleItem].category = value.value
        newItem.rule[ruleItem].addr = value.address
        newItem.rule[ruleItem].balance = value.balance
        setOtherRules({})
        break
      case 'operator':
        newItem.rule[ruleItem].operator = value
        break
      case 'rule':
        if (value) {
          if (!isPositiveInteger(value)) {
            newItem.rule[ruleItem].warning = true
          } else {
            newItem.rule[ruleItem].warning = false
          }
        }
        newItem.rule[ruleItem].operand = value
        setOtherRules({})
        break
    }
    newRules.splice(index, 1, newItem)
    setRules(newRules)
  }

  const getCategory = async (value: string) => {
    monitorStore.getMinerCategory(value)
  }

  const handAddRule = (
    keyType: string,
    type: string,
    index: number,
    ruleIndex?: number,
  ) => {
    const newRules: any = [...rules]
    if (keyType === 'add') {
      if (type === 'ruleItem') {
        const defaultItem = cloneDeep(defaultRuleItem)
        newRules[index].rule.push({ ...defaultItem })
      } else if (type === 'rule') {
        if (newRules.length >= 10) {
          return messageManager.showMessage({
            type: 'error',
            content: tr('rules_more'),
          })
        }
        const defaultRule = cloneDeep(defaultRules)
        newRules.push({ ...defaultRule })
      }
    } else if (keyType === 'delete') {
      if (type === 'ruleItem') {
        newRules[index].rule.splice(ruleIndex, 1)
      } else if (type === 'rule') {
        newRules.splice(index, 1)
      }
    }
    setRules(newRules)
  }

  const handleSave = () => {
    const payload: Array<Record<string, any>> = []
    let warnings = false
    let warn_text = ''
    let other_rules: Record<string, any> = {}
    rules.forEach((rule: any, ruleIndex: number) => {
      const emailList = rule?.warnList?.email_warn || []
      const messageList = rule?.warnList?.message_warn || []
      const phoneList = rule?.warnList?.phone_warn || []
      const rulesList: Array<any> = []
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
      rule?.rule.forEach((v: any, ItemIndex: number) => {
        if (v.warning) {
          warnings = true
          return
        }
        if (!v.category) {
          warnings = true
          other_rules[`${ruleIndex}${ItemIndex}`] = {
            ...(other_rules[`${ruleIndex}${ItemIndex}`] || {}),
            category: true,
          }
          return
        }
        if (!v.operand) {
          warnings = true
          other_rules[`${ruleIndex}${ItemIndex}`] = {
            ...(other_rules[`${ruleIndex}${ItemIndex}`] || {}),
            operand: true,
          }
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
      if (warnings) {
        return
      }
      const obj = {
        monitor_type: 'BalanceMonitor',
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
        rules: rulesList,
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

  const rulesOptions = useMemo(() => {
    return [
      { label: tr('<='), value: '<=' }, //小于等于
      { label: tr('>='), value: '>=' }, //小于等于
    ]
  }, [tr])

  const [CategoryOptions, CategoryMaps] = useMemo(() => {
    const keys = Object.keys(minersCategory)
    const minersOptions: any = {}
    const minerMap: any = {}
    if (keys && Array.isArray(keys)) {
      keys.forEach((key) => {
        const arrValue: Array<any> = []
        const minerWeakmap = new Map()
        minersCategory[key].forEach((v: any) => {
          arrValue.push({
            ...v,
            label: tr(`${v?.type?.toLocaleLowerCase()}`),
            value: v.type,
          })
          minerWeakmap.set(v.type, v)
        })
        minersOptions[key] = arrValue
        minerMap[key] = minerWeakmap
      })
    }
    return [minersOptions, minerMap]
  }, [tr, minersCategory])
  return (
    <Modal
      title={`${tr(record?.group_id ? 'edit_rules' : 'add_rules')}`}
      destroyOnClose={true}
      width={900}
      closeIcon={false}
      wrapClassName="custom_left_modal"
      open={showModal}
      onOk={handleSave}
      onCancel={() => {
        onChange('cancel', false)
      }}
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
          key="confirm_btn"
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
            index === rules.length - 1 && !record?.miner_id_or_all
          const deleteIcon = rules.length > 1 && index !== 0
          return (
            <div key={index} className={styles.balance_contain}>
              <div className={styles.balance_contain_title}>
                {tr('rule_detail')}
              </div>
              <div className={styles.balance_contain_header}>
                <Header
                  disableAll={record?.group_id}
                  selectGroup={ruleItem.group_id}
                  selectMiner={ruleItem.miner_id}
                  isAllMiner={false}
                  showTagLabel={true}
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

                <div className={styles.balance_icons}>
                  {showIcon && (
                    <span
                      className={styles.balance_icons_icon}
                      onClick={() => handAddRule('add', 'rule', index)}
                    >
                      {getSvgIcon('add')}
                    </span>
                  )}
                  {deleteIcon && (
                    <span
                      className={styles.balance_icons_icon}
                      onClick={() => handAddRule('delete', 'rule', index)}
                    >
                      {getSvgIcon('cancel')}
                    </span>
                  )}
                </div>
              </div>
              {ruleItem.miner_id && (
                <>
                  <div className={styles.balance_rule}>
                    {ruleItem.rule.map((rule: any, ruleIndex: number) => {
                      const showIcon = ruleIndex === ruleItem.rule.length - 1
                      const balance =
                        rule.balance ||
                        CategoryMaps[ruleItem.miner_id]?.get(rule?.category)
                          ?.balance
                      return (
                        <div key={ruleIndex}>
                          <div className={styles.balance_rule_main}>
                            <Selects
                              key={ruleIndex + 'select'}
                              className={`${styles.balance_rule_select} ${
                                otherRules[`${index}${ruleIndex}`]?.category
                                  ? 'custom_select_warn'
                                  : ''
                              }`}
                              value={rule.category}
                              placeholder={tr('balance_category_placeholder')}
                              options={
                                (CategoryOptions &&
                                  CategoryOptions[ruleItem.miner_id]) ||
                                []
                              }
                              onChange={(value, item) =>
                                handleChange('category', item, index, ruleIndex)
                              }
                            />
                            <Selects
                              className={styles.balance_rule_select}
                              value={rule.operator}
                              // disabled={true}
                              options={rulesOptions}
                              onChange={(value, item) =>
                                handleChange(
                                  'operator',
                                  value,
                                  index,
                                  ruleIndex,
                                )
                              }
                            />
                            <div className={styles.balance_rule_content}>
                              <Input
                                style={{
                                  borderColor:
                                    rule.warning ||
                                    otherRules[`${index}${ruleIndex}`]?.operand
                                      ? 'red'
                                      : '',
                                }}
                                className={`custom_input ${styles.balance_rule_input}`}
                                defaultValue={rule.operand}
                                placeholder={tr(rule.placeholder)}
                                onBlur={(e) =>
                                  handleChange(
                                    'rule',
                                    e.target.value,
                                    index,
                                    ruleIndex,
                                  )
                                }
                              />
                              {rule.warning && (
                                <span
                                  className={
                                    styles.balance_rule_content_warning
                                  }
                                >
                                  {tr(rule.warningText)}
                                </span>
                              )}
                            </div>
                            <div className={styles.balance_rule_text}>
                              {'FIL'}
                            </div>
                            <div className={styles.balance_icons}>
                              {showIcon && (
                                <span
                                  className={styles.balance_icons_icon}
                                  onClick={() =>
                                    handAddRule(
                                      'add',
                                      'ruleItem',
                                      index,
                                      ruleIndex,
                                    )
                                  }
                                >
                                  {getSvgIcon('add')}
                                </span>
                              )}
                              {ruleIndex !== 0 && (
                                <span
                                  className={styles.balance_icons_icon}
                                  onClick={() =>
                                    handAddRule(
                                      'delete',
                                      'ruleItem',
                                      index,
                                      ruleIndex,
                                    )
                                  }
                                >
                                  {getSvgIcon('cancel')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={styles.balance_rule_des}>
                            {balance &&
                              tr('balance_rule_des', {
                                value: formatFil(balance, 'FIL'),
                              })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className={styles.balance_warn}>
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
