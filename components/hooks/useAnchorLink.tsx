/** @format */

import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useAnchorLink = () => {
  const router = useRouter();

  const navigateWithNoScroll = useCallback(
    (url: string) => {
      router.push(url, undefined, { scroll: false });
    },
    [router]
  );

  return navigateWithNoScroll;
};

export default useAnchorLink;
