/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getShowData } from '@/utils';
import { HTMLAttributes, useMemo } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import useWindow from '@/components/hooks/useWindown';

//ts-ignore
interface ContentProps extends HTMLAttributes<HTMLElement>{
  contents: Array<any>;
  ns: string;
  columns?: number;
  data: Record<string, any>;
}

export default (props:ContentProps) => {
  const {isMobile} = useWindow()

  const {contents, data, columns = 1, ns} = props;

  const { tr } = Translation({ ns: ns });
  const showWidth = useMemo(() => {
    if (columns !== 1) {
      return Math.abs(100 / columns) + '%';
    }
    return '100%';
  }, [columns]);
  return (
    <ul
      className={classNames(styles['detail-content'],`flex w-full max-h-full flex-col p-2.5 ${
        columns !== 1 ? 'flex-wrap' : 'gap-y-5'
      }`,props.className)}>
      {contents.map((item, index) => {
        const {
          title,
          dataIndex,
          style = {},
          borderTop,
          elasticity,
          render,
        } = item;
        const itemData = getShowData(item, data);
        const value = itemData && itemData[dataIndex];
        const renderValue = render ? render(value, data, tr) : value;
        const showTitle =
          typeof title === 'string' ? tr(title) : title(tr, index);
        //当没有值时，不显示此行的数据，包含title
        if (dataIndex === 'message_ERC20Trans') {
          console.log('====ddd',renderValue)
        }
        if (elasticity && !renderValue) {
          return null;
        }
        return isMobile&&item['mobileHide']?<></>:(
          <li
            key={index}
            className={
              classNames(`flex items-baseline gap-x-2.5 
            ${ borderTop ? 'pt-5 border-t border_color' : '' }
            ${columns !== 1 ? 'px-5 h-9 ' : ''}`,styles.itemWrap)
            }
            style={{ width: showWidth, ...style }}>
            <span className={`w-28 min-w-28 flex-shrink-0 text_des`}>
              {showTitle}:
            </span>
            <span
              className={classNames(`flex-grow overflow-auto font-DINPro-Medium`,columns !== 1 ? 'flex justify-end' : '',isMobile ? styles.value : '')}>
              {renderValue}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
