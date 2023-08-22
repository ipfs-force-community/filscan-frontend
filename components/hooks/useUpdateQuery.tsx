/** @format */

import { useRouter } from 'next/router';

type QueryParam = {
  [key: string]: string | number | boolean;
};

const useUpdateQuery = () => {
  const router = useRouter();

  const updateQuery = (newQuery: QueryParam) => {
    const isHash = router.asPath.includes('#');
    if (isHash) {
      const isSearch = router.asPath.includes('?') ? '&' : '?';
      const key = Object.keys(newQuery)[0];
      console.log('-----444', newQuery, router.asPath);
      router.push(
        `${router.asPath}`,
        `${router.asPath}${isSearch}${key}=${newQuery[key]}`,
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
