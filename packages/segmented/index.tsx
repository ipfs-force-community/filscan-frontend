/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Item } from '@/contents/type';
import { useRouter } from 'next/router';
import { useState } from 'react';

//分段控制器，添加锚点

export default ({
  data,
  value,
  ns,
}: {
  data: Array<Item>;
  value: string;
  ns: string;
}) => {
  const { tr } = Translation({ ns });
  const router = useRouter();
  const [active, setActive] = useState(value);

  const handleClick = (tabId: string) => {
    // 在当前路由上添加锚点 '#section1'

    setActive(tabId);
    router.push(`${router.pathname}#${tabId}`, undefined, { shallow: true });
  };

  return (
    <ul className='list-none w-fit h-fit bg-bgDesColor p-0.5 rounded-[5px] flex '>
      {data.map((item) => {
        return (
          <li
            key={item.dataIndex}
            onClick={() => handleClick(item.dataIndex)}
            className={`w-20 h-7 cursor-pointer flex items-center justify-center text-font_des hover:text-font ${
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
