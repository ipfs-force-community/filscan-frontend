/** @format */

import { parseQueryString } from '@/utils'
import { error } from 'console'
import { useRouter } from 'next/router'

type QueryParam = {
  [key: string]: string | number | boolean
}

const useUpdateQuery = () => {
  const router = useRouter()

  const updateQuery = (newQuery: QueryParam) => {
    const isHash = router.asPath.includes('#')
    const hash = router.asPath.split('#')[1]
    if (isHash) {
      const hashParams = router.asPath?.split('?')[1]
      const result = parseQueryString(hashParams)
      const query = {
        ...result,
        ...newQuery,
      }
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...newQuery },
          hash: hash,
        },
        undefined,
        {
          scroll: false,
          shallow: false,
        },
      )
    } else {
      const newParams = { ...router.query, ...newQuery }
      Object.keys(newQuery).forEach((key) => {
        if (newQuery[key] === 'removed') {
          delete newParams[key]
        }
      })
      router
        .push(
          {
            pathname: router.pathname,
            query: { ...newParams },
          },
          undefined,
          { scroll: false },
        )
        .catch((error) => {})
    }
  }

  return updateQuery
}

export default useUpdateQuery
