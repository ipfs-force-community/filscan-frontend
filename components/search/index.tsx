/** @format */

import { Input } from 'antd';
import style from './index.module.scss';
import { Translation } from '../hooks/Translation';
import IconB from '@/assets/images/searchIcon_b.svg';
import IconW from '@/assets/images/searchIcon_w.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default ({
  className,
  origin,
  onSearch,
  ns,
  placeholder = '',
  suffix,
  clear,
  disabled = false,
  value,
}: {
  className?: string;
  disabled?: boolean;
  origin?: string;
  ns: string;
  value?: string;
  placeholder?: string;
  suffix?: JSX.Element;
  clear?: boolean;
  onSearch: (value: string) => void;
}) => {
  const { tr } = Translation({ ns });
  const [inputValue, setValue] = useState('');

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

  return (
    <div className={style.box_input}>
      <Input
        className={`${style.search_input} text-color ${className}`}
        placeholder={tr(placeholder)}
        style={{ color: origin === 'banner' ? '#fff' : '' }}
        value={inputValue}
        onChange={(e) => {
          if (!disabled) {
            setValue(e.target.value);
          }
        }}
        onPressEnter={() => {
          if (clear) {
            setValue('');
          }
          onSearch(inputValue);
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
