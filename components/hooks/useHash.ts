import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface HashParams {
  [key: string]: string | undefined;
}

// 自定义Hook，用于获取hash
export function useHash() {
  const router = useRouter()
  const [hash, setHash] = useState('')
  const [lastHashParams, setLastHashParams] = useState<HashParams>({});

  function checkUrl(url: string) {
    /*
    匹配/xxx#hash
    /xxx/?name=xxx#xxx
    /xxx#xxx?xxx=xxx

    */
    const regex = /\/[^\/#?]*?(#[^#\/?]*|\?name=[^#]*#[^#\/]*|#[^#\/?]*\?[^#]*=[^#\/]*)$/;
    return regex.test(url);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let hashParams = router.asPath?.split('?')[1];
      if (router.pathname.length > 3 && checkUrl(router.asPath) || hashParams) {
        if (hashParams?.includes('#')) {
          hashParams = hashParams.split('#')[0]
        }
        const params: Record<string, any> = new URLSearchParams(hashParams);
        const result: HashParams = {};

        for (const [key, value] of params.entries()) {
          result[key] = value;
        }
        let currentHash = router.asPath?.split('#')[1];
        if (hashParams) {
          currentHash = currentHash?.split('?')[0]
        }
        setHash(currentHash);
        setLastHashParams(result);
      } else {
        if (hash) {
          setHash('');
        }
        if (lastHashParams) {
          setLastHashParams({})
        }
      }

    }

  }, [router])

  return { hash, hashParams:lastHashParams }
}