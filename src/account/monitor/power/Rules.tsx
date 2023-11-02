import { Button, Input, Modal } from "antd"
import Header from "../header";
import { useMemo, useState } from "react";
import { Translation } from "@/components/hooks/Translation";
import styles from './index.module.scss';
import Selects from "@/packages/selects";
import Warn from "../warn";
import { isPositiveInteger } from "@/utils";
interface Props {
  showModal: boolean;
  onChange:(type:string,value:any)=>void;
}

const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: {
    value: '30',
    placeholder: 'power_ruler_placeholder',
    warning: false,
    warningText:'power_ruler_warningText',
  },
}
export default (props: Props) => {
  const { showModal, onChange } = props;
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

  const handleSave = () => { 
    //保存规则
    console.log('==save===33',rules)
  }
  
  const handAddRule = () => { 
    const newRules = [...rules];
    newRules.push({ ...defaultRules });
    setRules(newRules)
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
    width={600}
    wrapClassName="custom_left_modal"
    open={showModal} onOk={handleSave}
    onCancel={() => onChange('cancel', false)}
    footer={[
      <Button className="cancel_btn" onClick={()=>onChange('cancel',false) }>{ tr('cancel')}</Button>,
      <Button className="primary_btn" onClick={handleSave}>{ tr('confirm')}</Button>
    ] }
  >
     <div>
      {rules.map((ruleItem: any, index: number) => {
        const showIcon = index === rules.length - 1;
        return <div key={index} className={styles.power_contain}>
          <div className={styles.power_contain_title}>{ tr('rule_detail')}</div>
          <div className={styles.power_contain_header}>
          <Header selectGroup={ruleItem.group_id} selectMiner={ruleItem.miner_id} onChange={(type,value)=>handleChange(type,value,index)} />
          { showIcon && <div className={styles.power_icons}>
            <span className={styles.power_icons_icon} onClick={handAddRule}>+</span>
            <span className={styles.power_icons_icon}>-</span>
          </div>}
        </div>
          {ruleItem.miner_id && <>
           <div className={styles.power_rule}>
            <div className={styles.power_rule_title}>{tr('power_rule_title')}</div>
            <div className={styles.power_rule_main}>
              <Selects
                  className={styles.power_rule_select}
                  value={'<='}
                  disabled={true}
                  options={rulesOptions}
              />
              <div className={styles.power_rule_content}>
                <Input
              style={{borderColor:ruleItem.rule.warning ? 'red':''} }
                className={`custom_input ${styles.power_rule_input}`}
                defaultValue={ruleItem.rule.value}
                placeholder={tr(ruleItem.rule.placeholder) }
                onBlur={(e)=>handleChange('rule',e.target.value,index)}                                                      
                />
                {ruleItem.rule.warning && <span className={styles.power_rule_content_warning}>{tr(ruleItem.rule.warningText ) }</span> }
              </div>
             
                <div className={styles.power_rule_text}>{tr('day')}</div>
            </div>
            <div className={styles.power_rule_des}>
              { tr('power_rule_des')}
            </div>
          </div> 
          <div className={styles.power_warn}>
            <Warn noModal={true} onChange={(type,value)=>handleChange(type,value,index)} />
          </div>
          </>}
        </div>
      }) }
    </div>
  </Modal>
}