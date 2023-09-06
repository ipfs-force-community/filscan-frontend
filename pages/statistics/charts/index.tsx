import { Translation } from "@/components/hooks/Translation";
import { useHash } from "@/components/hooks/useHash";
import { chartsNav } from "@/contents/statistic"
import { Menu_Info } from "@/contents/type";
import { getSvgIcon } from "@/svgsIcon";
import PowerTrend from '@/src/statistics/Trend'

export default () => {
  const { tr } = Translation({ ns: 'static' });
  const { hash } = useHash()

  const renderNavChildren = (itemChildren:Array<Menu_Info>) => {
    return <ul className="flex flex-col w-full">
      {itemChildren.map((child:Menu_Info) => {
        return <li key={child.key} className={ `flex items-center gap-x-2 p-2 w-full pl-10 h-10 hover:bg-bg_hover rounded-[5px] ${hash ===child.key?'text-primary bg-bg_hover':'' }`}>{ tr(child?.title||child.key)}</li>
      })}
    </ul>
  }
  return <div className="main_contain flex flex-col">
    <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
      <span>{tr('static_overview')}</span>
    </div>
    <div className="flex-1 flex gap-x-5 w-full h-full">
      <ul className="w-[209px] flex py-4 card_shadow border border_color rounded-xl cursor-pointer">
        {chartsNav.map(item => {
          const { preIcon,title,key } = item;
          return <div key={item.key} id={key} className="flex flex-col w-full px-4 items-center font-DINPro-Medium" >
            <li className={ `flex items-center gap-x-2 p-2 w-full h-10`} >
              {preIcon && getSvgIcon(preIcon)}
              {tr(title||key)}
            </li>
            {item.children && renderNavChildren(item.children)}
          </div>
        })}
      </ul>
      <div className="flex-1">
        <PowerTrend />
      </div>
    </div>
  </div>

}