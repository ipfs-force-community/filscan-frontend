/** @format */

import { rank_header } from '@/contents/rank';
import Segmented from '@/packages/segmented';
import Select from '@/packages/select';

export default () => {
  return (
    <div className='flex gap-x-2.5'>
      <Segmented data={rank_header.tabList} ns='rank' value='provider' />
      <Select options={rank_header.sectorOptions} ns='rank' />
      <Select options={rank_header.timeList} ns='rank' />
    </div>
  );
};
