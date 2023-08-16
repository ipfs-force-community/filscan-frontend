/** @format */

import { useRouter } from 'next/router';

type QueryParam = {
  [key: string]: string | number | boolean;
};

const useUpdateQuery = () => {
  const router = useRouter();

  const updateQuery = (newQuery: QueryParam) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...newQuery },
      },
      undefined,
      { scroll: false }
    );
  };

  return updateQuery;
};

export default useUpdateQuery;
