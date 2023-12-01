/** @format */

import { Translation } from '@/components/hooks/Translation'
import { Option_Item } from '@/contents/type'
import { useEffect, useState } from 'react'
import { getSvgIcon } from '@/svgsIcon'

export default ({
  options,
  ns = 'home',
  onChange,
  header,
  wrapClassName,
  className,
  value,
  suffix,
  optionsCard,
}: {
  ns: string
  options?: Array<Option_Item>
  optionsCard?: JSX.Element
  onChange: (value: string) => void
  header?: JSX.Element
  wrapClassName?: string
  value?: string | undefined
  className?: string
  suffix?: JSX.Element
}) => {
  const { tr } = Translation({ ns })
  const [showLabel, setShowLabel] = useState('')
  const [active, setActive] = useState(value)

  useEffect(() => {
    if (value && Array.isArray(options)) {
      const file = options.find((v) => v.value === value)
      setActive(value)
      if (file) setShowLabel(file?.label)
    } else if (options && options.length > 0) {
      setShowLabel(options[0]?.label)
      setActive(options[0]?.value)
    }
  }, [options, value])

  const handleClick = (item: Option_Item) => {
    setShowLabel(item.label)
    setActive(item.value)
    onChange(item.value)
  }

  return (
    <div
      className={`group relative flex h-fit w-fit cursor-pointer items-center rounded-[5px]  ${wrapClassName}`}
    >
      {header ? (
        header
      ) : (
        <span className="des_bg_color border_color font-HarmonyOS flex !h-8 w-full min-w-[82px] items-center justify-between gap-x-2 rounded-[5px] border px-2  text-xs font-medium">
          {tr(showLabel)}
          {getSvgIcon('downIcon')}
        </span>
      )}

      <ul
        style={{ padding: '15px' }}
        className={`select_shadow border_color invisible absolute inset-y-full z-10 h-fit w-max list-none rounded-[5px]  border  group-hover:visible ${className}`}
      >
        {Array.isArray(options) &&
          options?.map((item) => {
            return (
              <li
                onClick={() => handleClick(item)}
                key={item.value}
                className={`rounded-[5px] p-2 hover:text-primary ${
                  item.value === active ? 'bg-bg_hover text-primary' : ''
                }`}
              >
                {tr(item.label)}
              </li>
            )
          })}
        {optionsCard && optionsCard}
      </ul>
    </div>
  )
}
