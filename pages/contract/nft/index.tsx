/** @format */

import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { contract_nfts, contract_token } from '@/contents/contract';
import Table from '@/packages/Table';
import useAxiosData from '@/store/useAxiosData';
import { pageLimit } from '@/utils';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import styles from './index.module.scss'
import useWindow from '@/components/hooks/useWindown';
import Link from 'next/link';
import Image from 'next/image';
import _ from 'lodash'
export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const [current, setCurrent] = useState(1);
  const payload = useMemo(() => {
    return {
      index: current - 1,
      limit: pageLimit,
    };
  }, [current]);

  const {isMobile} = useWindow()

  const { data: NftsData, loading } = useAxiosData(
    apiUrl.contract_nfts,
    payload
  );

  const columns = useMemo(() => {
    const columns = _.cloneDeep(contract_nfts.columns)
    return columns.filter((v: any) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          // @ts-ignore
          v.title = (value:string,record:any,index)=>{
            return <div>{`#${index + 1}`}</div>
          }
          v.render = (value:string,record:any)=>{
            return (
              <>
                <Link
                  href={`/token/${record.contract_id}`}
                  className='flex items-center gap-x-1'>
                  <Image className={classNames(styles['token-icon'])} src={record?.icon} alt='' height={38} width={38} />
                  <span className='margin-6 text_color'>{record.collection}</span>
                </Link>
              </>
            );
          }
        }
        v.title = typeof v.title === 'string' ? tr(v.title) : v.title
        return v.dataIndex !== 'collection'
      }
      return {
        ...v,
        title: typeof v.title === 'string' ? tr(v.title) : v.title(),
      };
    });
  }, [tr,isMobile]);

  return (
    <div className='main_contain '>
      <div className={classNames('flex flex-col text-xl font-medium gap-y-2.5 mb-4 mx-2.5',styles.title)}>
        <span>{tr('nfts_list')}</span>
      </div>
      <div className={classNames('border  rounded-xl p-5 card_shadow border_color flex items-center',styles.table)}>
        <Table
          data={NftsData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
