import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useHashScroll = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url:string) => {
      const hash = url.split('#')[1];
      if (hash) {
        window.requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            //window.scrollTo(0, element.offsetTop);
            //element.scrollIntoView({block:'center'});
            element.classList.add('highlight');
            }
        });
      }
    };

    if (router.asPath !== router.route) {
      handleRouteChange(router.asPath);
    }

    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, []);
};

export default useHashScroll;
