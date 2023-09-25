/** @format */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fvmUrl } from '@/contents/apiUrl';

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc = fvmUrl + `/images/default.png`, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    const showSrc = src || fallbackSrc;
    setImgSrc(showSrc);
  }, [src]);

  return (
    <Image
      alt=''
      {...rest}
      className='rounded-full	cursor-pointer'
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
