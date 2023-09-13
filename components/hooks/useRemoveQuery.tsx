/** @format */

import { useRouter } from 'next/router';

const useRemoveQueryParam = () => {
  const router = useRouter();

  const removeQueryParam = (param: string | string[]) => {
    const isHash = router.asPath.includes('#');
    const hash = router.asPath.split('#')[1];

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
      if (hash) {
        const filteredQueryParams = Object.fromEntries(
          Object.entries(restQueryParams).filter(([key, value]) => typeof value === 'string')
        );
        // router.push({
        //   pathname: router.pathname,
        //   query: restQueryParams,
        // }, `${router.pathname}?${new URLSearchParams(filteredQueryParams).toString()}${hash}`, { shallow: true });
      } else {
        router.push({
          pathname: router.pathname ,
          query: restQueryParams,
        });
      }

    }

  };

  return removeQueryParam;
};

export default useRemoveQueryParam;
