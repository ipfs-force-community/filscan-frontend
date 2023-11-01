import { Button, Input, Modal } from "antd"
import Header from "../header";
import { useMemo, useState } from "react";
import { Translation } from "@/components/hooks/Translation";
import styles from './index.module.scss';
import Select from "@/packages/select";
import Selects from "@/packages/selects";
import Warn from "../warn";
interface Props {
  showModal: boolean;
  onChange:(type:string,value:any)=>void;
}

const defaultRules = {
  group_id: '',
  miner_id: '',
  rules: {}
}
export default (props: Props) => {
  const { showModal, onChange } = props;
  const { tr } = Translation({ ns: 'account' });
  const [selectGroup, setSelectGroup] = useState('all');
  const [selectMiner, setSelectMiner] = useState('all');
  const [rules, setRules] = useState<any>([{...defaultRules}])
  
  const handleChange = (type: string, value?: any) => {
    switch (type) { 
       case 'group':
        setSelectGroup(value);
        setSelectMiner('all')
        break;
      case "miner":
        setSelectMiner(value)
    }
  };
  
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
    title={`${tr('add_sector_rules')}`}
    destroyOnClose={true}
    closeIcon={false}
    wrapClassName="custom_left_modal"
    open={showModal} onOk={() => { handleChange('ok') }}
    onCancel={() => onChange('cancel', false)}
    footer={[
      <Button className="cancel_btn" onClick={()=>onChange('cancel',false) }>{ tr('cancel')}</Button>,
      <Button className="primary_btn" onClick={()=>handleChange('ok') }>{ tr('confirm')}</Button>
    ] }
  >
    <div className={styles.sector_rules}>
      {rules.map((rule: any, index: number) => {
        const showIcon = index === rules.length - 1;
        return <div key={index} className={styles.sector_rules_contain}>
          <div className={styles.sector_rules_item}>
          <Header selectGroup={selectGroup} selectMiner={selectMiner} onChange={handleChange} />
          { showIcon && <div className={styles.sector_rules_item_icons}>
            <span className={styles.sector_rules_item_icon} onClick={handAddRule}>+</span>
            <span className={styles.sector_rules_item_icon}>-</span>
          </div>}
        </div>
         <div className={styles.sector_rules_rule}>
            <div className={styles.sector_rules_rule_title}>{tr('sector_rule_title')}</div>
            <div className={styles.sector_rules_rule_main}>
              <Selects
                  className={styles.sector_rules_rule_main_select}
                  value={'<='}
                  disabled={true}
                  options={rulesOptions}
                />
              <Input className={`custom_input ${styles.sector_rules_rule_main_input}`}  defaultValue={30} />
                <div className={styles.sector_rules_rule_main_text}>{tr('day') }</div>
            </div>
            <div className={styles.sector_rules_rule_des}>
              { tr('sector_rule_des')}
            </div>
          </div> 
          <div className={styles.sector_rules_warn}>
            <Warn noModal={true} onChange={ handleChange} />
          </div>
        </div>
      }) }
    </div>
  </Modal>
}