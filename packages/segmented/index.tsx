/** @format */

import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import { Item } from '@/contents/type';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//分段控制器，添加锚点

export default ({
  data,
  defaultValue,
  ns,
  isHash = true,
  onChange,
}: {
  data: Array<Item>;
  defaultValue: string;
  ns: string;
  isHash: boolean;
  onChange?: (value: string) => void;
}) => {
  const { tr } = Translation({ ns });
  const router = useRouter();
  const [active, setActive] = useState(defaultValue);

  const hash = useHash();
  useEffect(() => {
    setActive(hash || defaultValue);
  }, [hash]);

  const handleClick = (tabId: string) => {
    // 在当前路由上添加锚点 '#section1'
    setActive(tabId);
    if (onChange) onChange(tabId);
    if (isHash) {
      router.replace(`${router.pathname}#${tabId}`, undefined, {
        shallow: true,
        scroll: false,
      });
    }
  };

  return (
    <ul className='list-none w-fit h-fit des_bg_color p-0.5 rounded-[5px] flex '>
      {data.map((item) => {
        return (
          <li
            key={item.dataIndex}
            onClick={() => handleClick(item.dataIndex)}
            className={`px-4 py-[5px] h-7 w-fit cursor-pointer flex items-center justify-center text_des_hover  ${
              active === item.dataIndex
                ? 'tab_shadow highlight  rounded-[5px] card_bg_color'
                : ''
            }`}
            id={item.dataIndex}>
            {tr(item.title)}
          </li>
        );
      })}
    </ul>
  );
};
