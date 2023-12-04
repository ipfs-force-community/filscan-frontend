import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { cid_list } from '@/contents/detail'
import Content from '@/packages/content'
import useAxiosData from '@/store/useAxiosData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CidTable from '@/src/detail/cidDetail'
import styles from './[cid].module.scss'
import classNames from 'classnames'
import Loading from '@/components/loading'

export default () => {
  const router = useRouter()
  const { cid } = router.query
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData, loading } = useAxiosData()
  const [options, setOptions] = useState<Array<any>>([])
  const [data, setData] = useState({})
  useEffect(() => {
    load()
  }, [cid])

  const load = async () => {
    const optionsResult = await axiosData(apiUrl.tipset_block_message_opt, {
      cid,
    })
    const newObj = optionsResult?.method_name_list || {}
    const opt: Array<any> = []
    opt.push({ label: `${tr('all')}`, value: 'all', key: 'all' })
    Object.keys(newObj).forEach((key: string) => {
      opt.push({ label: `${tr(key)} (${newObj[key]})`, value: key, key: key })
    })
    setOptions(opt)
    const result = await axiosData(apiUrl.tipset_BlockDetails, {
      block_cid: cid,
    })
    setData(result?.block_details || {})
  }
  if (loading) {
    return <Loading />
  }
  return (
    <div className={classNames(styles.cid, 'main_contain')}>
      <div className="mx-2.5 font-HarmonyOS text-lg font-semibold ">
        {tr('chain_cid_detail')}
      </div>
      <div className="card_shadow border_color text_xs mt-4 rounded-xl border p-5">
        <Content contents={cid_list.headerList} ns={'detail'} data={data} />
      </div>
      <CidTable options={options} cid={cid} />
    </div>
  )
}
