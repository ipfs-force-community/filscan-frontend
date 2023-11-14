import { Translation } from '@/components/hooks/Translation'
import { verify } from '@/contents/contract'
import Segmented from '@/packages/segmented'
import { useState } from 'react'
import Source from './Source'
import VerifyData from './VerifyData'
import { notification } from 'antd'
import useAxiosData from '@/store/useAxiosData'

//验证合约
export default () => {
  const { tr } = Translation({ ns: 'contract' })
  const { axiosData } = useAxiosData()
  const [active, setActive] = useState('source_code')
  const [loading, setLoading] = useState<boolean>(false)
  const [outData, setOutData] = useState({})

  const handleSave = (files: Record<string, any>, url: string) => {
    setLoading(true)
    axiosData(url, { ...files }).then((res: any) => {
      setLoading(false)
      if (res) {
        setOutData({
          ...(res?.compiled_file || {}),
          is_verified: res?.is_verified,
        })
        setActive('compile_output')
        if (res.is_verified) {
          notification.success({
            className: 'custom-notification',
            message: 'success',
            duration: 100,
            description: 'Success',
          })
        } else {
          notification.error({
            className: 'custom-notification',
            message: 'Error',
            duration: 100,
            description: 'Invalid Arguments',
          })
        }
      }
    })
  }
  return (
    <div>
      <div className="mb-5">
        <span className="flex flex-col gap-y-2.5 text-xl font-medium">
          {tr('verify_title')}
        </span>
        <span className="text_des text-xs">{tr('step1_verify_des')}</span>
      </div>
      <Segmented
        data={verify.tabList}
        ns="contract"
        defaultValue={active}
        isHash={false}
        onChange={(v) => setActive(v)}
      />
      {active === 'source_code' && (
        <Source onChange={handleSave} loading={loading} />
      )}
      {active === 'compile_output' && <VerifyData data={outData} />}
    </div>
  )
}
