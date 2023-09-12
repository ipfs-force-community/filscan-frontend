import { Translation } from "@/components/hooks/Translation";
import { verify_output, verify_source } from "@/contents/contract"
import { getSvgIcon } from "@/svgsIcon";
import { Button } from "antd";
import Link from "next/link";

export default ({ data }: {data:any}) => {
  const { tr } = Translation({ ns: 'contract' });

  return <div className="border rounded-xl card_shadow border_color mt-2.5 ">
    <ul className="border border_color rounded-[5px] m-5 text_des  text-xs p-4">
      {verify_source.desList.map(item => {
        return <li key={ item.title}>{ tr(item.title)}</li>
      })}
    </ul>
    <div className="mt-5 p-5">
      <div className="font-medium">
        { tr('byte_code')}
      </div>
      <span
        className={ `flex items-center gap-x-1 my-4 ${!data?.is_verified && !data?.has_been_verified?'text_red':'text_green'}`}
      >
        {!data?.is_verified && !data?.has_been_verified ? getSvgIcon('errorIcon'):getSvgIcon('successIcon')}
        {data?.has_been_verified ? tr('has_been_verified') : data?.is_verified ? tr('ver_sucess') : tr('ver_err')}
      </span>
      <div className="border border_color overflow-auto  min-h-[9px] max-h-[150px] rounded-[5px] p-5 break-words">
        {data.byte_code}
      </div>
    </div>
    <ul className="p-5 border-t border-b border_color ">
      {verify_output.headerList.map(item => {
        const value = data[item.dataIndex];
        return <li key={ item.dataIndex} className="flex items-center h-9 text-sm">
          <span className="text_des w-28 ">{tr(item.title)}:</span>
          <span className="font-DINPro-Medium">{String(value) }</span>
        </li>
      })}
    </ul>
    <div className="m-5 border border_color rounded-[5px] text-sm">
      <div className="m-5">
        <span>{tr('contract_name')}</span>
        <div className="flex items-center h-9 mt-3 border border_color rounded-[5px] px-2.5 ">{ data?.contract_name||''}</div>
      </div>
      <div className="m-5">
        <span>{tr('local_byte_code')}</span>
        <div className="h-[166px] px-2.5 text_des overflow-auto mt-3 border border_color rounded-[5px] break-words ">{ data?.ABI||''}</div>
      </div>
    </div>
    <div className="flex gap-x-4 m-8">
      <Link href={`/address/${data.contract_address}`} className="primary_btn flex items-center gap-x-2 h-8"> {tr('look_adres')}</Link>
      <Link href={`/contract/verify`} className="flex items-center justify-center cancel_btn border border_color rounded-md" > { tr('back')}</Link>
    </div>
  </div>
}