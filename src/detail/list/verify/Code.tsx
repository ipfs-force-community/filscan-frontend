import Copy from '@/components/copy'
import { BrowserView } from '@/components/device-detect'
import { Translation } from '@/components/hooks/Translation'
import { contract_detail } from '@/contents/contract'
import Select from '@/packages/select'
import Selects from '@/packages/selects'
import { getSvgIcon } from '@/svgsIcon'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('@/components/ace'), { ssr: false })

export default ({
  data = {},
  actorId,
}: {
  data: Record<string, any>
  actorId?: string
}) => {
  const { tr } = Translation({ ns: 'contract' })

  const { compiled_file = {}, source_file = [] } = data

  const handleAbiChange = (value: string) => {
    if (actorId) {
      window.open(
        `${window.location.origin}/contract/abi/${actorId}?format=${value}`,
      )
    }
  }

  return (
    <div className={classNames('mt-5')}>
      <span className="flex items-center gap-x-1">
        {getSvgIcon('successIcon')}
        {tr('verify_contract')}
      </span>
      <ul className="border_color mt-5 flex flex-wrap gap-y-2 rounded-md border p-5">
        {contract_detail.list.map((item) => {
          const { dataIndex, title, render } = item
          const value =
            render && compiled_file
              ? render(compiled_file[dataIndex] || '', data)
              : (compiled_file && compiled_file[dataIndex]) || ''
          return (
            <li className="flex h-9 w-1/2 items-center" key={dataIndex}>
              <span className="text_des w-28">{tr(item.title)}:</span>
              <span>{value}</span>
            </li>
          )
        })}
      </ul>
      <BrowserView>
        <div className="my-5">
          <div className="mb-5">
            <span className="text-sm font-medium">
              {`${tr('source_code')} (Solidity)`}{' '}
            </span>
          </div>
          {source_file?.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="my-2.5 flex items-center justify-between">
                  <span>{item?.file_name || ''}</span>
                  <span className="border_color flex h-7 w-7 items-center justify-center rounded-[5px] border">
                    <Copy text={item.source_code} className="text_color" />
                  </span>
                </div>
                <Editor
                  value={item.source_code || {}}
                  otherProps={{ readOnly: true }}
                />
              </div>
            )
          })}
        </div>
        <div className="my-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {`${tr('contract_abi')}`}{' '}
            </span>
            <Selects
              placeholder={tr(contract_detail.abiOptions.placeholder)}
              options={contract_detail.abiOptions.list}
              onChange={handleAbiChange}
            />
          </div>
          <div className="border_color h-[300px] overflow-auto break-words rounded-[5px] border p-5">
            {compiled_file?.ABI || ''}
          </div>
        </div>
        <div className="my-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {`${tr('source_code_create')}`}{' '}
            </span>
            <span className="border_color flex h-7 w-7 items-center justify-center rounded-[5px] border">
              <Copy text={compiled_file?.byte_code} className="text_color" />
            </span>
          </div>
          <div className="border_color h-[300px] overflow-auto break-words rounded-[5px] border p-5">
            {compiled_file?.byte_code || ''}
          </div>
        </div>
      </BrowserView>
    </div>
  )
}
