/** @format */
import Search from '@/components/search';
import { search } from '@/contents/common';
import searchIcon from '@/assets/images/searchIcon_w.svg';
import Image from 'next/image';

export default ({
  origin,
  className = '',
}: {
  origin?: string;
  className?: string;
}) => {
  return (
    <Search
      className={className}
      ns='common'
      placeholder={search.holder}
      onSearch={(value: string) => {}}
      origin={origin}
      suffix={
        <Image
          src={searchIcon}
          width={origin === 'banner' ? 40 : 21}
          height={origin === 'banner' ? 40 : 21}
          alt=''
        />
      }
    />
  );
};
