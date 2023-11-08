import { Button, Input, Modal } from "antd"
import Header from "../header";
import { useMemo, useState } from "react";
import { Translation } from "@/components/hooks/Translation";
import styles from './index.module.scss';
import Selects from "@/packages/selects";
import Warn from "../warn";
import { isPositiveInteger } from "@/utils";
import monitorStore from "@/store/modules/account/monitor";
import { observer } from "mobx-react";
interface Props {
  showModal: boolean;
  onChange:(type:string,value:any)=>void;
}

const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: {
    value: '30',
    placeholder: 'sector_ruler_placeholder',
    warning: false,
    warningText:'sector_ruler_warningText',
  },
  warnList: undefined
}
export default observer((props: Props) => {
  const { showModal, onChange } = props;
  const { saveLoading } = monitorStore
  const { tr } = Translation({ ns: 'account' });
  const [rules, setRules] = useState<any>([{ ...defaultRules }]);

  const handleChange = (type: string, value: any, index: number) => {
    const newRules = [...rules];
    const newItem = rules[index];
    switch (type) {
    case 'group':
      newItem.group_id = value;
      newItem.miner_id = undefined;
      break;
    case "miner":
      newItem.miner_id = value;
    case 'warnOk':
      newItem.warnList = value;
      break;
    case 'rule':
      if (value) {
        if (!isPositiveInteger(value)) {
          newItem.rule.warning = true
        } else {
          newItem.rule.warning = false;
        }
      }
      break;
    }

    newRules.splice(index, 1, newItem);
    setRules(newRules)
  };

  const handleSave = async () => {
    const payload:Array<Record<string,any>> = [];
    rules.forEach((rule: any) => {
      const emailList = rule?.warnList?.email_warn || [];
      const messageList = rule?.warnList?.message_warn ||[]
      const phoneListList = rule?.warnList?.phone_warn ||[]
      const ruleItem= rule?.rule || {}
      const obj = {
        monitor_type: 'ExpireSectorMonitor',
        user_id: 27,
        group_id_or_all: rule.group_id === 'all' ? -1:Number(rule.group_id) ,
        miner_or_all: rule.miner_id,
        mail_alert: emailList[0]?.checked ? emailList?.map((v: any) => v.inputValue).join(','):'',
        msg_alert: messageList[0]?.checked ? messageList?.map((v: any) => v.inputValue).join(','):'',
        call_alert: phoneListList[0]?.checked? phoneListList?.map((v: any) => v.inputValue).join(','):'',
        rules: [
          {
            account_type: '',
            account_addr: '',
            operator: '<=',
            operand: ruleItem.value
          }
        ]
      };
      payload.push(obj)
    })
    const result = await monitorStore.saveUserRules(payload);
    if (result) {
      onChange('ok',false)
    }
  }

  const handleRules = (type:string,index:number) => {
    //保存规则
    const newRules = [...rules];
    if (type === 'delete' ) {
      newRules.splice(index, 1)
    } else if (type === 'add') {
      newRules.push({ ...defaultRules });
    }
    setRules(newRules)
    console.log('==save=sector==',rules)
  }

  const rulesOptions = useMemo(() => {
    return [
      {label:tr('<='),value: '<='}, //小于等于
    ]
  },[tr])

  return <Modal
    title={`${tr('add_rules')}`}
    destroyOnClose={true}
    closeIcon={false}
    width={560}
    wrapClassName="custom_left_modal"
    open={showModal} onOk={handleSave}
    onCancel={() => onChange('cancel', false)}
    footer={[
      <Button className="cancel_btn" key='cancel_btn' onClick={()=>onChange('cancel',false) }>{ tr('cancel')}</Button>,
      <Button className="primary_btn" key='primary_btn' loading={saveLoading} onClick={handleSave}>{ tr('confirm')}</Button>
    ] }
  >
    <div>
      {rules.map((ruleItem: any, index: number) => {
        const showIcon = index === rules.length - 1;
        const deleteIcon = rules.length > 1;
        return <div key={index} className={styles.sector_contain}>
          <div className={styles.sector_contain_title}>{ tr('rule_detail')}</div>
          <div className={styles.sector_contain_header}>
            <Header selectGroup={ruleItem.group_id} selectMiner={ruleItem.miner_id} onChange={(type,value)=>handleChange(type,value,index)} />
            <div className={styles.sector_icons}>
              { showIcon && <span className={styles.sector_icons_icon} onClick={() => handleRules('add', index)}>+</span>}
              { deleteIcon &&<span className={styles.sector_icons_icon} onClick={()=>handleRules('delete',index) }>-</span> }
            </div>
          </div>
          {ruleItem.miner_id && <>
            <div className={styles.sector_rule}>
              <div className={styles.sector_rule_title}>{tr('sector_rule_title')}</div>
              <div className={styles.sector_rule_main}>
                <Selects
                  className={styles.sector_rule_select}
                  value={'<='}
                  disabled={true}
                  options={rulesOptions}
                />
                <div className={styles.sector_rule_content}>
                  <Input
                    style={{borderColor:ruleItem.rule.warning ? 'red':''} }
                    className={`custom_input ${styles.sector_rule_input}`}
                    defaultValue={ruleItem.rule.value}
                    placeholder={tr(ruleItem.rule.placeholder) }
                    onBlur={(e)=>handleChange('rule',e.target.value,index)}
                  />
                  {ruleItem.rule.warning && <span className={styles.sector_rule_content_warning}>{tr(ruleItem.rule.warningText ) }</span> }
                </div>

                <div className={styles.sector_rule_text}>{tr('day')}</div>
              </div>
              <div className={styles.sector_rule_des}>
                { tr('sector_rule_des')}
              </div>
            </div>
            <div className={styles.sector_warn}>
              <Warn noModal={true} onChange={(type,value)=>handleChange(type,value,index)} />
            </div>
          </>}
        </div>
      }) }
    </div>
  </Modal>
})