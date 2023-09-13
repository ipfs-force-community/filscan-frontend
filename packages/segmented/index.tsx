/** @format */

import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import { Item } from '@/contents/type';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss'
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
  defaultActive,
}: {
  data: Array<Item>;
  defaultValue: string;
  ns: string;
  isHash: boolean;
  defaultActive?: string;
  onChange?: (value: string) => void;
}) => {
  const { tr } = Translation({ ns });
  const router = useRouter();
  const [active, setActive] = useState(defaultValue);

  useEffect(() => {
    setActive(defaultValue);
  }, [defaultValue]);

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
      let newAsPath = paramValue
        ? `${router.pathname.split('[')[0]}${paramValue}#${tabId}`
        : `${router.pathname}#${tabId}`;
      if (tabId === defaultActive) {
        newAsPath = newAsPath.split('#')[0];
      }
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
    <ul className={classNames(styles.segmented,'list-none w-fit h-fit des_bg_color p-0.5 rounded-[5px] flex ml-2.5')}>
      {data.map((item:any) => {
        const {title } = item;
        return (
          <li
            // href={hash ? `${pathValue}#${item.dataIndex}` : ''}
            key={item.dataIndex}
            onClick={(e) => handleClick(e, item.dataIndex)}
            className={`px-4  text-xs font-medium py-[5px] h-7 w-fit cursor-pointer flex items-center justify-center text_des_hover  ${
              active === item.dataIndex
                ? 'tab_shadow highlight  rounded-[5px] main_bg_color'
                : ''
            }`}
            //id={item.dataIndex}
          >
            {typeof title ==='function' ? title():tr(item.title)}
          </li>
        );
      })}
    </ul>
  );
};
