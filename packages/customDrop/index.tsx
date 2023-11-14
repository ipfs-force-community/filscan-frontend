import { Dropdown } from 'antd'
import { getSvgIcon } from '@/svgsIcon'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useMemo } from 'react'
interface Props {
  content: Array<any>
  value?: any
}
export default (props: Props) => {
  const { content, value } = props
  const showValue = useMemo(() => {
    if (value) {
      return value
    }
    return content[0]
  }, [value, content])

  const renderChildren = () => {
    return (
      <div className="max-h-[300px] overflow-auto">
        {content.length > 0 && (
          <ul
            className={classNames(
              `select_shadow border_color inset-y-full max-h-fit w-max min-w-[230px]  list-none rounded-[5px]  border  p-2.5`,
              styles['drop-menu'],
            )}
          >
            {content.map((v: any, index) => {
              return (
                <li key={index} className="flex min-h-[36px] items-center ">
                  {v?.title}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
  return (
    <Dropdown
      className={styles.wrap}
      dropdownRender={renderChildren}
      trigger={['hover']}
    >
      <div
        className={classNames(
          'border_color flex h-[32px]  w-fit min-w-[230px] cursor-pointer items-center justify-between rounded-[5px] border px-2.5',
          styles.select,
        )}
      >
        {showValue?.title}
        {getSvgIcon('downIcon')}
      </div>
    </Dropdown>
  )
}
