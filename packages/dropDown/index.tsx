import { CheckOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { getSvgIcon } from '@/svgsIcon';

interface Props {
    content: Array<any>,
    value?:any
}

export default (props:Props) => {
  const { content, value } = props;

  const showValue = useMemo(() => {
    if (value) {
      return value
    }
    return content[0]
  }, [value, content])

  return <div className='group'>
    <div className='flex items-center justify-between  min-w-[230px] w-fit h-[32px] px-2.5 rounded-[5px] cursor-pointer border border_color'>
      {showValue?.title}
      {getSvgIcon('downIcon')}
    </div>
    <ul className={`invisible group-hover:visible absolute  z-10 min-w-[230px] w-max	 inset-y-full max-h-fit list-none p-2.5  border rounded-[5px]  select_shadow  border_color`}>
      {content.map((v:any,index) => {
        return <li key={index} className='flex items-center min-h-[36px] '>
          {v?.title}
        </li>
      })}
    </ul>
  </div>
}