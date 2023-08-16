/** @format */

import { useRouter } from 'next/router';

const useRemoveQueryParam = () => {
  const router = useRouter();

  const removeQueryParam = (param: string) => {
    const { [param]: removed, ...restQueryParams } = router.query;

    router.push({
      pathname: router.pathname,
      query: restQueryParams,
    });
  };

  return removeQueryParam;
};

export default useRemoveQueryParam;
