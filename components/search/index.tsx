/** @format */

import { Input } from 'antd';
import style from './index.module.scss';
import { Translation } from '../hooks/Translation';
import IconB from '@/assets/images/searchIcon_b.svg';
import IconW from '@/assets/images/searchIcon_w.svg';
import Image from 'next/image';
import { useState } from 'react';

export default ({
  className,
  origin,
  onSearch,
  ns,
  placeholder = '',
  suffix,
}: {
  className?: string;
  origin?: string;
  ns: string;
  placeholder?: string;
  suffix?: JSX.Element;
  onSearch: (value: string) => void;
}) => {
  const { tr } = Translation({ ns });
  const [value, setValue] = useState('');

  return (
    <div className={style.box_input}>
      <Input
        className={`${style.search_input} text-color ${className}`}
        placeholder={tr(placeholder)}
        style={{ color: origin === 'banner' ? '#fff' : '' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onPressEnter={() => {
          onSearch(value);
        }}
        suffix={
          suffix || (
            <Image
              src={origin === 'banner' ? IconB : IconW}
              width={34}
              height={34}
              alt='search'
            />
          )
        }
      />
    </div>
  );
};
