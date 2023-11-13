/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Option_Item } from '@/contents/type';
import { useEffect, useState } from 'react';
import { getSvgIcon } from '@/svgsIcon';

export default ({
  options,
  ns = 'home',
  onChange,
  header,
  wrapClassName,
  className,
  value,
  suffix,
  optionsCard

}: {
  ns: string;
    options?: Array<Option_Item>;
  optionsCard?:JSX.Element;
  onChange: (value: string) => void;
  header?: JSX.Element;
  wrapClassName?: string;
  value?: string | undefined;
  className?: string;
  suffix?: JSX.Element;
}) => {
  const { tr } = Translation({ ns });
  const [showLabel, setShowLabel] = useState('');
  const [active, setActive] = useState(value);

  useEffect(() => {
    if (value && Array.isArray(options)) {
      const file = options.find((v) => v.value === value);
      setActive(value);
      if (file) setShowLabel(file?.label);
    } else if (options &&options.length > 0) {
      setShowLabel(options[0]?.label);
      setActive(options[0]?.value);
    }
  }, [options, value]);

  const handleClick = (item: Option_Item) => {
    setShowLabel(item.label);
    setActive(item.value);
    onChange(item.value);
  };

  return (
    <div
      className={`group h-fit flex cursor-pointer items-center relative rounded-[5px] w-fit  ${wrapClassName}`}>
      {header ? (
        header
      ) : (
        <span className='flex justify-between items-center font-PingFang des_bg_color rounded-[5px] font-medium text-xs gap-x-2 px-2 w-full border border_color  min-w-[82px] !h-8'>
          {tr(showLabel)}
          {getSvgIcon('downIcon')}
        </span>
      )}

      <ul
        style={{padding:'15px'}}
        className={`invisible group-hover:visible absolute z-10 inset-y-full h-fit w-max list-none border rounded-[5px]  select_shadow  border_color ${className}`}>
        {Array.isArray(options)&& options?.map((item) => {
          return (
            <li
              onClick={() => handleClick(item)}
              key={item.value}
              className={`p-2 rounded-[5px] hover:text-primary ${item.value === active ? 'bg-bg_hover text-primary' : ''
              }`}>
              {tr(item.label)}
            </li>
          );
        })}
        { optionsCard && optionsCard}
      </ul>
    </div>
  );
};
