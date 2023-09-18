/** @format */

import { BrowserView, MobileView } from '@/components/device-detect';
import { pageLimit } from '@/utils';
import { Pagination, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableProps } from 'antd/lib';
import { useMemo } from 'react';
import styles from './index.module.scss'
import classNames from 'classnames';
import NoData from '../noData';

interface Props extends TableProps<any> {
  data: Array<any>;
  columns: ColumnsType<any> | Array<any>;
  loading: boolean;
  limit?: number;
  current?: number;
  total?: number;
  className?: string;
  onChange?: (pagination: any, filters?: any, sorter?: any) => void;
}

export default (props: Props) => {
  const {
    data,
    columns,
    loading,
    current,
    total = 0,
    limit,
    className = '',
    onChange,
  } = props;

  const showLimit = useMemo(() => {
    return limit || pageLimit;
  }, [limit]);

  return <>
    <MobileView>
      <div className={styles['mobile-table']}>
        {
          [...mobileContent].filter(([key,value])=>key.loading === loading).map(([key,value])=> value.call(this,data,columns))
        }
        {total > showLimit ? <Pagination
          current={current}
          total={total}
          onChange={(cur: number) => {
            if (onChange) {
              onChange({ current: cur });
            }
          }}
        /> : <></>}
      </div>
    </MobileView>
    <BrowserView>
      <Table
        tableLayout='fixed'
        bordered={false}
        className={`custom_table ${className} w-full h-full`}
        dataSource={[...data]}
        columns={columns}
        rowClassName={'custom_table_row'}
        rowKey={new Date().getTime()}
        onChange={onChange}
        loading={loading}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        // loading={{
        //   spinning: loading, // 这里应该是一个状态，表示数据是否正在加载
        //   indicator: <Skeleton active />,
        //   wrapperClassName: 'custom_table_loading',
        // }}
        pagination={
          total > showLimit
            ? {
              position: ['bottomRight'],
              current: current,
              showQuickJumper: true,
              pageSize: pageLimit,
              showSizeChanger: false,
              total,
            }
            : false
        }
      />
    </BrowserView>
  </>
};

const mobileContent = new Map(
  [
    [
      {loading:true},()=>{
        return <Skeleton active paragraph={{rows:10}}/>
      }
    ],
    [
      {loading:false},(data:any[],columns:any[])=>{
        return data.length ? data.map((dataSource, index) => {
          return (
            <div className={styles['mobile-table-card']} key={index}>
              {columns.map((item: any, index: number) => {
                const { title, dataIndex, render } = item;
                const showTitle =
                  typeof title === 'function' ? title(
                    dataSource[dataIndex],
                    dataSource,
                    index
                  ) : title;
                let showValue = dataSource[dataIndex];
                if (render) {
                  showValue = render(
                    dataSource[dataIndex],
                    dataSource,
                    index
                  );
                }
                return (
                  <div className={classNames(styles['mobile-table-card-item'],`${dataIndex}-hide`)} key={index}>
                    <div className={styles['mobile-table-card-item-label']}>
                      {showTitle}：
                    </div>
                    <div className={styles['mobile-table-card-item-value']}>
                      {showValue}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }):<NoData/>
      }
    ]
  ]
);