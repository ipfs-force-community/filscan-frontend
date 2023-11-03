
import Selects from '@/packages/selects';
import style from './index.module.scss'
import { observer } from 'mobx-react';
import accountStore from '@/store/modules/account'
import { Translation } from '@/components/hooks/Translation';
import { useMemo, useRef, useState } from 'react';
import { Button } from 'antd';

interface Props {
  selectGroup: string;
  selectMiner?: string;
  selectTag?: string;
  showMiner?: boolean;
  addRule?:boolean
  onChange: (type: string, value: string | number | boolean) => void;
}

export default observer((props: Props) => {
  const { onChange, selectGroup,selectMiner,selectTag,addRule,showMiner=true} = props;
  const { groupMiners } = accountStore;
  const { tr } = Translation({ ns: 'account' });
  const [selectItem, setSelectItem] = useState<Record<string, any>>({});
  const [selectMinerItem, setSelectMinerItem] = useState<Record<string, any>>({});

  const [groups,allMiners,allTags] = useMemo(() => {
    const newMinerGroups:Array<any> =[]
    const allMiners :Array<any>= [{
      label: tr('all_miners'),
      value:'all',
    }];
    const allTags:Record<string,string> = {};
    groupMiners?.forEach(group => {
      const miners: Array<any> = [];
      const tags:Record<string,string> = {};
      group?.miners_info.forEach(v => {
        allMiners.push({
          miner_tag:v.miner_tag,
          label: String(v.miner_id),
          value:String(v.miner_id)
        })
        miners.push({
          miner_tag:v.miner_tag,
          label: String(v.miner_id),
          value:String(v.miner_id)
        })
        if (v.miner_tag) {
          allTags[v.miner_tag] = v.miner_tag
          tags[v.miner_tag] = v.miner_tag
        }
      })
      if (group.is_default) {
        group.label = tr(group.group_name);
      }
      newMinerGroups.push({...group,miners: miners,tags:tags})
    });
    const newGroups: Array<any> = [{
      label: tr('all_groups'),
      group_name: 'all_groups',
      value: 'all',
      miners: [...allMiners]
    }];
    return [newGroups.concat(newMinerGroups),allMiners,allTags];
  }, [tr, groupMiners]);

  const showTags = useMemo(() => {
    const newTags = [{
      label: tr('all_tags'),
      value:'all',
    }];
    if (selectMinerItem.value && selectMinerItem.value !== 'all') {
      newTags.push({
        label: selectMinerItem.miner_tag,
        value: selectMinerItem.miner_tag
      })
    } else if (selectItem.group_id) {
      Object.keys(selectItem.tags)?.forEach(tagKey => {
        newTags.push({
          label: tagKey,
          value:tagKey
        })
      })
    }else if (allTags && Object.keys(allTags).length > 0) {
      Object.keys(allTags).forEach(tagKey => {
        newTags.push({
          label: tagKey,
          value:tagKey
        })
      })
    }
    return newTags
  },[allTags,selectItem,selectMinerItem])

  const handleChange = (type: string, value: string | number | boolean, item?: any) => {
    if (type === 'group') {
      setSelectItem(item)
    } else if (type === 'miner') {
      setSelectMinerItem(item)
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
      { showMiner && <Selects
        value={selectMiner}
        placeholder={tr('select_miner') }
        options={selectItem?.group_id ? selectItem?.miners||[]:allMiners}
        onChange={(v: string,item:any) => {
          handleChange('miner',v,item)
        }}
      />}
      { showMiner && <Selects
        value={selectTag}
        placeholder={tr('select_miner_tag') }
        options={showTags}
        onChange={(v: string,item:any) => {
          handleChange('miner_tag',v,item)
        }}
      />}

    </div>
    { addRule && <Button className='primary_btn' onClick={()=>handleChange('addRules',true)}>{ tr('add_rules')}</Button>}
  </div>
})