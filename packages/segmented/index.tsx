/** @format */

import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import { Item } from '@/contents/type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

function extractPathParam(route: string) {
  const match = route.match(/\[([^\]]+)\]/);
  return match ? match[1] : null;
}

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

  const { hash } = useHash();
  useEffect(() => {
    setActive(hash || defaultValue);
  }, [hash]);

  const handleClick = (event: any, tabId: string) => {
    // 在当前路由上添加锚点 '#section1'
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    event.preventDefault();
    setActive(tabId);
    if (onChange) onChange(tabId);
    if (isHash) {
      // 获取动态路由参数的名称
      const paramName: string | null = extractPathParam(router.pathname);
      // 获取动态路由参数的值
      const paramValue = paramName ? router.query[paramName] : null;

      const newQuery = paramName ? { [paramName]: paramValue } : {};
      const newAsPath = paramValue
        ? `${router.pathname.split('[')[0]}${paramValue}#${tabId}`
        : `${router.pathname}#${tabId}`;
      router.push(
        {
          pathname: `${router.pathname}`,
          query: { ...newQuery },
        },
        newAsPath,
        {
          shallow: false,
          scroll: false,
        }
      );
    }
    // 恢复滚动条位置
    window.scrollTo(0, scrollPosition);
  };

  return (
    <ul className='list-none w-fit h-fit des_bg_color p-0.5 rounded-[5px] flex '>
      {data.map((item) => {
        return (
          <li
            // href={hash ? `${pathValue}#${item.dataIndex}` : ''}
            key={item.dataIndex}
            onClick={(e) => handleClick(e, item.dataIndex)}
            className={`px-4 py-[5px] h-7 w-fit cursor-pointer flex items-center justify-center text_des_hover  ${
              active === item.dataIndex
                ? 'tab_shadow highlight  rounded-[5px] card_bg_color'
                : ''
            }`}
            //id={item.dataIndex}
          >
            {tr(item.title)}
          </li>
        );
      })}
    </ul>
  );
};
