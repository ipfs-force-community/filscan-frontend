/** @format */

import PickDate from '@/packages/pickDate'
import { getSvgIcon } from '@/svgsIcon'
import { useEffect, useState } from 'react'
import { message } from 'antd'

export default ({
  defaultValue,
  onChange,
  showEnd,
}: {
  showEnd?: boolean
  defaultValue: Array<string>
  onChange: (start: string, end: string) => void
}) => {
  const [startTime, setStartTime] = useState(defaultValue[0])
  const [endTime, setEndTime] = useState(defaultValue[1])

  useEffect(() => {
    setStartTime(defaultValue[0] || '')
    setEndTime(defaultValue[1] || '')
  }, [defaultValue])

  const handleDateChange = (type: string, value: string) => {
    if (type === 'start') {
      setStartTime(value)
    } else if (type === 'end') {
      if (startTime && value > startTime) {
        setEndTime(value)
      } else {
        return message.warning('endTime must be greater than startTime')
      }
    }
    if (showEnd) {
      if (type === 'start') {
        onChange(value, endTime)
      } else if (type === 'end') {
        onChange(startTime, value)
      }
    } else {
      // 只有一个date card
      onChange(type === 'start' ? value : value, type === 'end' ? value : value)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <PickDate
        defaultValue={defaultValue[0]}
        timeType="utc"
        onChange={(value) => handleDateChange('start', value)}
      />
      {showEnd && (
        <>
          <span>{getSvgIcon('dateArrowIcon')}</span>
          <PickDate
            defaultValue={defaultValue[1]}
            timeType="utc"
            onChange={(value) => handleDateChange('end', value)}
          />
        </>
      )}
    </div>
  )
}
