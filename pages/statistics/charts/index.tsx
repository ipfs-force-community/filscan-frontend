import { Translation } from "@/components/hooks/Translation";
import { chartsNav } from "@/contents/statistic"
import { Menu_Info } from "@/contents/type";
import { getSvgIcon } from "@/svgsIcon";

export default () => {
  const { tr } = Translation({ ns: 'static' });

  const renderNavChildren = (itemChildren:Array<Menu_Info>) => {
    return <ul>
      {itemChildren.map((child:Menu_Info) => {
        return <li key={ child.key}>{ tr(child.key)}</li>
      })}
    </ul>
  }
  return <div className="main_contain">
    <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
      <span>{tr('static_overview')}</span>
    </div>
    <div className="flex gap-x-5 w-full h-full">
      <ul className="w-[209px] h-full p-4 card_shadow border border_color rounded-xl">
        {chartsNav.map(item => {
          const { preIcon } = item;
          return <li key={item.key} className="flex items-center gap-x-1 font-DINPro-Medium" >
            {preIcon && getSvgIcon(preIcon)}
            {tr(item.key)}
            {item.children && renderNavChildren(item.children)}
          </li>
        })}
      </ul>
      <div className="flex-1 card_shadow border border_color rounded-xl">
                                            text
      </div>
    </div>
  </div>

}