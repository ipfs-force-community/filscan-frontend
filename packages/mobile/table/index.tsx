import { Table as T,TableProps } from "antd"
import classNames from "classnames"
import styles from './index.module.scss'
import { useMemo } from "react";
import { pageLimit } from "@/utils";
interface TProps extends TableProps<any> {
  loading?: boolean;
  limit?: number;
  current?: number;
  total?: number;
  onChange?: (pagination: any, filters?: any, sorter?: any) => void;
}
const Table = (props:TProps)=>{
  const {
    columns,
    loading,
    current,
    total = 0,
    limit,
    onChange,
  } = props;

  const showLimit = useMemo(() => {
    return limit || pageLimit;
  }, [limit]);

  return <div className={classNames(styles.wrap)}>
    <T
      loading={loading}
      columns={props.columns}
      dataSource={props.dataSource}
      onChange={onChange}
      pagination={
        total > showLimit
          ? {
            position: ['bottomRight'],
            current: current,
            pageSize: pageLimit,
            showSizeChanger: false,
            responsive:true,
            total,
          }
          : false
      }
    ></T>
  </div>
}

export default Table