import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface HashParams {
  [key: string]: string | undefined;
}

// 自定义Hook，用于获取hash
export function useHash() {
  const router = useRouter()
  const [hash, setHash] = useState('')
  const [hashParams, setHashParams] = useState<HashParams>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let hashParams = router.asPath?.split('?')[1];
      if (router.pathname.length > 3) {
        if (hashParams?.includes('#')) {
          hashParams = hashParams.split('#')[0]
        }
        const params: Record<string, any> = new URLSearchParams(hashParams);
        const result: HashParams = {};

        for (const [key, value] of params.entries()) {
          result[key] = value;
        }
        setHashParams(result);
        let currentHash = router.asPath?.split('#')[1];
        if (hashParams) {
          currentHash = currentHash?.split('?')[0]
        }
        setHash(currentHash);
      }

    }

  }, [router])

  return { hash, hashParams }
}