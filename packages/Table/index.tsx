/** @format */

import { isMobile, pageLimit } from '@/utils';
import { Pagination, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

interface Props {
  data: Array<any>;
  columns: ColumnsType<any>;
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

  const columnsList: any = useMemo(() => {
    const arrList: any = [];
    if (loading) {
      columns.forEach((item: any) => {
        arrList.push({ ...item, render: () => <Skeleton active /> });
      });
    } else {
      columns.forEach((item: any) => {
        arrList.push({ ...item });
      });
    }

    return arrList;
  }, [loading, columns]);

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
      bordered={false}
      className={`custom_table ${className}`}
      dataSource={[...data]}
      columns={columnsList}
      rowClassName={'custom_table_row'}
      rowKey={new Date().getDate()}
      pagination={
        total > showLimit
          ? {
              position: ['bottomCenter'],
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
