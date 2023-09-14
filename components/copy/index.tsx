/** @format */

import { message } from 'antd';
import copy from 'copy-to-clipboard';
import copySvg from '@/assets/images/copy.svg';
import Image from 'next/image';
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
  icon?: string;
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
      style={{ cursor: 'pointer' ,width:'13px' ,color:'rgba(51, 106, 250, 0.5)'}}
      className={classNames(`flex-center text-primary ${className}`,styles.wrap)}
      onClick={handleClick}>
      <BrowserView>{ getSvgIcon('copyIcon')} </BrowserView>
      <MobileView><Image src={icon??copySvg} width={13} height={14} alt='' /></MobileView>
    </span>
  );
};
