/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';

export default () => {
  const { tr } = Translation({ ns: 'account' });

  return (
    <div
      className='flex-1 w-full flex flex-col gap-y-5
      items-center justify-center'>
      <span>{getSvgIcon('no_nodes')}</span>
      <span className='flex gap-x-2'>
        {tr('no_node_data')}
        <Link rel='' href={`/account#miners?type=miner_add`}>
          {tr('miners_add')}
        </Link>
      </span>
    </div>
  );
};
