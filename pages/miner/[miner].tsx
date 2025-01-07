/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import AccountBalance from '@/src/detail/accountBalance'
import Power from '@/src/detail/Power'
import OverView from '@/src/detail/overView'
import { minerTabs, miner_overview } from '@/contents/detail'
import AccountChange from '@/src/detail/accountChange'
import PowerChange from '@/src/detail/powerChange'
import List from '@/src/detail/list'
import { Translation } from '@/components/hooks/Translation'
import { BrowserView, MobileView } from '@/components/device-detect'
import classNames from 'classnames'
import styles from './style.module.scss'
import Copy from '@/components/copy'
import useAxiosData from '@/store/useAxiosData'
import AccountDetail from '@/src/detail/accountDetail'
import CopySvgMobile from '@/assets/images/icon-copy.svg'
import PendingMsg from '@/src/detail/list/PendingMsg'

export default () => {
  const router = useRouter()
  const { miner } = router.query
  const [data, setData] = useState<any>({})
  const [loadingBalance, setBalanceLoading] = useState<boolean>(true)
  const [method, setMethod] = useState<any>([])
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData } = useAxiosData()

  useEffect(() => {
    let newMiner = miner
    if (miner === 'miner' || miner === 'address') {
      newMiner = router?.query?.miner || router?.query?.address
    }
    if (newMiner && typeof newMiner === 'string') {
      loadMinerData(newMiner)
      loadMethod()
    }
  }, [miner, router])

  const loadMethod = async () => {
    const result: any = await axiosData(
      apiUrl.detail_list_method,
      {
        account_id: miner,
      },
      { isCancel: false },
    )
    const newMethod: any = [
      {
        title: tr('all_method'),
        dataIndex: 'all',
        value: 'all',
      },
    ]
    Object.keys(result?.method_name_list || {}).forEach((li: string) => {
      newMethod.push({ label: li, dataIndex: li, value: li })
    })
    setMethod(newMethod)
  }

  const loadMinerData = async (minerId?: string) => {
    try {
      setBalanceLoading(true)
      const result: any = await axiosData(
        apiUrl.detail_account,
        {
          account_id: minerId || miner,
        },
        { isCancel: false },
      )
      setData(result?.account_info?.account_miner || {})
    } catch (error) {
      console.error(error) // 这里可以打印错误信息，或者进行其他的错误处理
    } finally {
      setBalanceLoading(false) // 无论是否发生错误，都将 loading 状态设置为 false
    }
    // setBalanceLoading(true);
    // const result: any = await axiosData(apiUrl.detail_account, {
    //   account_id: miner,
    // });
    // setBalanceLoading(false);
    // setData(result?.account_info?.account_miner || {});
  }

  const newTabList = useMemo(() => {
    const newTabs: any = []
    minerTabs.forEach((v: any) => {
      if (v?.optionsUrl === 'AllMethodByAccountID') {
        v.headerOptions = method
      }
      newTabs.push({ ...v })
    })
    return newTabs
  }, [method])

  return (
    <div className={classNames(styles.miner, 'main_contain')}>
      <div
        className={classNames(
          'HarmonyOS_Medium mb-2.5 flex items-center text-lg font-medium',
          styles['title-wrap'],
        )}
      >
        <BrowserView>
          <span
            className={classNames(
              'ml-4 flex items-center gap-x-1',
              styles.title,
            )}
          >
            <span>{tr('account_title')}:</span>
            <span>{miner || ''}</span>
            {miner && typeof miner === 'string' && <Copy text={miner} />}
          </span>
        </BrowserView>
        <MobileView>
          <span
            className={classNames(
              'ml-4 flex items-center gap-x-1',
              styles.title,
            )}
          >
            <span>{tr('account_title')}:</span>
            <span className="copy-row">
              <span className="normal-text">{miner || ''}</span>
              <span>
                {miner && typeof miner === 'string' && (
                  <Copy
                    icon={<CopySvgMobile />}
                    text={miner}
                    className="copy-lg"
                  />
                )}
              </span>
            </span>
          </span>
        </MobileView>
      </div>
      <div
        className={classNames(
          'card_shadow flex w-full !overflow-hidden rounded-xl',
          styles.balance,
        )}
      >
        <AccountBalance
          data={data?.account_indicator || {}}
          loading={loadingBalance}
        />
        <Power data={data?.account_indicator || {}} loading={loadingBalance} />
      </div>
      <OverView overView={miner_overview} accountId={miner} />
      <div className={classNames(styles.column, 'mt-6 flex gap-x-5')}>
        <AccountChange accountId={miner} interval={'1m'} />
        <PowerChange accountId={miner} type={'miner'} />
      </div>
      <AccountDetail data={data} type={'miner'} />
      <PendingMsg
        account_id={data?.account_basic?.account_id}
        account_address={data?.account_basic?.account_address}
      />
      <List
        tabList={newTabList}
        defaultActive="message_list"
        accountId={miner}
      />
    </div>
  )
}
