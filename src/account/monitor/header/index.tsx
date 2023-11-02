
import Selects from '@/packages/selects';
import style from './index.module.scss'
import { observer } from 'mobx-react';
import accountStore from '@/store/modules/account'
import { Translation } from '@/components/hooks/Translation';
import { useMemo, useRef, useState } from 'react';
import { Button } from 'antd';

interface Props {
  selectGroup: string;
  selectMiner: string;
  addRule?:boolean
  onChange: (type: string, value: string | number | boolean) => void;
}

export default observer((props: Props) => {
  const { onChange, selectGroup,selectMiner,addRule } = props;
  const { groupMiners } = accountStore;
  const { tr } = Translation({ ns: 'account' });
  const [selectItem, setSelectItem] = useState<Record<string, any>>({});

  const [groups,allMiners] = useMemo(() => {
    const newMinerGroups =groupMiners ? [...groupMiners]:[]
    const allMiners = [];
    allMiners.push({
      label: tr('all_miners'),
      value:'all',
    })
    if (newMinerGroups&&newMinerGroups?.length > 0) {
      for (let group of newMinerGroups) {
        if (group.miners) {
          allMiners.push(...group?.miners);
        }
        if (group.is_default) {
          group.label = tr(group.group_name);
          break;
        }
      }
    }
    const newGroups: Array<any> = [{
      label: tr('all_groups'),
      group_name: 'all_groups',
      value: 'all',
      miners: [...allMiners]
    }];
    return [newGroups.concat(newMinerGroups),allMiners];
  }, [tr, groupMiners]);

  const handleChange = (type: string, value: string | number | boolean, item?: any) => {
    if (type === 'group') { 
      setSelectItem(item)
    }
    onChange(type,value)
  }

  return <div className={style.header}>
    <div className={style.header_left}>
      <Selects
        value={selectGroup}
        placeholder={tr('select_group') }
        options={groups||[]}
        onChange={(v: string,item:any) => {
          handleChange('group',v,item)
        }}
      />
      <Selects
        value={selectMiner}
        placeholder={tr('select_miner') }
        options={selectItem?.group_id ? selectItem?.miners||[]:allMiners}
        onChange={(v: string,item:any) => {
          handleChange('miner',v,item)
        }}
      />
    </div>
    { addRule && <Button className='primary_btn' onClick={()=>handleChange('addRules',true)}>{ tr('add_rules')}</Button>}
  </div>
})