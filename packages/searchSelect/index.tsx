/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Option_Item } from '@/contents/type';
import { Input } from 'antd';
import { useState } from 'react';

interface Item {
  label: string;
  value: string | number;
  [key: string]: any;
}

export default ({
  ns,
  options,
  suffix,
  onChange,
  isShow,
  className,
}: {
  ns: string;
  options: Array<Item>;
  suffix?: JSX.Element;
  isShow?: boolean;
  className?: string;
  onChange: (value: string | number) => void;
}) => {
  const { tr } = Translation({ ns });

  const [inputValue, setInputValue] = useState<Item>();
  const [showGroup, setShowGroup] = useState<boolean>(false);

  const handleInput = (e: any) => {
    if (isShow) {
      setInputValue({ label: '', value: '' });
    }
  };
  return (
    <div className='mt-5 group relative'>
      <Input
        className={`w-full mt-4 h-12 custom_input focus:outline-none ${className}`}
        placeholder={tr('miner_select_group_placeholder')}
        value={inputValue?.label}
        onChange={(e) => handleInput(e)}
        onFocus={() => {
          setShowGroup(true);
        }}
        // onChange={(e) => handleSearch(e.target.value)}
      />
      {isShow ? (
        <ul
          className={`mt-1 card_shadow p-4  ${
            showGroup ? 'block' : 'hidden'
          } w-full z-10`}>
          {options.map((item) => {
            return (
              <li
                onClick={() => {
                  setShowGroup(false);
                  setInputValue({
                    label: item.label,
                    value: item.value,
                  });
                  onChange(item.value);
                }}
                key={item.value}
                className='py-4 px-5 hover:text-primary hover:bg-bg_hover rounded-[5px] cursor-pointer'>
                {item.label}
              </li>
            );
          })}
          {suffix && suffix}
        </ul>
      ) : (
        <ul
          className={`mt-1 card_shadow p-4  ${
            showGroup ? 'block' : 'hidden'
          } absolute w-full z-10`}>
          {options.map((item) => {
            return (
              <li
                onClick={() => {
                  setShowGroup(false);
                  setInputValue({
                    label: item.label,
                    value: item.value,
                  });
                  onChange(item.value);
                }}
                key={item.value}
                className='py-4 px-5 hover:text-primary hover:bg-bg_hover rounded-[5px] cursor-pointer'>
                {item.label}
              </li>
            );
          })}
          {suffix && suffix}
        </ul>
      )}
    </div>
  );
};
