/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getShowData } from '@/utils';
import { HTMLAttributes, useMemo } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import useWindow from '@/components/hooks/useWindown';
import { BrowserView, MobileView } from '@/components/device-detect';

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

  // const showWidth = useMemo(() => {
  //   if (columns !== 1) {
  //     return Math.abs(100 / columns) + '%';
  //   }
  //   return '100%';
  // }, [columns]);

  return (
    <ul
      className={classNames(styles['detail-content'],`w-full max-h-full ${
        columns !== 1 ? `grid !grid-cols-2 gap-x-12` : 'flex flex-col p-2.5 gap-y-2'
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
        const showTitle = typeof title === 'function' ? title(tr, index) : tr(title);
        //当没有值时，不显示此行的数据，包含title
        if (dataIndex === 'message_ERC20Trans') {
          // console.log('====ddd',renderValue)
        }
        if (elasticity && !renderValue) {
          return null;
        }

        return isMobile&&item['mobileHide']?<></>:(
          <li
            key={index}
            className={
              classNames(`flex items-center gap-x-2.5 min-h-[32px] relative
            ${ borderTop ? 'pt-5 border-t border_color' : '' }
            ${columns !== 1 ? 'justify-between' : ''}`,styles['item-wrap'])
            }
            style={{...style }}>
            <div className={`w-28 min-w-28 flex-shrink-0 items-center text_des`}>
              {showTitle}:
            </div>
            <MobileView>
              <span className='des '>{renderValue}</span>
            </MobileView>
            <BrowserView>
              <div
                style={{maxWidth:'calc(100% - 120px)'}}
                className={classNames(`flex-grow overflow-auto items-center font-DINPro-Medium `,columns !== 1 ? 'flex justify-end' : '',isMobile ? styles.value : '')}>
                {renderValue}
              </div>
            </BrowserView>
          </li>
        );

        // return isMobile&&item['mobileHide']?<></>:(
        //   <li
        //     key={index}
        //     className={
        //       classNames(`flex items-baseline gap-x-2.5
        //     ${ borderTop ? 'pt-5 border-t border_color' : '' }
        //     ${columns !== 1 ? 'px-5 h-9 ' : ''}`,styles.itemWrap)
        //     }
        //     style={{ width: showWidth, ...style }}>
        //     <span className={`w-28 min-w-28 flex-shrink-0 text_des`}>
        //       {showTitle}:
        //     </span>
        //     <span
        //       className={classNames(`flex-grow overflow-auto font-DINPro-Medium`,columns !== 1 ? 'flex justify-end' : '',isMobile ? styles.value : '')}>
        //       {renderValue}
        //     </span>
        //   </li>
        // );
      })}
    </ul>
  );
};
