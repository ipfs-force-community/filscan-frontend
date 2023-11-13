import { Translation } from "@/components/hooks/Translation";
import { Button, Input, Modal } from "antd"
import styles from './index.module.scss'
import { useEffect, useMemo, useState } from "react";
import Header from "../header";
import { formatFil, isPositiveInteger } from "@/utils";
import Selects from "@/packages/selects";
import Warn from "../warn";
import monitorStore from "@/store/modules/account/monitor";
import { observer } from "mobx-react";
import { defaultWarn } from "@/contents/account";
interface Props {
  showModal: boolean;
    record?:Record<string,any>,
  onChange:(type:string,value:any)=>void;
}

const defaultRuleItem = {
  category:undefined,
  operand: '',
  addr: '',
  balance:'',
  placeholder: 'sector_ruler_placeholder',
  warning: false,
  operator:'<=',
  warningText:'sector_ruler_warningText',
}
const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: [{
    ...defaultRuleItem
  }],
}

export default observer((props:Props) => {
  const { showModal,record, onChange } = props;
  const { tr } = Translation({ ns: 'account' });
  const { minersCategory } = monitorStore
  const [rules, setRules] = useState<any>([{ ...defaultRules }]);

  useEffect(() => {
    if (record && Object.keys(record).length > 0 && record.miner_id_or_all) {
      //编辑
      if (record.miner_id_or_all && record.miner_id_or_all.length > 0) {
        getCategory(record.miner_id_or_all)
      }
      const newRules = {
        group_id: record.group_id === -1 ?'all':String( record.group_id),
        miner_id: record.miner_id_or_all,
        rule: record.rules.map((v:any) => {
          return {
            category: v.account_type,
            addr:v.account_addr,
            operand: v.operand,
            operator: v.operator,
            placeholder: 'sector_ruler_placeholder',
            warning: false,
            warningText:'sector_ruler_warningText'
          }
        }),
        warnList: {
          email_warn:record?.mail_alert,
          message_warn: record?.msg_alert,
          phone_warn:record?.call_alert,
        }
      };
      const warnData:Record<string,any> = {
        email_warn:record?.mail_alert,
        message_warn: record?.msg_alert,
        phone_warn:record?.call_alert,
      }
      const newObjWarn:any = {};
      Object.keys(defaultWarn).forEach((key: string) => {
        const obj = defaultWarn[key] || {};
        if (warnData[key] && warnData[key].length > 0) {
          newObjWarn[key] = [];
          warnData[key].forEach((item: string, index: number) => {
            //最后一位是默认邮箱
            if (key === 'email_warn') {
              if (index !== warnData[key].length - 1) {
                newObjWarn[key].push({
                  ...obj,
                  checked: true,
                  inputValue: item
                })
              }
            } else {
              newObjWarn[key].push({
                ...obj,
                checked: true,
                inputValue: item
              })
            }

          })
        } else {
          newObjWarn[key] = [{...obj}]
        }
      })
      newRules.warnList = newObjWarn;
      setRules([{...newRules}])
    } else {
      //添加
      setRules([{
        ...defaultRules
      }])
    }
  }, [record])

  const handleChange = (type: string, value: any, index: number,ruleItem:number =0) => {
    const newRules = [...rules];
    const newItem = rules[index];
    switch (type) {
    case 'group':
      newItem.group_id = value;
      newItem.miner_id = undefined;
      break;
    case "miner":
      newItem.miner_id = value;
      getCategory(value);
      break;
    case 'warnOk':
      newItem.warnList = value;
      break;
    case 'category':
      newItem.rule[ruleItem].category = value.value;
      newItem.rule[ruleItem].addr = value.address;
      newItem.rule[ruleItem].balance = value.balance;
      break;
    case 'rule':
      if (value) {
        if (!isPositiveInteger(value)) {
          newItem.rule[ruleItem].warning = true
        } else {
          newItem.rule[ruleItem].warning = false;
          newItem.rule[ruleItem].operand = value;
        }
      }
      break;
    }
    newRules.splice(index, 1, newItem);
    setRules(newRules)
  };

  const getCategory = async (value:string) => {
    monitorStore.getMinerCategory(value);
  }

  const handAddRule = (keyType: string, type: string, index: number, ruleIndex?: number) => {
    const newRules: any = [...rules];
    if (keyType === 'add') {
      if (type === 'ruleItem') {
        newRules[index].rule.push({ ...defaultRuleItem })
      } else if (type === 'rule') {
        newRules.push({ ...defaultRules });
      }
    } else if (keyType === 'delete') {
      if (type === 'ruleItem') {
        newRules[index].rule.splice(ruleIndex,1)
      } else if (type === 'rule') {
        newRules.splice(index,1);
      }
    }
    setRules(newRules)

  }

  const handleSave = () => {
    const payload:Array<Record<string,any>> = [];
    rules.forEach((rule: any) => {
      const emailList = rule?.warnList?.email_warn || [];
      const messageList = rule?.warnList?.message_warn ||[]
      const phoneListList = rule?.warnList?.phone_warn ||[]
      const obj = {
        monitor_type: 'BalanceMonitor',
        group_id_or_all: rule.group_id === 'all' ? -1 : Number(rule.group_id),
        miner_or_all: rule.miner_id,
        mail_alert: emailList[0]?.checked ? emailList?.map((v: any) => v.inputValue).join(',') : '',
        msg_alert: messageList[0]?.checked ? messageList?.map((v: any) => v.inputValue).join(',') : '',
        call_alert: phoneListList[0]?.checked ? phoneListList?.map((v: any) => v.inputValue).join(',') : '',
        rules: rule?.rule.map((v:any) => {
          return {
            account_type: v.category,
            account_addr: v.addr,
            operator: v.operator,
            operand: v.operand
          }
        })
      };
      payload.push(obj)
    })
    onChange('save',payload)
  }

  const rulesOptions = useMemo(() => {
    return [{ label: tr('<='), value: '<=' }, //小于等于
    ]
  }, [tr]);

  const CategoryOptions = useMemo(() => {
    const keys = Object.keys(minersCategory);
    const minersOptions:any = {};
    if (keys && Array.isArray(keys)) {
      keys.map(key => {
        minersOptions[key] = minersCategory[key].map((v: any) => {
          return {...v,label: tr(`${v?.type?.toLocaleLowerCase()}`), value: v.type}
        })
      })
    }
    return minersOptions
  },[tr,minersCategory])

  return <Modal
    title={`${tr('add_rules')}`}
    destroyOnClose={true}
    width={700}
    closeIcon={false}
    wrapClassName="custom_left_modal"
    open={showModal}
    onOk={handleSave}
    onCancel={() => {
      onChange('cancel', false);
    }}
    footer={[
      <Button className="cancel_btn" key='cancel_btn' onClick={()=>onChange('cancel',false) }>{ tr('cancel')}</Button>,
      <Button className="primary_btn" key='confirm_btn' onClick={handleSave}>{ tr('confirm')}</Button>
    ]}>
    <div>
      {rules.map((ruleItem: any, index: number) => {
        const showIcon = index === rules.length - 1;
        return <div key={index} className={styles.balance_contain}>
          <div className={styles.balance_contain_title}>{ tr('rule_detail')}</div>
          <div className={styles.balance_contain_header}>
            <Header selectGroup={ruleItem.group_id} selectMiner={ruleItem.miner_id} isAllMiner={false} onChange={(type,value)=>handleChange(type,value,index)} />
            { showIcon && <div className={styles.balance_icons}>
              <span className={styles.balance_icons_icon} onClick={()=>handAddRule('add','rule',index)}>+</span>
              <span className={styles.balance_icons_icon} onClick={()=>handAddRule('delete','rule',index)}>-</span>
            </div>}
          </div>
          {ruleItem.miner_id && <>
            <div className={styles.balance_rule}>
              {ruleItem.rule.map((rule: any, ruleIndex: number) => {
                const showIcon = ruleIndex === ruleItem.rule.length - 1;
                return <div key={ruleIndex}>
                  <div className={styles.balance_rule_main}>
                    <Selects
                      key={ruleIndex+'select'}
                      className={styles.balance_rule_select}
                      value={rule.category}
                      placeholder={ tr('balance_category_placeholder')}
                      options={CategoryOptions&&CategoryOptions[ruleItem.miner_id] ||[]}
                      onChange={(value,item)=>handleChange('category',item,index,ruleIndex)}
                    />
                    <Selects
                      className={styles.balance_rule_select}
                      value={rule.operator}
                      disabled={true}
                      options={rulesOptions}
                    />
                    <div className={styles.balance_rule_content}>
                      <Input
                        style={{borderColor:rule.warning ? 'red':''} }
                        className={`custom_input ${styles.balance_rule_input}`}
                        defaultValue={rule.operand}
                        placeholder={tr(rule.placeholder) }
                        onBlur={(e)=>handleChange('rule',e.target.value,index,ruleIndex)}
                      />
                      {ruleItem.rule.warning && <span className={styles.balance_rule_content_warning }>{tr(ruleItem.rule.warningText ) }</span> }
                    </div>
                    <div className={styles.balance_rule_text}>{'FIL'}</div>
                    <div className={styles.balance_icons}>
                      { showIcon && <span className={styles.balance_icons_icon} onClick={()=>handAddRule('add','ruleItem',index,ruleIndex)}>+</span>}
                      <span className={styles.balance_icons_icon} onClick={()=>handAddRule('delete','ruleItem',index,ruleIndex)}>-</span>
                    </div>

                  </div>
                  <div className={styles.balance_rule_des}>
                    { rule?.balance && tr('balance_rule_des', {value:formatFil(rule.balance,'FIL')})}
                  </div>
                </div>
              }) }

            </div>
            <div className={styles.balance_warn}>
              <Warn noModal={true} onChange={(type,value)=>handleChange(type,value,index)} warnData={ruleItem?.warnList}/>
            </div>
          </>}
        </div>
      }) }
    </div>
  </Modal>
})