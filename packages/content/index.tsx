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

  const showWidth = useMemo(() => {
    if (columns === 2) {
      return 'calc(50% - 20px)'
    }
    return '100%'
  },[columns])

  /*
  ${
        columns !== 1 ? `grid !grid-cols-2 gap-x-12 gap-y-2.5` : 'flex flex-col p-2.5 gap-y-2'
      }
  */
  return (
    <ul
      className={classNames(styles['detail-content'],`w-full max-h-full flex flex-wrap p-2.5 gap-y-2 gap-x-10`,props.className)}>
      {contents.map((item, index) => {
        const {
          title,
          dataIndex,
          width,
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
              classNames(`flex items-baseline gap-2.5 min-h-[32px]
            ${ borderTop ? 'pt-5 border-t border_color relative' : '' }
            ${columns !== 1 ? 'justify-between' : ''}`,styles['item-wrap'])
            }
            style={{...style,width:width||showWidth }}>
            <div className={`min-w-[120px] flex-shrink-0 items-baseline text_des self-start`}>
              {showTitle}:
            </div>
            <MobileView>
              <div
                className={classNames(styles['message-content-value'])}>
                {renderValue}
              </div>
            </MobileView>
            <BrowserView>
              <div
                style={{maxWidth:'calc(100% - 120px)'}}
                className={classNames(`flex-grow overflow-auto items-baseline font-DINPro-Medium `,columns !== 1 ? 'flex justify-end' : '')}>
                {renderValue}
              </div>
            </BrowserView>
          </li>
        );
      })}
    </ul>
  );
};
