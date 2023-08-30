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
  onClick,
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
  onClick?: (value: string) => void;
  onSearch: (value: string) => void;
}) => {
  const { tr } = Translation({ ns });
  const [inputValue, setValue] = useState('');

  useEffect(() => {
    if (value ) {
      setValue(value.trim());
    }
  }, [value]);

  return (
    <>
      <Input
        className={`${
          style.search_input
        } text-color custom_input  ${className} ${
          origin === 'banner'
            ? `custom_input_banner ${style.banner_search}`
            : ''
        }`}
        placeholder={tr(placeholder)}
        value={inputValue}
        onChange={(e) => {
          if (!disabled) {
            setValue(e.target.value.trim());
          }
        }}
        onPressEnter={() => {
          if (clear) {
            setValue('');
          }
          if (inputValue.length > 0) {
            onSearch(inputValue);
          }

        }}
        suffix={
          (
            <span
              onClick={() => {
                if (onClick && inputValue?.length > 0) {
                  onSearch(inputValue);
                }
              }}>
              {suffix}
            </span>
          ) || (
            <Image
              src={origin === 'banner' ? IconB : IconW}
              width={34}
              height={34}
              alt='search'
            />
          )
        }
      />
    </>
  );
};
