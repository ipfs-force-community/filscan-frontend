import { Translation } from "@/components/hooks/Translation";
import { contract_detail } from "@/contents/contract";
import Content from "@/packages/content";
import { getSvgIcon } from "@/svgsIcon";

export default ({ data = {} }: {data:Record<string,any>}) => {
  const { tr } = Translation({ ns: 'contract' });

  const { compiled_file = {}, } = data;

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
  </div>
}