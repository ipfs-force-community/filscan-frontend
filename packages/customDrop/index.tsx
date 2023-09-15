import { Dropdown } from "antd"
import { getSvgIcon } from '@/svgsIcon';
import classNames from 'classnames';
import styles from './index.module.scss'
import { useMemo } from "react";
interface Props {
    content: Array<any>,
    value?:any
}
export default (props: Props) => {
  const { content, value } = props;
  const showValue = useMemo(() => {
    if (value) {
      return value
    }
    return content[0]
  }, [value, content])

  const renderChildren = () => {
    return <div className="max-h-[300px] overflow-auto">
      {content.length > 0 && <ul
        className={classNames(`min-w-[230px] w-max inset-y-full max-h-fit list-none p-2.5  border rounded-[5px]  select_shadow  border_color`, styles['drop-menu'])}>
        {content.map((v:any,index) => {
          return <li key={index} className='flex items-center min-h-[36px] '>
            {v?.title}
          </li>
        })}
      </ul>}
    </div>
  }
  return <Dropdown dropdownRender={renderChildren} trigger={ ['hover']}>
    <div className={classNames('flex items-center justify-between  min-w-[230px] w-fit h-[32px] px-2.5 rounded-[5px] cursor-pointer border border_color',styles.select)}>
      {showValue?.title}
      {getSvgIcon('downIcon')}
    </div>
  </Dropdown>
}