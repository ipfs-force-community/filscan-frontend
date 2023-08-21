/** @format */

import { Translation } from '@/components/hooks/Translation';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';
import NoMiner from './NoMiner';

export default ({
  selectedKey,
  noMiners,
}: {
  selectedKey: string;
  noMiners: boolean;
}) => {
  const { tr } = Translation({ ns: 'account' });
  console.log();

  if (noMiners) {
    return <NoMiner selectedKey={selectedKey} />;
  }

  return (
    <>
      <p className='w-full mb-5 text-lg	font-semibold font-PingFang	'>
        {tr(selectedKey)}
      </p>
    </>
  );
};
