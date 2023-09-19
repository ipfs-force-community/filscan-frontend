import { Translation } from "@/components/hooks/Translation";
import { getSvgIcon } from "@/svgsIcon";
import { get_account_type } from "@/utils"
import { useMemo, useState } from "react";

export default ({ content }: { content: Array<any> }) => {
  const { tr } = Translation({ ns: 'common' });
  const [open,setOpen]= useState(false)

  const showContent = useMemo(() => {
    if (content.length > 2 && !open) {
      return content.slice(0, 2)
    }
    return content

  }, [content, open])

  return <ul className="flex items-baseline flex-col  flex-wrap justify-end gap-2">
    {showContent.map((item,index) => {
      return <li className='flex w-full items-center gap-x-1 justify-end' key={ index} >{get_account_type(item,0)}</li>
    })}
    {content.length > 2 && <span className="flex items-center gap-x-1 self-end text_des text-xs cursor-pointer" onClick={()=>{setOpen(!open)} }>
      { tr(open?'no_open':'open')}
      <span className={open ?'transform rotate-180':'' }>{ getSvgIcon('downIcon')}</span>
    </span>}
  </ul>
}