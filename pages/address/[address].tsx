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
import { useHash } from '@/components/hooks/useHash';
import { formatNumber, get$Number } from '@/utils';
import Image from '@/packages/image'
import Link from 'next/link';
/** @format */
export default () => {
  const router = useRouter();
  const { address } = router.query;
  const { tr } = Translation({ ns: 'detail' });
  const { axiosData } = useAxiosData();
  const [data, setData] = useState<any>({});
  const [tokenList, setTokenList] = useState<Array<any>>([]);
  const [verifyData, setVerifyData] = useState<any>({})
  const [accountType, setAccountType] = useState('');
  const [interval, setInterval] = useState('24h');
  const [methodOptions, setMethodOptions] = useState([]);
  const [actorId,setActorId] = useState('')
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState<any>({})

  useEffect(() => {
    setActorId('');
    setMethodOptions([]);
    setInterval('24h');
    setAccountType('')
    if (address) {
      loadMethod();
      load();
      loadFnsDomain()
    }
  }, [address]);

  const loadMethod = async () => {
    const result: any = await axiosData(apiUrl.detail_list_method, {
      account_id: address,
    },{isCancel:false});
    const newMethod: any = [
      {
        label:'all',
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
    }, {isCancel:false});
    setLoading(false);
    let baseResult: any = {};
    const mainType = result?.account_type || '';
    if (result?.account_info[`account_${mainType}`]) {
      baseResult= result?.account_info[`account_${mainType}`]
    } else {
      baseResult= result?.account_info
    }
    setData(baseResult);
    setAccountType(result?.account_type || '');
    if (result?.account_info?.account_basic?.account_id) {
      setActorId(result.account_info.account_basic.account_id)
    }
    if (baseResult?.account_basic?.account_id ) {
      // 已被验证合约
      loadVerify(baseResult?.account_basic?.account_id)

    }
    if (typeof address === 'string') {
      // 增加代币列表
      let showErc20 =''
      if (address.startsWith('0x')) {
        showErc20 = address
      } else if (baseResult?.account_basic?.eth_address?.startsWith('0x')) {
        showErc20 = baseResult?.account_basic?.eth_address
      } else {
        showErc20 = baseResult?.account_basic?.account_id
      }
      loadERC20TokenList(showErc20);
    }
  };

  //合约
  const loadVerify = async(id: string) => {
    const result= await axiosData(apiUrl.contract_verify_des, {
      input_address:id
    })
    setVerifyData({ ...result});

  }

  const loadERC20TokenList = async (id:string) => {
    const tokenList = await axiosData(apiUrl.contract_ERC20TokenList, { address: id });
    const items: any = [];
    if (tokenList && Object.keys(tokenList).length > 0 && tokenList?.items?.length >0) {
      const objTotal:any = {
        title: `$${formatNumber(tokenList?.total_value,4)} (${tokenList?.total} Tokens)`,
        value: `$${tokenList?.total_value} (${tokenList?.total})`
      }
      tokenList?.items?.forEach((t: any) => {
        if (t.amount) {
          const obj = {
            ...t,
            key:t.contract_id,
            value:t.contract_id,
            title: <div className='flex justify-between gap-x-2 mt-2.5 w-full cursor-pointer'>
              <div className='flex items-center gap-x-2'>
                <Image src={t.icon_url} alt='' width={36} height={36} />
                <span className='flex items-start flex-col'>
                  <span>{t.token_name}</span>
                  <span> {formatNumber(t.amount, 4)} </span>
                </span>
              </div>
              <span>{get$Number(t.value,4)}</span>

            </div>
          }
          items.push(obj)
        }
      })
      setTokenList([objTotal,...items])
    }

  }

  const loadFnsDomain = async () => {
    const result = await axiosData(`${apiUrl.contract_fnsUrl}`, { addresses: [address] })
    setDomain(result)
  }

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
    let evmList :Array<any>= [];
    if (verifyData && verifyData.source_file) {
      evmList = [{
        title: 'contract_verify',
        dataIndex: 'contract_verify',
      },
      {
        title: 'event_log',
        dataIndex: 'event_log',
      },]
    }

    return [...defaultOpt, ...evmList];
  }, [methodOptions,verifyData]);
  return (
    <div className={classNames(styles.address,'main_contain')}>
      <div className={classNames(styles['address-row'],'mb-2.5 ml-2.5 DINPro-Medium font-medium text-lg flex items-center')}>
        <span className={styles.label}>{tr('account_title')}:</span>

        <MobileView>
          <span className='copy-row'>
            <span className='normal-text'>{address}</span>
            { address&& typeof address ==='string' && <Copy text={address} icon={copySvgMobile} className='copy'/>}
          </span>
        </MobileView>

        <BrowserView>
          <span className={classNames(styles.text,'ml-4 flex items-center gap-x-1')}>
            <span>{address || ''}</span>
            { address&& typeof address ==='string' && <Copy text={address} className='text_des_unit'/>}
          </span>
          {typeof address === 'string' && domain?.domains && domain?.domains[address] && <Link className='ml-2' href={`/domain/${domain?.domains[address]}?provider=${domain.provider}`}>({ domain?.domains[address]})</Link> }
        </BrowserView>
      </div>
      <div className='card_shadow border border_color p-7 rounded-xl flex items-center'>
        <BrowserView>
          <Content contents={contentList} ns={'detail'} columns={2} data={{...data,tokenList}} />
        </BrowserView>
        <MobileView>
          <Content contents={contentList} ns={'detail'} columns={1} data={{...data,tokenList}} />
        </MobileView>
      </div>
      <AccountChange
        header={
          <div
            className='mt-5 mb-2.5 mx-2.5 flex justify-between items-center'
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
        actorId={actorId}
        verifyData={verifyData }
      />
    </div>
  );
};
