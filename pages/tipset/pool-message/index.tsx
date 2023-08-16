/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { pool_list, pool_columns } from "@/contants/tipset";
import { Select } from "antd";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import { pageLimit } from "@/contants/varible";
import styles from "../index.module.scss";
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
  const [options, setOptions] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [select,selectValue]= useState('')
  const [data, setData] = useState<any>({
    total: 0,
    dataSource: [],
  });

  const columns = useMemo(() => {
    return pool_columns.map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
    });
  }, [filscanStore?.filscan?.lang]);

  useEffect(() => {
    if (options) {
      const newOptios: any = options.map((v: any) => {
        return { ...v, label: tr(v.key) };
      });
      setOptions(newOptios);
    } else { 
      setOptions([])
    }
  }, [filscanStore?.filscan?.lang]);

  useEffect(() => {
    postAxios(apiUrl.tipset_message_pool_opt).then((res: any) => {
      const opt: any = [ ];
      const newObj = res?.result?.method_name_list || {};
      let numRes = 0;
      //        opt.push({ label: `${tr("message_list_all")} (${newObj[key]})` , value: 'all', key:'message_list_all' });

      Object.keys(newObj).forEach((key: string) => {
        
        numRes =Number( numRes + Number(newObj[key]));

        opt.push({ label: `${tr(key)}` , value: key, key:key });
        
      });
      opt.unshift({ label: `${tr("message_list_all")}` , value: 'all', key:'message_list_all' })
      setOptions(opt);
    });
    load();
  }, []);

  const load = (cur?: number,methods?:string) => {
    const index = cur || current;
    const method = methods ||select
    setLoading(true)
    postAxios(apiUrl.tipset_pool, {
      filters: {
        index:index-1,
        limit: pageLimit,
        method_name:method === 'all'? undefined:method
      },
    }).then((res: any) => {
          setLoading(false)
      setData({
        total: res?.result.total_count,
        dataSource: (res?.result.messages_pool_list || [])?.map((item: any) => {
          return {
            ...item?.message_basic,
            gas_fee_cap: item?.gas_limit || "",
            gas_premium: item?.gas_premium || "",
          };
        }),
      });
    });
  };

  return (
    <div className={styles.message_list}>
      <div className="font_18 font-Weight_500">{tr(pool_list.title)}</div>
      <div className={styles.message_list_header}>
        <div className="font_16">{tr(pool_list.total_list, { value: data.total })}</div>
        <Select
          showSearch={ true}
          options={options}
          defaultValue={"all"}
          className='custom_select'
          onChange={(value) => { 
            setCurrent(0);
            selectValue(value)
            load(1,value)
          }}
        />
      </div>
      <Table
        loading={ loading}
        dataSource={data.dataSource}
        total={data.total}
        columns={columns}
        rowKey={(record: any,other:any) => { 
          return `${record.gas_premium}_${record.gas_limit}`
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
