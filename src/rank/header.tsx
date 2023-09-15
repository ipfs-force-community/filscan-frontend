/** @format */

import { rank_header } from '@/contents/rank';
import Segmented from '@/packages/segmented';
import Select from '@/packages/select';
import Link from 'next/link';
import Image from 'next/image';
import go from '@/assets/images/black_go.svg';
import { Translation } from '@/components/hooks/Translation';

export default ({
  origin,
  active,
  onChange,
}: {
  origin: string;
  active: string;
  onChange: (type: string, value: string) => void;
}) => {
  const { tr } = Translation({ ns: 'home' });

  let SegmentedProps: any = {};
  if (origin === 'home') {
    SegmentedProps.onChange = (value: string) => {
      onChange('active', value);
    };
  }

  return (
    <div className='flex justify-between items-center mx-2.5'>
      <div
        className={`flex items-center w-full gap-x-2.5`}>
        <div className='font-PingFang font-semibold text-lg'>
          {tr('rank_title')}
        </div>
        <div className={ `flex items-center ${origin !== 'home'? 'flex-1 justify-between':'gap-x-4'}`}>
          <Segmented
            data={rank_header.tabList}
            ns='rank'
            defaultValue={active}
            defaultActive='growth'
            isHash={origin !== 'home'}
            {...SegmentedProps}
          />
          {rank_header[active] && (
            <div className='flex gap-x-2.5 items-center'>
              {Object.keys(rank_header[active]).map((item) => {
                return (
                  <Select
                    key={`${active}_${item}`}
                    options={rank_header[active][item]}
                    ns='rank'
                    onChange={(value: string) => {
                      onChange(item, value);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

      </div>
      {origin === 'home' && (
        <Link href={`/rank#${active}`}>
          <Image
            className='cursor-pointer'
            src={go}
            width={18}
            height={18}
            alt='go'
          />
        </Link>
      )}
    </div>
  );
};
