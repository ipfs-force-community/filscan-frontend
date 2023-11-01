
import Selects from '@/packages/selects';
import style from './index.module.scss'
import { observer } from 'mobx-react';
import accountStore from '@/store/modules/account'
import { Translation } from '@/components/hooks/Translation';
import { useMemo, useRef } from 'react';
import { Button } from 'antd';

interface Props {
              selectGroup:string|number
onChange?:(type:string,value:string|number|boolean)=>void;
}

export default observer((props: Props) => {
  const { onChange, selectGroup } = props;

  const { groupMiners } = accountStore;

  const { tr } = Translation({ ns: 'account' });
  const groups:any = useMemo(() => {
    const newMinerGroups =groupMiners ? [...groupMiners]:[]
    const allMiners = [];

    if (newMinerGroups&&newMinerGroups?.length > 0) {
      for (let group of newMinerGroups) {
        if (group.miners) {
          allMiners.push(...group.miners);
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
    return newGroups.concat(newMinerGroups);
  }, [tr, groupMiners]);

  const handleChange = (type:string,value:string|number|boolean) => {
    if (onChange) {
      onChange(type,value)
    }
  }
  return <div className={style.header}>
    <div>
      <Selects
        value={'all'}
        options={groups||[]}
        onChange={(v: string) => {
          handleChange('group',v)
        }}
      />
      <Selects
        value={'all_miners'}
        options={groups.miners||[]}
        onChange={(v: string) => {
          handleChange('group',v)
        }}
      />
    </div>
    <Button className='primary_btn' onClick={()=>handleChange('addRules',true)}>{ tr('add_rules')}</Button>
  </div>
})