import { Translation } from "@/components/hooks/Translation";
import Selects from "@/packages/selects";
import accountStore from "@/store/modules/account";
import { useMemo } from "react";

interface Props {
              selectGroup:string
              onChange?:(value:string)=>void;
}

export default (props: Props) => {
  const {onChange,selectGroup } = props;
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
      value: '-1',
      miners: [...allMiners]
    }];
    return newGroups.concat(newMinerGroups);
  }, [tr, groupMiners]);
  return <div>
    <Selects
      value={selectGroup}
      options={groups||[]}
      onChange={(v: string) => {
        if(onChange) onChange(v)
      }}
    />
  </div>
}