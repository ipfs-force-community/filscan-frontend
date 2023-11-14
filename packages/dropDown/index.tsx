import { useEffect, useMemo, useRef, useState } from 'react'
import { getSvgIcon } from '@/svgsIcon'
import classNames from 'classnames'
import styles from './index.module.scss'
interface Props {
  content: Array<any>
  value?: any
}

export default (props: Props) => {
  const { content, value } = props
  const groupRef = useRef<any>()
  //const [offset, setOffset] = useState<any>({})
  const showValue = useMemo(() => {
    if (value) {
      return value
    }
    return content[0]
  }, [value, content])

  // useEffect(() => {
  //   if (groupRef.current) {
  //     laodOffset()
  //   }
  // }, [groupRef])

  // function getOffset(child: any, ancestor: any) {
  //   let top = 0;
  //   let left = 0;
  //   let node = child;
  //   while (node && node !== ancestor) {
  //     if (node.offsetTop) top += node.offsetTop;
  //     if (node.offsetLeft) left += node.offsetLeft;
  //     node = node.offsetParent;
  //   }
  //   setOffset({top, left})
  // }

  // const laodOffset = () => {
  //   // 使用方法
  //   const child = groupRef.current; // 子元素
  //   const ancestor = document.getElementById('content_id'); // 祖父元素
  //   const offset = ancestor && child &&getOffset(child, ancestor);
  //   console.log(offset); // {top: XX, left: XX}
  // }

  return (
    <div ref={groupRef} className={classNames(`group`, styles.wrap)}>
      <div
        className={classNames(
          'border_color flex h-[32px]  w-fit min-w-[230px] cursor-pointer items-center justify-between rounded-[5px] border px-2.5',
          styles.select,
        )}
      >
        {showValue?.title}
        {getSvgIcon('downIcon')}
      </div>
      {content.length > 0 && (
        <ul
          //style={{top:offset.top+36+'px',left:offset.left+'px'}}
          className={classNames(
            `select_shadow border_color invisible absolute inset-y-full z-10 max-h-fit w-max min-w-[230px] list-none  rounded-[5px] border  p-2.5  group-hover:visible`,
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
