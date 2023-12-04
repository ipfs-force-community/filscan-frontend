import { BrowserView, MobileView } from '../device-detect'
import copySvgMobile from '@/assets/images/icon-copy.svg'
import Copy from '../copy'
import { account_link, isIndent } from '@/utils'
import Tooltip from '@/packages/tooltip'

interface Props {
  value: string
  unit?: number
  tagText?: string
}

export default (props: Props) => {
  const { value = '', unit = 6, tagText } = props
  // const { axiosData } = useAxiosData()
  // const router = useRouter()

  // const account_link = async (value: string) => {
  //   let show_type;
  //   const result = await axiosData(apiUrl.searchInfo, { input: value });
  //   show_type = result?.result_type;
  //   switch (show_type) {
  //   case 'miner':
  //     return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
  //   case 'storageminer':
  //     return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
  //   default:
  //     return router.push(`/address/${value}`, `/address/${value}`, {scroll:true});

  //   }
  // }

  return (
    <>
      <MobileView>
        <span className="copy-row">
          {tagText ? (
            <div className="w-fit cursor-pointer rounded-[5px] bg-bg_hover px-2 py-1 text-primary">
              {tagText}
            </div>
          ) : (
            <span
              className="text w-28"
              onClick={() => {
                account_link(value)
              }}
            >
              {value}
            </span>
          )}

          <Copy text={value} icon={copySvgMobile} className="copy" />
        </span>
      </MobileView>
      <BrowserView>
        {tagText ? (
          <Tooltip context={value} icon={false}>
            <div className="cursor-pointer rounded-[5px] bg-bg_hover px-2 py-1 text-primary">
              {tagText}
            </div>
          </Tooltip>
        ) : (
          <span
            className="link_text"
            onClick={() => {
              account_link(value)
            }}
          >
            {isIndent(value, unit)}
          </span>
        )}

        {value && <Copy className="!w-[13px]" text={value} />}
      </BrowserView>
    </>
  )
}
