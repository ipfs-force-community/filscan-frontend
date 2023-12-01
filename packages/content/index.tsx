/** @format */

import { Translation } from '@/components/hooks/Translation'
import { getShowData } from '@/utils'
import { HTMLAttributes, useMemo } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import { BrowserView, MobileView } from '@/components/device-detect'

//ts-ignore
interface ContentProps extends HTMLAttributes<HTMLElement> {
  contents: Array<any>
  ns: string
  columns?: number
  data: Record<string, any>
}

export default (props: ContentProps) => {
  const { isMobile } = useWindow()

  const { contents, data, columns = 1, ns } = props
  const { tr } = Translation({ ns: ns })

  const showWidth = useMemo(() => {
    if (columns === 2) {
      return 'calc(50% - 20px)'
    }
    return '100%'
  }, [columns])

  /*
  ${
        columns !== 1 ? `grid !grid-cols-2 gap-x-12 gap-y-2.5` : 'flex flex-col p-2.5 gap-y-2'
      }
  */
  return (
    <ul
      className={classNames(
        styles['detail-content'],
        `flex max-h-full w-full flex-wrap gap-x-10 gap-y-2 p-2.5`,
        props.className,
      )}
    >
      {contents.map((item, index) => {
        const {
          title,
          dataIndex,
          width,
          style = {},
          borderTop,
          elasticity,
          render,
          isSplit,
        } = item
        const itemData = getShowData(item, data)
        let value = itemData && itemData[dataIndex]
        const renderValue = render ? render(value, data, tr) : value
        const showTitle =
          typeof title === 'function' ? title(tr, index) : tr(title)
        //当没有值时，不显示此行的数据，包含title
        if (elasticity && !renderValue) {
          return null
        }
        let isSplitWidth = width
        if (isSplit && width) {
          if (value.length < isSplit) {
            isSplitWidth = showWidth
          }
        }
        return isMobile && item['mobileHide'] ? (
          <></>
        ) : (
          <li
            key={index}
            className={classNames(
              `flex min-h-[32px] items-baseline gap-2.5
            ${
              borderTop
                ? 'border_color relative min-h-[48px] border-t pt-5'
                : ''
            }
            ${columns !== 1 ? 'justify-between' : ''}`,
              styles['item-wrap'],
            )}
            style={{ ...style, width: isSplitWidth || showWidth }}
          >
            <div
              className={classNames(
                `text_des min-w-[120px] flex-shrink-0 items-baseline self-start`,
                styles.title,
              )}
            >
              {showTitle}:
            </div>
            <MobileView>
              <div className={classNames(styles['message-content-value'])}>
                {renderValue}
              </div>
            </MobileView>
            <BrowserView>
              <div
                style={{ maxWidth: 'calc(100% - 120px)' }}
                className={classNames(
                  `font-HarmonyOS_Medium flex-grow items-baseline overflow-auto `,
                  columns !== 1 ? 'flex justify-end' : '',
                )}
              >
                {renderValue}
              </div>
            </BrowserView>
          </li>
        )
      })}
    </ul>
  )
}
