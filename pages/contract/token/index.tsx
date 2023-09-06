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
    return contract_token.columns(tr).filter((v) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          // @ts-ignore
          v.title = (value:string,record:any,index)=>{
            return <div>{`#${index + 1}`}</div>
          }
          v.render = (value:string,record:any,index)=>{
            return (
              <>
                <Link
                  href={`/token/${record.contract_id}`}
                  className='flex items-center gap-x-1'>
                  <Image className={classNames(styles['token-icon'])} src={record?.icon_url} alt='' height={38} width={38} />
                  <span className='margin-6 text_color'>{record.token_name}</span>
                </Link>
              </>
            );
          }
        }
        v.title = typeof v.title === 'string' ? tr(v.title) : v.title
        return v.dataIndex !== 'token_name'
      }
      v.title = typeof v.title === 'string' ? tr(v.title) : v.title
      return true
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tr,isMobile]);

  return (
    <div className='main_contain'>
      <div className='flex flex-col text-xl font-medium gap-y-2.5 mb-4'>
        <span>{tr('token_list')}</span>
      </div>
      <div className={classNames('border  rounded-xl p-5	card_shadow border_color flex items-center',styles.mobile)}>
        <Table
          data={TokenData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
