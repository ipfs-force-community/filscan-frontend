import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { contract_list } from "@/contents/contract";
import Table from "@/packages/Table";
import useAxiosData from "@/store/useAxiosData";
import { pageLimit } from "@/utils";
import { useMemo, useState } from "react";

export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const [current, setCurrent] = useState(1)

  const payload = useMemo(() => {
    return {
      limit: pageLimit,
      index:current-1
    }
  },[current])

  const { data: listData, loading } = useAxiosData(apiUrl.contract_verify_list, { ...payload });

  const columns:any = useMemo(() => {
    return contract_list.columns.map((item:any) => {
      return {...item,title:tr(item.title)}
    })
  },[tr])

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current;
    setCurrent(cur);
  };

  const showData = useMemo(() => {
    if (listData && listData.compiled_file_list) {
      return listData.compiled_file_list.map((item: any, index: number) => {
        return { ...item, rank: (current - 1) * pageLimit + index + 1 }
      })
    }
    return []

  }, [listData?.compiled_file_list, current]);

  return <div className="main_contain">
    <div className='font-PingFang font-semibold text-lg	'>
      {tr('contract_list')}
      <div className="text_des text-xs font-normal mt-1">
        {tr('contract_list_total', {value: listData?.total ||0})}
      </div>
    </div>
    <div className='mt-4 border rounded-xl p-5 card_shadow border_color'>
      <Table
        key='contract_rank'
        className='-mt-2.5 '
        data={showData ||[]}
        total={ listData?.total || 0}
        columns={columns || []}
        loading={loading}
        onChange={handleChange}
      />
    </div>
  </div>
}