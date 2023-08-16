/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Option_Item } from '@/contents/type';
import Image from 'next/image';
import down from '@/assets/images/down.svg';
import { useEffect, useState } from 'react';

export default ({
  options,
  ns = 'home',
  onChange,
  header,
  wrapClassName,
  className,
}: {
  ns: string;
  options: Array<Option_Item>;
  onChange: (value: string) => void;
  header?: JSX.Element;
  wrapClassName?: string;
  className?: string;
}) => {
  const { tr } = Translation({ ns });
  const [showLabel, setShowLabel] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options.length > 0) {
      setShowLabel(options[0]?.label);
      setValue(options[0]?.value);
    }
  }, [options]);

  const handleClick = (item: Option_Item) => {
    setShowLabel(item.label);
    setValue(item.value);
    onChange(item.value);
  };

  return (
    <div
      className={`group h-fit flex cursor-pointer items-center relative rounded-[5px] w-fit  ${wrapClassName}`}>
      {header ? (
        header
      ) : (
        <span className='flex justify-between font-PingFang des_bg_color rounded-[5px] p-2 font-medium text-xs gap-x-2 w-full  min-w-[82px] h-[32px]'>
          {tr(showLabel)}
          <Image src={down} width={8} height={4} alt='down' />
        </span>
      )}

      <ul
        className={`invisible group-hover:visible absolute  z-10 inset-y-full max-h-fit w-max list-none p-4  border  rounded-[5px]  select_shadow card_bg_color  border_color ${className}`}>
        {options.map((item) => {
          return (
            <li
              onClick={() => handleClick(item)}
              key={item.value}
              className={`p-2 rounded-[5px] hover:text-primary ${
                item.value === value ? 'bg-bg_hover text-primary' : ''
              }`}>
              {tr(item.label)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
