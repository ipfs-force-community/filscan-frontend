import { Translation } from "@/components/hooks/Translation";
import { Button, Input, Modal } from "antd"
import styles from './index.module.scss'
import { useMemo, useState } from "react";
import Header from "../header";
import { isPositiveInteger } from "@/utils";
import Selects from "@/packages/selects";
import Warn from "../warn";
interface Props {
  showModal: boolean;
  onChange:(type:string,value:any)=>void;
}

const defaultRules = {
  group_id: undefined,
  miner_id: undefined,
  rule: {
    category:undefined,
    value: '',
    placeholder: 'sector_ruler_placeholder',
    warning: false,
    warningText:'sector_ruler_warningText',
  },
}

export default (props:Props) => {
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
    case 'category':
      newItem.rule.category=value
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

  const handAddRule = () => {
    const newRules = [...rules];
    newRules.push({ ...defaultRules });
    setRules(newRules)
  }

  const handleSave = () => {
    console.log('----balance save',rules)
  }

  const rulesOptions = useMemo(() => {
    return [{ label: tr('<='), value: '<=' }, //小于等于
    ]
  }, [tr]);

  const CategoryOptions = useMemo(() => {
    return [
      { label: tr('miner_balance_alone'), value: 'miner_balance' },
      { label: tr('owner_balance_alone'), value: 'owner_balance' },
      { label: tr('worker_balance_alone'), value: 'worker_balance' },
      { label: tr('controller_0_balance_alone'), value: 'controller_0_balance' },
      { label: tr('controller_1_balance_alone'), value: 'controller_1_balance' },
      { label: tr('controller_2_balance_alone'), value: 'controller_2_balance' },
    ]
  },[tr])

  return <Modal
    title={`${tr('add_rules')}`}
    destroyOnClose={true}
    width={700}
    closeIcon={false}
    wrapClassName="custom_left_modal"
    open={showModal} onOk={handleSave}
    onCancel={() => onChange('cancel', false)}
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
            <Header selectGroup={ruleItem.group_id} selectMiner={ruleItem.miner_id} onChange={(type,value)=>handleChange(type,value,index)} />
            { showIcon && <div className={styles.balance_icons}>
              <span className={styles.balance_icons_icon} onClick={handAddRule}>+</span>
              <span className={styles.balance_icons_icon}>-</span>
            </div>}
          </div>
          {ruleItem.miner_id && <>
            <div className={styles.balance_rule}>
              {/* <div className={styles.balance_rule_title}>

              </div> */}
              <div className={styles.balance_rule_main}>
                <Selects
                  className={styles.balance_rule_select}
                  value={ ruleItem.rule.category}
                  placeholder={ tr('balance_category_placeholder')}
                  options={CategoryOptions}
                  onChange={(value)=>handleChange('category',value,index)}
                />
                <Selects
                  className={styles.balance_rule_select}
                  value={'<='}
                  disabled={true}
                  options={rulesOptions}
                />
                <div className={styles.balance_rule_content}>
                  <Input
                    style={{borderColor:ruleItem.rule.warning ? 'red':''} }
                    className={`custom_input ${styles.balance_rule_input}`}
                    defaultValue={ruleItem.rule.value}
                    placeholder={tr(ruleItem.rule.placeholder) }
                    onBlur={(e)=>handleChange('rule',e.target.value,index)}
                  />
                  {ruleItem.rule.warning && <span className={styles.balance_rule_content_warning }>{tr(ruleItem.rule.warningText ) }</span> }
                </div>
                <div className={styles.balance_rule_text}>{'FIL'}</div>
              </div>
              <div className={styles.balance_rule_des}>
                {tr('balance_rule_des', {value:'100,000,00'})}
              </div>
            </div>
            <div className={styles.balance_warn}>
              <Warn noModal={true} onChange={(type,value)=>handleChange(type,value,index)} />
            </div>
          </>}
        </div>
      }) }
    </div>
  </Modal>
}