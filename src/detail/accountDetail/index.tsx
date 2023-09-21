import { BrowserView, MobileView } from "@/components/device-detect";
import { Translation } from "@/components/hooks/Translation";
import { account_detail, owner_detail_overview } from "@/contents/detail"
import Content from "@/packages/content"
import { useMemo } from "react";

export default ({ data,type }: { data: any,type:string }) => {
  const { tr } = Translation({ ns: 'detail' });

  const contents = useMemo(() => {
    if (type === 'owner') {
      return owner_detail_overview.list
    }
    return account_detail.list(tr)
  },[type])

  return <div className="mt-5">
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