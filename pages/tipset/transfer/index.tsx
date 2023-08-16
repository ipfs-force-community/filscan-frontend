/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { transfer_list, transfer_columns } from "@/contants/tipset";
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
    const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });
  useEffect(() => {
    load();
  }, []);

  const load = (cur?:number) => {
    setLoading(true)
    const showIndex = cur || current;
    postAxios(apiUrl.tipset_transfer, {
      filters: {
        index: showIndex - 1,
        limit:pageLimit
      }
    }).then((res: any) => {
      setLoading(false)
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.large_transfer_list || [],
      });
    });
  };

  const columns = useMemo(() => {
    return transfer_columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore.filscan.lang]);

  return (
    <div className={styles.message_list}>
      <div className="font_18 font-Weight_500">{tr(transfer_list.title)}</div>
      <div className={styles.message_list_header}>
        <div className="font_16">{tr(transfer_list.total_list, { value: data.total })}</div>
      </div>
       <Table
          columns={columns}
          total={data.total}
          dataSource={data.dataSource}
        current={current}
        loading={ loading}
        rowKey={(record: any) => `${record.cid}_${record.block_time}`}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(cur);
          }}
      />
    </div>
  );
};
