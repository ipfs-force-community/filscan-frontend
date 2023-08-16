/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { dsn_list, dsn_columns } from "@/contants/tipset";
import { Input } from "antd";
import Table from "@/packages/newTable";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";
import { pageLimit } from "@/contants/varible";

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
  const [input,setInput] = useState('');
    const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });

  useEffect(() => {
    load();
  }, []);

  const load = (cur?: number,input?:string) => {
    const showIndex = cur || current
    setLoading(true)
    postAxios(apiUrl.tipset_Dsn, {
      input:input,
      filters: {
        index: showIndex - 1,
        limit:20
      }
    }).then((res: any) => {
      setLoading(false)
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.market_deals_list || [],
      });
    });
  };



  const columns = useMemo(() => {
    return dsn_columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore.filscan.lang]);



  return (
    <div className={styles.message_list}>
      <div className="font_18 font-Weight_500">{tr(dsn_list.title)}</div>
      <div className={styles.message_list_header}>
        <div className="font_16">{tr(dsn_list.total_list, { value: data.total })}</div>
        <Input.Search
          className='custom-input-search'
          placeholder={tr(dsn_list.placeholder)}
          allowClear
          onSearch={(value:string) => { 
            load(1, value);
            setCurrent(1)
            setInput(value)
          }}
        />
      </div>
      <Table
        columns={columns}
        loading={ loading}
          total={data.total}
          dataSource={[...data.dataSource] }
          current={current}
          rowKey={(record: any) => `${record.piece_cid}_${record.end_time}`}
         // onChange={handleTableChange}
          onPage={(cur: number) => {
            setCurrent(cur);
            load( cur,input);
          }}
      />
    </div>
  );
};
