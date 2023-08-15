import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// 自定义Hook，用于获取hash
export function useHash() {
  const router = useRouter()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const currentHash = router.asPath.split('#')[1]
    setHash(currentHash)
  }, [router.asPath])

  return hash
}

