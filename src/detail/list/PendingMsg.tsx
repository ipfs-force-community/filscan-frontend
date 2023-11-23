import { BrowserView, MobileView } from "@/components/device-detect"
import { Translation } from "@/components/hooks/Translation"
import { message_list } from "@/contents/detail"
import Table from "@/packages/Table"
import { useFilscanStore } from "@/store/FilscanStore"
import { formatNumber } from "@/utils"
import classNames from "classnames"
import { useMemo } from "react"
import styles from './index.module.scss'

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
    <MobileView>
      <div className="text_des text-xs">
        {tr('pending_total', { value: formatNumber(data?.total) })}
      </div>
    </MobileView>

    <div className={classNames('card_shadow p-5 mt-7 min-h-[150px] border border_color rounded-xl', styles.table, styles.reset)}>
      <BrowserView>
        <div className="text_des text-xs mb-4">
          {tr('pending_total', { value: formatNumber(data?.total) })}
        </div>
      </BrowserView>
      <Table
        className={ styles['padding-table']}
        limit={5}
        data={data?.dataSource ||[]}
        total={data?.total}
        columns={columns}
        loading={false}
      />
    </div>
  </>

}