/** @format */

import { useEffect, useMemo, useContext, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { address_list, address_list_columns } from "@/contants/tipset";
import { Select } from "antd";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";
import { pageLimit } from "@/contants/varible";
import Table from "@/packages/newTable";


export default () => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  const [select,setSelect]= useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    load();
  }, []);

  const options = useMemo(() => {
    return address_list.options.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }, [filscanStore?.filscan?.lang]);

  const columns = useMemo(() => {
    return address_list_columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore?.filscan?.lang]);

  const load = (cur?: number, field?: string) => {
    const index = cur || current
    const showFIeld = field || select;
    setLoading(true)
    postAxios(apiUrl.tipset_address, {
      index: index - 1,
      limit:pageLimit,
      order: {
        field: showFIeld !== 'all' ? showFIeld : ''
      }
      
    }).then((res: any) => {
      setTotal(res?.result.total_count,)
      setLoading(false)
      const new_data =  res?.result?.get_rich_account_list?.map((v:any,num:number) => { 
          return {...v,rank:(index-1)*pageLimit + num+ 1}
        }) || []
      setData(new_data)
    });
  };
  return (
    <div className={styles.message_list}>
      <div className="font_18 font-Weight_500">{tr(address_list.title)}</div>
      <div className={styles.message_list_header}>
        <div className="font_16">{tr(address_list.total_list, { value: total })}</div>
        <Select
          options={options}
          defaultValue={"all"}
          className='custom_select'
          onChange={(value) => { 
            setCurrent(1);
            setSelect(value)
            load(1, value);
          }}
        />
      </div>
       <Table
        dataSource={data}
        total={total}
        columns={columns}
        loading={loading}
        rowKey={(record: any,) => { 
          return `${record.account_address}_${record.balance}`
        }}
        current={current}
        onPage={(cur) => {
          setCurrent(cur);
          load(cur);
        }}
      />
    </div>
  );
};
