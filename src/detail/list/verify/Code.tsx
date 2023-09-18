import Copy from "@/components/copy";
import { Translation } from "@/components/hooks/Translation";
import { contract_detail } from "@/contents/contract";
import Select from "@/packages/select";
import Selects from "@/packages/selects";
import { getSvgIcon } from "@/svgsIcon";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

export default ({ data = {},actorId }: {data:Record<string,any>,actorId?:string}) => {
  const { tr } = Translation({ ns: 'contract' });

  const { compiled_file = {}, source_file = [] } = data;

  const handleAbiChange = (value:string) => {
    if (actorId) {
      window.open(`${window.location.origin}/contract/abi/${actorId}?format=${value}`)
    }
  }

  return <div className="mt-5">
    <span className="flex items-center gap-x-1">
      { getSvgIcon('successIcon')}
      {tr('verify_contract')}
    </span>
    <ul className="flex flex-wrap gap-y-2 border border_color mt-5 rounded-md p-5">
      {contract_detail.list.map(item => {
        const { dataIndex, title, render } = item
        const value =render&& compiled_file ?render(compiled_file[dataIndex]||'',data):compiled_file&&compiled_file[dataIndex] ||""
        return <li className="flex items-center h-9 w-1/2" key={ dataIndex}>
          <span className="w-28 text_des">{tr(item.title)}:</span>
          <span>{ value}</span>
        </li>
      })}
    </ul>
    <div className="my-5">
      <div className="mb-5">
        <span className="text-sm font-medium">{`${tr('source_code')} (Solidity)`} </span>
      </div>
      {source_file?.map((item:any,index:number) => {
        return <div key={ index}>
          <div className="flex justify-between items-center my-2.5">
            <span>
              {item?.file_name || ''}
            </span>
            <span className="w-7 h-7 flex items-center justify-center border border_color rounded-[5px]">
              <Copy text={item.source_code} className="text_color"/>
            </span>
          </div>
          <Editor value={item.source_code || {}} otherProps={{readOnly:true}} />
        </div>

      })}

    </div>
    <div className="my-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{`${tr('contract_abi')}`} </span>
        <Selects
          placeholder={tr(contract_detail.abiOptions.placeholder)}
          options={contract_detail.abiOptions.list}
          onChange={handleAbiChange} />
      </div>
      <div className="h-[300px] p-5 overflow-auto border border_color rounded-[5px] break-words">{ compiled_file?.ABI||''}</div>
    </div>
    <div className="my-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">{`${tr('source_code_create')}`} </span>
        <span className="w-7 h-7 flex items-center justify-center border border_color rounded-[5px]">
          <Copy text={compiled_file?.byte_code} className="text_color"/>
        </span>
      </div>
      <div className="h-[300px] p-5 overflow-auto border border_color rounded-[5px] break-words">{ compiled_file?.byte_code||''}</div>
    </div>
  </div>
}