/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';

export default ({ selectedKey }: { selectedKey: string }) => {
  const { tr } = Translation({ ns: 'account' });
  console.log();

  return (
    <>
      <p className='w-full mb-5 font-semibold font-PingFang	'>
        {tr(selectedKey)}
      </p>
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
    </>
  );
};
