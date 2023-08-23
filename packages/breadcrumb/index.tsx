/** @format */

import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';

interface ITEM {
  title: string | JSX.Element;
  path: string;
}

export default ({ items }: { items: Array<ITEM> }) => {
  return (
    <div className='flex gap-x-2 items-center'>
      {items.map((item, index) => {
        const show = index !== items.length - 1;
        return (
          <>
            <Link href={item.path} className='text_des_hover'>
              {item.title}
            </Link>
            {show && (
              <span className='-rotate-90'>{getSvgIcon('downIcon')}</span>
            )}
          </>
        );
      })}
    </div>
  );
};
