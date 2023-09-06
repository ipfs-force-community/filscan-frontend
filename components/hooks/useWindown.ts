import { useEffect, useState } from 'react'

const useWindow = ()=>{
  const [isMobile,setIsMobile] = useState(false)
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
    isMobile,
  }
}
export default useWindow