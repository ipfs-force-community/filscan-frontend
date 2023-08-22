/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getShowData } from '@/utils';

export default ({
  content,
  data,
  ns,
}: {
  content: Array<any>;
  ns: string;
  data: Record<string, any>;
}) => {
  const { tr } = Translation({ ns: 'detail' });

  return (
    <ul className='flex flex-col gap-y-4'>
      {content.map((item, index) => {
        const {
          title,
          dataIndex,
          style = {},
          borderTop,
          elasticity,
          render,
        } = item;
        const itemData = getShowData(item, data);
        const value = itemData[dataIndex];
        const renderValue = render ? render(value, data, tr) : value;
        const showTitle =
          typeof title === 'string' ? tr(title) : title(tr, index);
        //当没有值时，不显示此行的数据，包含title
        if (elasticity && !renderValue) {
          return null;
        }
        return (
          <li
            className={`flex items-baseline gap-x-2.5 ${
              borderTop ? 'pt-5 border-t border_color' : ''
            }`}
            style={{ ...style }}>
            <span className='w-28 min-w-28 flex-shrink-0 text_des'>
              {showTitle}:
            </span>
            <span className='flex-grow overflow-auto'>{renderValue}</span>
          </li>
        );
      })}
    </ul>
  );
};
