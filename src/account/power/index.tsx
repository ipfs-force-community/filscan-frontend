/** @format */

import NoMiner from '../NoMiner';

export default ({ noMiners }: { noMiners: boolean }) => {
  //算力概览

  if (noMiners) {
    return <NoMiner selectedKey={'account_power'} />;
  }
  return <div>rrrr</div>;
};
