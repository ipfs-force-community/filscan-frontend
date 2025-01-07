/** @format */

import { Translation } from '@/components/hooks/Translation'
import { Option_Item } from '@/contents/type'
import { getSvgIcon } from '@/svgsIcon'
import { Input } from 'antd'
import { useState } from 'react'

interface Item {
  label: string
  value: string | number
  [key: string]: any
}

export default ({
  ns,
  options,
  suffix,
  onChange,
  isShow,
  className,
}: {
  ns: string
  options: Array<Item>
  suffix?: JSX.Element
  isShow?: boolean
  className?: string
  onChange: (value: string | number) => void
}) => {
  const { tr } = Translation({ ns })

  const [inputValue, setInputValue] = useState<Item>()
  const [showGroup, setShowGroup] = useState<boolean>(false)

  const handleInput = (e: any) => {
    if (isShow) {
      setInputValue({ label: '', value: '' })
    }
  }
  return (
    <div className="group relative mt-5">
      <Input
        className={`custom_input mt-4 h-12 w-full focus:outline-none ${className}`}
        placeholder={tr('miner_select_group_placeholder')}
        value={inputValue?.label}
        onChange={(e) => handleInput(e)}
        onFocus={() => {
          setShowGroup(true)
        }}
        suffix={<span className="text-xl">{getSvgIcon('downIcon')}</span>}
        // onChange={(e) => handleSearch(e.target.value)}
      />
      {isShow ? (
        <ul
          className={`card_shadow mt-1 p-4  ${
            showGroup ? 'block' : 'hidden'
          } z-10 w-full`}
        >
          {options?.map((item) => {
            return (
              <li
                onClick={() => {
                  setShowGroup(false)
                  setInputValue({
                    label: item.label,
                    value: item.value,
                  })
                  onChange(item.value)
                }}
                key={item.value}
                className="cursor-pointer rounded-[5px] px-5 py-4 hover:bg-bg_hover hover:text-primary"
              >
                {item.label}
              </li>
            )
          })}
          {suffix && suffix}
        </ul>
      ) : (
        <ul
          className={`card_shadow mt-1 p-4  ${
            showGroup ? 'block' : 'hidden'
          } absolute z-10 w-full`}
        >
          {options.map((item) => {
            return (
              <li
                onClick={() => {
                  setShowGroup(false)
                  setInputValue({
                    label: item.label,
                    value: item.value,
                  })
                  onChange(item.value)
                }}
                key={item.value}
                className="cursor-pointer rounded-[5px] px-5 py-4 hover:bg-bg_hover hover:text-primary"
              >
                {item.label}
              </li>
            )
          })}
          {suffix && suffix}
        </ul>
      )}
    </div>
  )
}
