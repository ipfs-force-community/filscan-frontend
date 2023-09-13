import { formatTime } from '@/utils'
import { useEffect, useState } from "react"
import { Translation } from '../hooks/Translation';

export default (props:any)=> {
  const { text ,ns} = props;
  const { tr } = Translation({ ns });

  const [show,setShow]= useState('')
  const showTime = (number: number) => {
    let showText =''
    const { days, hours, minutes,seconds } = formatTime(Number(number * 1000),)
    if (days !== 0) {
      showText = `${days}${tr('day')} ${hours}${tr('hours')} ${minutes}${tr('minutes')} `
    } else if (hours !== 0) {
      showText = `${hours}${tr('hours')} ${minutes}${tr('minutes')} `
    } else if (minutes !== 0) {
      showText = `${minutes}${tr('minutes')} ${seconds}${tr('seconds')} `
    } else {
      showText= `${seconds}${tr('seconds')} `
    }
    setShow(showText)
  }
  useEffect(() => {
    if (text) {
      showTime(text)
    }

    const interval = setInterval(() => {
      showTime(text)
    }, 1000);

    return () => {
      clearInterval(interval)
    }

  },[text])
  return <span>{show}</span>

}