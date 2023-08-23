/** @format */

import { Translation } from '@/components/hooks/Translation';

export default ({ selectedKey }: { selectedKey: string }) => {
  const { tr } = Translation({ ns: 'account' });
  console.log();

  return (
    <>
      <p className='w-full mb-5 text-lg	font-semibold font-PingFang	'>
        {tr(selectedKey)}
      </p>
    </>
  );
};
