import { DeviceContext } from '@/store/DeviceContext'
import { useContext, useEffect, useState } from 'react'

const useWindow = ()=>{
  const context = useContext(DeviceContext)
  const [isMobile, setIsMobile] = useState<boolean>();
  const calcWidth = () => {
    let windowHeight = document.documentElement.clientHeight;
    let elements:any = document.getElementsByClassName('container_body');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.minHeight = windowHeight + 'px';  // 将高度值转换为字符串，并添加单位
    }
  }

  const onResize = () => {
    calcWidth()
    setIsMobile(window.innerWidth <= 1000)
  }
  useEffect(()=>{
    window.addEventListener('resize', onResize)
    calcWidth()
    setIsMobile(window.innerWidth <= 1000)
    return ()=>{
      window.removeEventListener("resize",onResize)
    }
  },[])
  return {
    isMobile:isMobile ?? context.isMobile,
  }
}
export default useWindow