import { Translation } from "@/components/hooks/Translation";
import { home_meta } from "@/contents/home"

//type A = (typeof home_meta)[number]['dataIndex'] --> Record<A,number|undefined>



type ElementType<T extends readonly any[]> = T extends readonly (infer ElementType)[]
  ? ElementType : never
type DataIndex = ElementType<typeof home_meta>['dataIndex']
 
type Item = ElementType<typeof home_meta>

const mockData: Record<DataIndex, number | undefined> & {
  [key:string]: number | undefined
} =  {
  power_increase_24h: 3740899077455872,
  increase_24h:-46.23,
  add_power_in_32g: 6732636259164418311,
  miner_initial_pledge: 6732636359164418311,
  fil_per_tera_24h: 374089907741648311,
  total_contract: 5678.9012,
  contract_24h:123,
  contract_transaction: 6789.0123,
  contract_address: 7890.1234,
  gas_24: 8901.2345
};
;

function Meta() { 
  const { tr } = Translation({ ns: 'home' });
  
    return <div className="border card_shadow w-[831px] h-[270px] inline-grid grid-cols-4 gap-2 px-6 py-10 rounded-xl">
      {home_meta.map((item: Item,index:number) => { 
        const { render, dataIndex, title } = item;
        const value = mockData[dataIndex]
        const renderDom = render && render(value,mockData)
            return <div key={item.dataIndex}>
                <div className="text_clip font-DIN font-bold text-xl">{renderDom ||value}</div>
                <div className="text-xs font-PingFang">{ tr(title)}</div>
            </div>
        })}
    </div>
}

export default Meta



 