import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// 自定义Hook，用于获取hash
export function useHash() {
  const router = useRouter()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const currentHash = router.asPath.split('#')[1]?.split('?' || '')[0]
    // const searchParams = router.asPath.split('?')[1];
    // if (searchParams) {
    //   const query = parseQuery(searchParams)
    //   setSearchParams(query)
    // } else { 
    //   setSearchParams({})
    // }
    setHash(currentHash)
    
  }, [router.asPath])

  return hash
}

