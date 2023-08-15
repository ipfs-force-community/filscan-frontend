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
}: {
  data: Array<Item>;
  defaultValue: string;
  ns: string;
  isHash: boolean;
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
    if (isHash) {
      router.replace(`${router.pathname}#${tabId}`, undefined, {
        shallow: true,
        scroll: false,
      });
    }
  };

  return (
    <ul className='list-none w-fit h-fit bg-bgDesColor p-0.5 rounded-[5px] flex '>
      {data.map((item) => {
        return (
          <li
            key={item.dataIndex}
            onClick={() => handleClick(item.dataIndex)}
            className={`px-4 py-[5px] h-7 w-fit cursor-pointer flex items-center justify-center text-font_des hover:text-font ${
              active === item.dataIndex
                ? 'tab_shadow highlight !bg-bgColor rounded-[5px] '
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