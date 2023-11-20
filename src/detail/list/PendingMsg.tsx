import { BrowserView } from "@/components/device-detect"
import { Translation } from "@/components/hooks/Translation"
import { message_list } from "@/contents/detail"
import Table from "@/packages/Table"
import { useFilscanStore } from "@/store/FilscanStore"
import { formatNumber } from "@/utils"
import { useMemo } from "react"

interface Props {
              data: {
                            dataSource?: Array<any>
                            total?:number
              }
}
export default (props: Props) => {
  const {data } = props;
  const { tr } = Translation({ ns: 'detail' });
  const { theme, lang } = useFilscanStore();

  const columns = useMemo(() => {
    return message_list({}, {}).map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [theme, tr]);

  const handleChange = () => {

  }

  if (!data?.total) {
    return null
  }

  return <>
    <div
      className='mt-5 mb-2.5 mx-2.5 flex justify-between items-center'
    >
      <span className='DINPro-Medium font-medium  text-lg'>
        {tr('pending_title')}
      </span>
    </div>
    <div className="card_shadow p-5 min-h-[300px] border border_color rounded-xl">
      <div className="text_des text-xs mb-4">
        {tr('pending_total', { value: formatNumber(data?.total) })}
      </div>
      <Table
        limit={5}
        data={data?.dataSource ||[]}
        total={data?.total}
        columns={columns}
        loading={false}
        onChange={handleChange}
      /></div></>

}