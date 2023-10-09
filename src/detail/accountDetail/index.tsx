import { BrowserView, MobileView } from "@/components/device-detect";
import { Translation } from "@/components/hooks/Translation";
import { account_detail, owner_detail_overview } from "@/contents/detail"
import Content from "@/packages/content"
import classNames from "classnames";
import { useMemo } from "react";
import styles from './index.module.scss'
import useWindow from "@/components/hooks/useWindown";
import { isIndent } from "@/utils";
import Link from "next/link";
import Copy from "@/components/copy";
import CopySvgMobile from '@/assets/images/icon-copy.svg';

export default ({ data,type }: { data: any,type:string }) => {
  const { tr } = Translation({ ns: 'detail' });
  const {isMobile} = useWindow()
  const contents = useMemo(() => {
    if (type === 'owner') {
      return owner_detail_overview.list
    }
    return account_detail.list(tr).map((value)=>{
      if (isMobile) {
        if (value.dataIndex === 'owner_address') {
          value.render = (text: string) => {
            if(!text) return '--'
            return <span className="flex items-baseline gap-x-2">
              <span className="text"><Link href={`/address/${text}`} className='link' >{isIndent(text,10)}</Link></span>
              <Copy text={text} icon={<CopySvgMobile/>} className="copy" />
            </span>
          }
        }

        if (value.dataIndex === 'worker_address') {
          value.render = (text: string) => {
            if(!text) return '--'
            return <span className="flex items-baseline gap-x-2">
              <Link href={`/address/${text}`} className='link_text' >{isIndent(text,10)}</Link>
              <Copy text={text} icon={<CopySvgMobile/>} className="copy" />
            </span>
          }
        }
        if (value.dataIndex === "beneficiary_address") {
          value.render = (text: any, record: any) => {
            if(!text) return '--'
            return <div className="flex flex-wrap items-baseline gap-x-2">
              {text&&Array.isArray(text)? text?.map((linkItem:string,index:number) => {
                return <span className="flex items-baseline gap-x-2" key={linkItem}>
                  <span className="text"><Link href={`/address/${linkItem}`} className='link_text' >{isIndent(linkItem,10)}</Link></span>
                  <Copy text={linkItem} icon={<CopySvgMobile/>} className='copy'/>
                </span>
              }): <span className="flex items-baseline gap-x-2">
                <span className="text"><Link href={`/address/${text}`} className='link_text' >{isIndent(text,10)}</Link></span>
                <Copy text={text} icon={<CopySvgMobile/>} className='copy'/>
              </span>}
            </div>
          }
        }
      }
      return value
    })
  },[type])

  return <div className={classNames("mt-5",styles.wrap)}>
    <div className=' mb-2 h-[32px] text-lg font-semibold mr-5 name-height mx-2.5'>
      {tr(type=== 'owner'?'owner_title':'account_overview')}
    </div>
    <div className="card_shadow w-full border rounded-xl p-2.5 pt-5 border_color">
      <MobileView>
        <Content contents={contents} ns={"detail"} columns={1} data={data} />
      </MobileView>
      <BrowserView>
        <Content contents={contents} ns={"detail"} columns={type=== 'owner'? 1:2} data={data} />
      </BrowserView>
    </div>
  </div>
}