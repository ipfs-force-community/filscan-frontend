/** @format */

import Copy from '@/components/copy';
import { Translation } from '@/components/hooks/Translation';
import { apiUrl } from '@/contents/apiUrl';
import { address_detail, address_tabs } from '@/contents/detail';
import Content from '@/packages/content';
import Segmented from '@/packages/segmented';
import AccountChange from '@/src/detail/accountChange';
import List from '@/src/detail/list';
import useAxiosData from '@/store/useAxiosData';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import { BrowserView, MobileView } from '@/components/device-detect';
import copySvgMobile from '@/assets/images/icon-copy.svg';
/** @format */
export default () => {
  const router = useRouter();
  const { address } = router.query;
  const { tr } = Translation({ ns: 'detail' });
  const [data, setData] = useState<any>({});
  const [accountType, setAccountType] = useState('');
  const [interval, setInterval] = useState('24h');
  const [methodOptions, setMethodOptions] = useState([]);
  const { axiosData } = useAxiosData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      loadMethod();
      load();
    }
  }, [address]);
  const loadMethod = async () => {
    const result: any = await axiosData(apiUrl.detail_list_method, {
      account_id: address,
    });
    const newMethod: any = [
      {
        title: tr('all_method'),
        dataIndex: 'all',
        value: 'all',
      },
    ];
    Object.keys(result?.method_name_list || {}).forEach((li: string) => {
      newMethod.push({ label: li, dataIndex: li, value: li });
    });
    setMethodOptions(newMethod);
  };

  const load = async () => {
    setLoading(true);
    const result: any = await axiosData(apiUrl.detail_account, {
      account_id: address,
    });
    setLoading(false);
    setData(result?.account_info || {});
    setAccountType(result?.account_type || '');
  };

  const contentList = useMemo(() => {
    return address_detail.content(accountType);
  }, [accountType]);

  const tabsList = useMemo(() => {
    let defaultOpt: any = [];
    address_tabs.forEach((v: any) => {
      if (v?.optionsUrl === 'AllMethodByAccountID') {
        v.headerOptions = methodOptions;
      }
      defaultOpt.push({ ...v });
    });
    // if (erc20) {
    //   defaultOpt = [
    //     ...defaultOpt,
    //     {
    //       label: 'erc20_transfer',
    //       show_active: 'erc20',
    //       value: 'ERC20AddrTransfers',
    //     },
    //   ];
    // }
    // if (verifyData && Object.keys(verifyData).length > 0) {
    //   if (
    //     verifyData.source_file &&
    //     Object.keys(verifyData.source_file).length > 0
    //   ) {
    //     // 已被验证合约
    //     defaultOpt = [
    //       ...defaultOpt,
    //       {
    //         label: () => (
    //           <span className='flex-center'>
    //             <span className='success_color'>
    //               {' '}
    //               {getSvgIcon('successIcon')}{' '}
    //             </span>
    //             {tr('contract_verify')}
    //           </span>
    //         ),
    //         show_active: 'verify',
    //         value: `verify_${data?.account_basic?.account_id}`,
    //       },
    //     ];
    //   } else {
    //     //未验证合约
    //     defaultOpt = [
    //       ...defaultOpt,
    //       {
    //         label: () => (
    //           <span className='flex-center'>
    //             {/* <span className="success_color"> {getSvgIcon('successIcon')} </span> */}
    //             {tr('contract_verify')}
    //           </span>
    //         ),
    //         show_active: 'verify',
    //         value: `verify_${data?.account_basic?.account_id}`,
    //       },
    //     ];
    //   }
    //   defaultOpt = [
    //     ...defaultOpt,
    //     {
    //       label: 'event_log',
    //       value: 'event_log',
    //       show_active: 'event_log',
    //     },
    //   ];
    // }

    return defaultOpt;
  }, [methodOptions]);

  return (
    <div className={classNames(styles.address,'main_contain')}>
      <div className={classNames(styles['address-row'],'my-2.5 DINPro-Medium font-medium text-lg flex items-center')}>
        <span className={styles.label}>{tr('account')}:</span>
        <MobileView>
          <span className='copy-row'>
            <span className='text'>{address}</span>
            { address&& typeof address ==='string' && <Copy text={address} icon={copySvgMobile} className='copy'/>}
          </span>
        </MobileView>
        <BrowserView>
          <span className={classNames(styles.text,'ml-4 flex items-center gap-x-1')}>
            <span>{address || ''}</span>
            { address&& typeof address ==='string' && <Copy text={address} />}
          </span>
        </BrowserView>

      </div>
      <div className='my-4 DINPro-Medium font-medium  text-lg'>
        {tr('general_overview_title')}
      </div>

      <div className='card_shadow border border_color p-7 rounded-xl flex items-center'>
        <Content contents={contentList} ns={'detail'} columns={2} data={data} />
      </div>
      <AccountChange
        header={
          <div
            className='mt-5 mb-2.5 flex justify-between items-center'
            key='detail_account_change'>
            <span className='DINPro-Medium font-medium  text-lg'>
              {tr('account_change')}
            </span>
            <Segmented
              data={address_detail.account_change.tabsList || []}
              ns='detail'
              defaultValue='24h'
              isHash={false}
              onChange={(value: string) => {
                setInterval(value);
              }}
            />
          </div>
        }
        accountId={address}
        interval={interval}
        list={address_detail.account_change.list}
      />
      <List
        tabList={tabsList}
        defaultActive='message_list'
        accountId={address}
      />
    </div>
  );
};
