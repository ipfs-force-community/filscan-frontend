import { Translation } from "@/components/hooks/Translation";
import { useHash } from "@/components/hooks/useHash"
import { verify } from "@/contents/contract";
import Segmented from "@/packages/segmented";
import { useState } from "react";
import Source from "./Source";

//验证合约
export default () => {
  const { hashParams } = useHash();
  const { tr } = Translation({ ns: 'contract' });
  const [active,setActive] = useState('source_code')
  return <div>
    <div className="mb-10">
      <span className='flex flex-col text-xl font-medium gap-y-2.5'>{tr('verify_title')}</span>
      <span className="text_des text-xs">{ tr('step1_verify_des')}</span>
    </div>
    <Segmented
      data={verify.tabList}
      ns='contract'
      defaultValue='source_code'
      isHash={false}
      onChange={ (v)=>setActive(v)}
    />
    { active === 'source_code' && <Source />}
  </div>
}