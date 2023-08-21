/** @format */

import { useFilscanStore } from '@/store/FilscanStore';
import { isMobile, pageLimit } from '@/utils';
import { Pagination, Table, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
//import Skeleton from '../skeleton';
import { useMemo } from 'react';

interface Props {
  data: Array<any>;
  columns: ColumnsType<any> | Array<any>;
  loading: boolean;
  limit?: number;
  current?: number;
  total?: number;
  className?: string;
  onChange: (pagination: any, filters?: any, sorter?: any) => void;
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

  if (isMobile()) {
    return (
      <div className='mobile_table'>
        {data.map((dataSource, data_index) => {
          return (
            <div className='mobile_table_card' key={data_index}>
              {columns.map((item: any, index: number) => {
                const { title, dataIndex, render } = item;
                const showTitle =
                  typeof item.title === 'function' ? item.title() : item.title;
                let showValue = dataSource[dataIndex];
                if (render) {
                  showValue = render(
                    dataSource[dataIndex],
                    dataSource,
                    data_index
                  );
                }
                return (
                  <div className='mobile_table_card_item' key={index}>
                    <div className='mobile_table_card_item_label'>
                      {showTitle}
                    </div>
                    <div className='mobile_table_card_item_value'>
                      {showValue}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <Pagination
          current={current}
          total={total}
          onChange={(cur: number) => {
            if (onChange) {
              onChange({ current: cur });
            }
          }}
        />
      </div>
    );
  }

  return (
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
  );
};
