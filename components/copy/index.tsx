/** @format */

import { message } from 'antd';
import copy from 'copy-to-clipboard';
import copySvg from '@/assets/images/copy.svg';
import Image from 'next/image';
import styles from './index.module.scss'
import classNames from 'classnames';
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
      style={{ cursor: 'pointer', color: 'rgb(154,154,154)' }}
      className={classNames(`flex-center ${className}`,styles.wrap)}
      onClick={handleClick}>
      <Image src={icon??copySvg} width={13} height={14} alt='' />
    </span>
  );
};
