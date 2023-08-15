/** @format */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fvmUrl } from '@/apiUrl';

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc = fvmUrl + `/images/default.png`, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const showSrc = src || fallbackSrc;
    setImgSrc(showSrc);
  }, [src]);
  if (!src) {
    return null;
  }

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
