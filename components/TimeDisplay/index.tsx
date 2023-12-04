import { formatDateTime, formatTime } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Translation } from '../hooks/Translation'

const TimeDisplay = ({ timestamp }: { timestamp: number }) => {
  const [currentTime, setCurrentTime] = useState('')
  const { tr } = Translation({ ns: 'common' })

  useEffect(() => {
    const updateCurrentTime = () => {
      const now: any = new Date().getTime()
      const diff = Math.floor((now - timestamp) / 1000) // 计算时间差，单位为秒
      if (diff < 60) {
        // 如果时间差小于60秒，使用滚动形式展示
        setCurrentTime(`${diff} ${tr('time_display')}`)
      } else {
        // 否则直接展示具体时间，精确到秒
        setCurrentTime(formatDateTime(Number(timestamp / 1000)))
      }
    }

    updateCurrentTime() // 初始化时间显示
    const interval = setInterval(updateCurrentTime, 1000) // 每秒更新一次时间显示

    return () => {
      clearInterval(interval) // 组件卸载时清除定时器
    }
  }, [timestamp])

  return (
    <div>
      <span>{currentTime}</span>
    </div>
  )
}

export default TimeDisplay
