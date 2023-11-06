/** @format */

import { message } from 'antd';
import copy from 'copy-to-clipboard';
import CopySvg from '@/assets/images/copy.svg';
import styles from './index.module.scss'
import classNames from 'classnames';
import { getSvgIcon } from '@/svgsIcon';
import { BrowserView, MobileView } from '../device-detect';
export default ({
  text,
  icon,
  className,
}: {
  text: string;
    icon?: React.ReactNode|JSX.Element;
    className?: string;

}) => {
  const handleClick = () => {
    //copynavigator
    copy(text);
    return message.success('Clipboard Successfully');
    // navigator?.clipboard?.writeText(text).then(function() {
    //     /* clipboard successfully set */
    //     message.success('clipboard successfully')
    //     }, function() {
    //     /* clipboard write failed */
    //     message.warning('clipboard failed')

    //     });
  };
  return (
    <span
      style={{ cursor: 'pointer' ,width:'13px'}}
      className={classNames(`flex-center text-bgCopy ${className}`,styles.wrap)}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <BrowserView>{ getSvgIcon('copyIcon')} </BrowserView>
      <MobileView>
        {icon ?? <CopySvg width={13} height={14} />}
      </MobileView>
    </span>
  );
};
