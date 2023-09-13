import { DeviceContext } from '@/store/DeviceContext'
import { useContext, useEffect, useState } from 'react'

const useWindow = ()=>{
  const context = useContext(DeviceContext)
  const [isMobile,setIsMobile] = useState<boolean>()
  const onResize = ()=>{
    setIsMobile(window.innerWidth <= 1000)
  }
  useEffect(()=>{
    window.addEventListener('resize',onResize)
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