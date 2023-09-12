import { Translation } from "@/components/hooks/Translation";
import { contract_detail } from "@/contents/contract";
import { getSvgIcon } from "@/svgsIcon";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

export default ({ data = {} }: {data:Record<string,any>}) => {
  const { tr } = Translation({ ns: 'contract' });

  const { compiled_file = {}, source_file=[]} = data;

  return <div className="mt-5">
    <span className="flex items-center gap-x-1">
      { getSvgIcon('successIcon')}
      {tr('verify_contract')}
    </span>
    <ul className="flex flex-wrap gap-y-2 border border_color mt-5 rounded-md p-5">
      {contract_detail.list.map(item => {
        const { dataIndex ,title,render} = item
        const value =render?render(compiled_file[dataIndex]||'',data): compiled_file[dataIndex] ||""
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
          <div className="my-2.5">{ item?.file_name||''} </div>
          <Editor value={item.source_code || {}} otherProps={{readOnly:true}} />
        </div>

      })}

    </div>
    <div className="my-5">
      <div className="mb-3">
        <span className="text-sm font-medium">{`${tr('contract_abi')}`} </span>
      </div>
      <div className="h-[300px] p-5 overflow-auto border border_color rounded-[5px] break-words">{ compiled_file?.ABI||''}</div>
    </div>
    <div className="my-5">
      <div className="mb-3">
        <span className="text-sm font-medium">{`${tr('source_code_create')}`} </span>
      </div>
      <div className="h-[300px] p-5 overflow-auto border border_color rounded-[5px] break-words">{ compiled_file?.byte_code||''}</div>
    </div>
  </div>
}