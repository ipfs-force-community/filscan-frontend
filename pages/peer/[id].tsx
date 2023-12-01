import { BrowserView, MobileView } from '@/components/device-detect'
import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { peerList } from '@/contents/detail'
import Content from '@/packages/content'
import useAxiosData from '@/store/useAxiosData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default (props: any) => {
  const { tr } = Translation({ ns: 'detail' })
  const [data, setData] = useState({})
  const { axiosData } = useAxiosData()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])

  const load = async () => {
    const result: any = await axiosData(
      apiUrl.detail_account,
      {
        account_id: id,
      },
      { isCancel: false },
    )
    setData(result?.account_info?.account_miner || {})
  }
  return (
    <div className="main_contain">
      <MobileView>
        <div className="HarmonyOS_Medium m-2.5 !mx-2.5 flex items-center text-lg font-medium">
          <span>{tr('peer_detail')}</span>
        </div>
      </MobileView>
      <BrowserView>
        <div className="HarmonyOS_Medium !mx-2.5 mb-2.5 flex items-center text-lg font-medium">
          <span>{tr('peer_detail')}</span>
        </div>
      </BrowserView>

      <MobileView>
        <div className="card_shadow border_color m-[10px] rounded-xl border p-[12px]">
          <Content
            ns="detail"
            contents={peerList}
            data={{
              ...data,
            }}
          />
        </div>
      </MobileView>
      <BrowserView>
        <div className="card_shadow border_color rounded-xl border p-5">
          <Content
            ns="detail"
            contents={peerList}
            data={{
              ...data,
            }}
          />
        </div>
      </BrowserView>
    </div>
  )
}
