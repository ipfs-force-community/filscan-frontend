import { Translation } from '@/components/hooks/Translation'
import { verify_output, verify_source } from '@/contents/contract'
import { getSvgIcon } from '@/svgsIcon'
import Link from 'next/link'

export default ({ data }: { data: any }) => {
  const { tr } = Translation({ ns: 'contract' })

  return (
    <div className="card_shadow border_color mt-2.5 rounded-xl border ">
      <ul className="border_color text_des m-5 rounded-[5px] border  p-4 text-xs">
        {verify_source.desList.map((item) => {
          return <li key={item.title}>{tr(item.title)}</li>
        })}
      </ul>
      <div className="mt-5 p-5">
        <div className="font-medium">{tr('byte_code')}</div>
        <span
          className={`my-4 flex items-center gap-x-1 ${
            !data?.is_verified && !data?.has_been_verified
              ? 'text_red'
              : 'text_green'
          }`}
        >
          {!data?.is_verified && !data?.has_been_verified
            ? getSvgIcon('errorIcon')
            : getSvgIcon('successIcon')}
          {data?.has_been_verified
            ? tr('has_been_verified')
            : data?.is_verified
              ? tr('ver_sucess')
              : tr('ver_err')}
        </span>
        <div className="border_color max-h-[150px] min-h-[9px]  overflow-auto break-words rounded-[5px] border p-5">
          {data.byte_code}
        </div>
      </div>
      {data.is_verified && (
        <>
          <ul className="border_color border-b border-t p-5 ">
            {verify_output.headerList.map((item) => {
              const value = data[item.dataIndex]
              return (
                <li
                  key={item.dataIndex}
                  className="flex h-9 items-center text-sm"
                >
                  <span className="text_des w-28 ">{tr(item.title)}:</span>
                  <span className="font-HarmonyOS_Medium">{String(value)}</span>
                </li>
              )
            })}
          </ul>
          <div className="border_color m-5 rounded-[5px] border text-sm">
            <div className="m-5">
              <span>{tr('contract_name')}</span>
              <div className="border_color mt-3 flex h-9 items-center rounded-[5px] border px-2.5 ">
                {data?.contract_name || ''}
              </div>
            </div>
            <div className="m-5">
              <span>{tr('contract_abi')}</span>
              <div className="text_des  border_color mt-3 h-[166px] overflow-auto break-words rounded-[5px] border ">
                {data?.ABI || ''}
              </div>
            </div>
          </div>
          <div className="m-8 flex gap-x-4">
            <Link
              href={`/address/${data.contract_address}`}
              className="primary_btn flex h-8 items-center gap-x-2"
            >
              {' '}
              {tr('look_adres')}
            </Link>
            <Link
              href={`/contract/verify`}
              className="cancel_btn border_color flex items-center justify-center rounded-md border"
            >
              {' '}
              {tr('back')}
            </Link>
          </div>
        </>
      )}
      {!data.is_verified && (
        <div className="m-8 flex gap-x-4">
          <Link
            href={`/contract/verify`}
            className="cancel_btn border_color flex items-center justify-center rounded-md border"
          >
            {' '}
            {tr('back')}
          </Link>
        </div>
      )}
    </div>
  )
}
