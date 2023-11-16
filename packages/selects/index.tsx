/** @format */

import { Option_Item } from '@/contents/type'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import type { SelectProps } from 'antd'

interface Props extends SelectProps {
  className?: string
  border?: boolean
  popupClassName?: string
  options?: Array<Option_Item>
  onChange?: (value: string, item?: any) => void
}

export default (props: Props) => {
  const {
    className = '',
    popupClassName = '',
    options,
    onChange,
    value,
    border,
    placeholder,
    disabled,
    style,
  } = props
  const [new_options, setOptions] = useState<Array<Option_Item>>([])

  useEffect(() => {
    setOptions(options || [])
  }, [options])

  const handleChange = (value: string, item?: any) => {
    if (onChange) onChange(value, item)
  }

  return (
    <Select
      showSearch
      placeholder={placeholder || 'Select a person'}
      optionFilterProp="children"
      value={value}
      disabled={disabled}
      style={style}
      className={`custom_select ${className}`}
      popupClassName={'custom_select_wrapper'}
      filterOption={(input, option: any) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[...new_options]}
      onChange={handleChange}
    ></Select>
  )
}
