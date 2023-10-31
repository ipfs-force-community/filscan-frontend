
import Selects from '@/packages/selects';
import style from './index.module.scss'
import { observer } from 'mobx-react';
import accountStore from '@/store/modules/account'
import { Translation } from '@/components/hooks/Translation';
import { useMemo } from 'react';
import { Button } from 'antd';

interface Props {
              selectGroup:string|number
onChange?:(type:string,value:string|number|boolean)=>void;
}

export default observer((props: Props) => {
  const {onChange ,selectGroup} = props;
  const { groupMiners } = accountStore;
  const { tr } = Translation({ ns: 'account' });

  const groups = useMemo(() => {
    const newGroups: Array<any> = [{
      label: tr('all_groups'),
      group_name: 'all_groups',
      value: 'all'
    }];
    groupMiners?.forEach(v => {
      newGroups.push({ ...v, label: v.is_default ? tr(v.group_name) : v.group_name, value: v.group_id })
    })
    return newGroups;
  }, [tr, groupMiners]);

  const miners = useMemo(() => { },[])

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
      {/* <Selects
      value={'all'}
      options={groups||[]}
      onChange={(v: string) => {
        handleChange('group',v)
      }}
    /> */}
    </div>
    <Button className='primary_btn' onClick={()=>handleChange('addRules',true)}>{ tr('add_rules')}</Button>
  </div>
})