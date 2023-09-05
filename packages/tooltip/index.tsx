/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';
interface TooltipProps{
  context: string|ReactNode;
  children?:ReactNode;
  icon?:boolean
}

export default (props: TooltipProps) => {
  const { context,icon=true } = props;

  return (
    <Tooltip overlayClassName='custom-tooltip-wrap ' title={context}>
      {icon ? <span className='cursor-pointer'>{ getSvgIcon('tip')}</span>:<></>}
      <>{props.children}</>
    </Tooltip>
  );
};
