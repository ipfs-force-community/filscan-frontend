import { Table as T,TableProps } from "antd"
import classNames from "classnames"
import styles from './index.module.scss'
interface TProps extends TableProps<any> {
  onChange?: (pagination: any, filters?: any, sorter?: any) => void;
}
const Table = (props:TProps)=>{
  return <div className={classNames(styles.wrap)}>
    <T
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={props.pagination}
    ></T>
  </div>
}

export default Table