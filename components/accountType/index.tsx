import useAxiosData from "@/store/useAxiosData";
import { BrowserView, MobileView } from "../device-detect";
import { apiUrl } from "@/contents/apiUrl";
import { useRouter } from "next/router";
import copySvgMobile from '@/assets/images/icon-copy.svg';
import Copy from "../copy";
import { isIndent } from "@/utils";

export default ({value='',unit=6 }:{ value: string, unit?: number}) => {
  const { axiosData } = useAxiosData()
  const router = useRouter()
  const account_link = async (value: string) => {
    let show_type;
    const result = await axiosData(apiUrl.searchInfo, { input: value });
    show_type = result?.result_type;
    switch (show_type) {
    case 'miner':
      return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
    case 'storageminer':
      return router.push(`/miner/${value}`, `/miner/${value}`, {scroll:true});
    default:
      return router.push(`/address/${value}`, `/address/${value}`, {scroll:true});

    }
  }

  return (
    <>
      <MobileView>
        <span className='copy-row'>
          <span
            className='w-28 text'
            onClick={() => {
              account_link(value);
            }}>
            {value}
          </span>
          <Copy text={value} icon={copySvgMobile} className='copy'/>
        </span>
      </MobileView>
      <BrowserView>
        <span
          className='link_text'
          onClick={() => {
            account_link(value);
          }}>
          {isIndent(value,unit)}
        </span>
        {value && <Copy className='!w-[13px]' text={value} />}
      </BrowserView>

    </>
  );
}