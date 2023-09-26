/** @format */

import { useRouter } from 'next/router';

const useRemoveQueryParam = () => {
  const router = useRouter();

  const removeQueryParam = (param: string | string[]) => {
    const hash = router.asPath.split('#')[1];
    if (Array.isArray(param)) {
      let restQueryParams = { ...router.query };
      param.forEach((param) => {
        const { [param]: removed, ...rest } = restQueryParams;
        restQueryParams = rest;
      });
      if (hash) {
        router.push({
          pathname: router.pathname,
          query: restQueryParams,
          hash: hash
        }, undefined, {
          scroll: false,
          shallow: false,
        });
      } else {
        router.push({
          pathname: router.pathname,
          query: restQueryParams,
        }, undefined, {
          scroll: false,
          shallow: false,
        });
      }

    } else {
      const { [param]: removed, ...restQueryParams } = router.query;
      if (hash) {
        router.push({
          pathname: router.pathname ,
          query: restQueryParams,
          hash:hash
        } ,undefined, {
          scroll: false,
          shallow: false,
        });
      } else {
        router.push({
          pathname: router.pathname ,
          query: restQueryParams,
        }, undefined, {
          scroll: false,
          shallow: false,
        });
      }

    }

  };

  return removeQueryParam;
};

export default useRemoveQueryParam;
