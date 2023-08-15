/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Option_Item } from '@/contents/type';
import Image from 'next/image';
import down from '@/assets/images/down.svg';
import { useState } from 'react';

export default ({
  options,
  ns = 'home',
}: {
  ns: string;
  options: Array<Option_Item>;
}) => {
  const { tr } = Translation({ ns });
  const [showLabel, setShowLabel] = useState(options[0].label);
  const [value, setValue] = useState(options[0].value);

  const handleClick = (item: Option_Item) => {
    setShowLabel(item.label);
    setValue(item.value);
  };

  return (
    <div className='group h-fit flex cursor-pointer bg-bgDesColor items-center relative rounded-[5px] w-fit'>
      <span className='flex justify-between font-PingFang p-2 font-medium text-xs gap-x-2 w-full  min-w-[82px] h-[32px]'>
        {tr(showLabel)}
        <Image src={down} width={8} height={4} alt='down' />
      </span>
      <ul
        className={
          'invisible group-hover:visible absolute z-10 inset-y-full max-h-fit w-max list-none p-4  border border-border rounded-[5px] bg-bgColor select_shadow '
        }>
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
