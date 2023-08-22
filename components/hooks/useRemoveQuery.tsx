/** @format */

import { useRouter } from 'next/router';

const useRemoveQueryParam = () => {
  const router = useRouter();

  const removeQueryParam = (param: string | string[]) => {
    if (Array.isArray(param)) {
      let restQueryParams = { ...router.query };
      param.forEach((param) => {
        const { [param]: removed, ...rest } = restQueryParams;
        restQueryParams = rest;
      });
      router.push({
        pathname: router.pathname,
        query: restQueryParams,
      });
    } else {
      const { [param]: removed, ...restQueryParams } = router.query;
      router.push({
        pathname: router.pathname,
        query: restQueryParams,
      });
    }
  };

  return removeQueryParam;
};

export default useRemoveQueryParam;
