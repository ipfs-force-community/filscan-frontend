/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { contract_token } from '@/contents/contract';
import Table from '@/packages/Table';
import useAxiosData from '@/store/useAxiosData';
import { useEffect, useMemo } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import useWindow from '@/components/hooks/useWindown';
import Link from 'next/link';
import Image from 'next/image'
export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const {isMobile} = useWindow()
  const { data: TokenData, loading } = useAxiosData(apiUrl.contract_ERC20List);

  const columns = useMemo(() => {
    return contract_token.columns(tr).map((v) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          v.render = (value:string,record:any,index)=>{
            return (
              <>
                {`No.${index + 1}`}
              </>
            );
          }
        }
      }
      v.title = typeof v.title === 'string' ? tr(v.title) : v.title
      return v
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tr,isMobile]);

  return (
    <div className='main_contain'>
      <div className={classNames('flex flex-col text-xl font-medium gap-y-2.5 mb-4 mx-2.5',styles.title)}>
        <span>{tr('token_list')}</span>
      </div>
      <div className={classNames('border  rounded-xl p-5	card_shadow border_color flex items-center',styles.table)}>
        <Table
          limit={1000}
          data={TokenData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
