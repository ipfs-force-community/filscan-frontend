/** @format */

import { parseQueryString } from '@/utils';
import { useRouter } from 'next/router';

type QueryParam = {
  [key: string]: string | number | boolean;
};

const useUpdateQuery = () => {
  const router = useRouter();

  const updateQuery = (newQuery: QueryParam) => {
    const isHash = router.asPath.includes('#');
    const hash = router.asPath.split('#')[1];
    if (isHash) {
      const hashParams = router.asPath?.split('?')[1];
      const result = parseQueryString(hashParams);
      const query = {
        ...result,
        ...newQuery,
      };
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...newQuery },
        },
        `${router.pathname}?${new URLSearchParams(query).toString()}#${hash}`,
        {
          scroll: false,
          shallow: false,
        }
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, ...newQuery },
        },
        undefined,
        { scroll: false }
      );
    }
  };

  return updateQuery;
};

export default useUpdateQuery;
