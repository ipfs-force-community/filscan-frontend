import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl"
import { defi_market } from "@/contents/fevm";
import useAxiosData from "@/store/useAxiosData";
import DefiList from '@/src/fevm/defi'

export default () => {
  const { data: defiData, loading } = useAxiosData(apiUrl.fevm_defiSummary);
  const { tr } = Translation({ ns: 'fevm' });

  return <div className="main_contain">
    <ul className="flex p-5 border border_color card_shadow rounded-xl h-[104px] items-center">
      {defi_market.map(item => {
        const { title, dataIndex, render } = item;
        const value = defiData&&defiData[dataIndex];
        const showValue = render ? render(value,defiData):value
        return <li className="flex-1 flex items-center justify-center border-r border_color last:border-0" key={ item.dataIndex}>
          <span className="flex flex-col w-fit " >
            <span className="text-sm font-DIN mb-2.5 text_des">{tr(title)}</span>
            <span className="text-xl font-DINPro-Bold">{ showValue}</span>
          </span>
        </li>
      })}
    </ul>
    <div className="mt-5">
      <span className="text-lg font-DINPro-Bold"> {tr('defi_overview')}</span>
      <DefiList />
    </div>

  </div>
}