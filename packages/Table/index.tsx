/** @format */

import { BrowserView, MobileView } from '@/components/device-detect'
import { pageLimit } from '@/utils'
import { Pagination, Skeleton, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableProps } from 'antd/lib'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import NoData from '../noData'
import Image from 'next/image'
import loadingPng from '@/assets/images/loading.png'

interface Props extends TableProps<any> {
  data: Array<any>
  columns: ColumnsType<any> | Array<any>
  loading: boolean
  limit?: number
  total?: number
  current?: number
  className?: string
  onChange?: (pagination: any, filters?: any, sorter?: any) => void
}

export default (props: Props) => {
  const {
    data,
    columns,
    loading,
    total = 0,
    limit,
    current,
    className = '',
    onChange,
  } = props

  const showLimit = useMemo(() => {
    return limit || pageLimit
  }, [limit])

  useEffect(() => {
    if (current) {
      setCur(current)
    }
  }, [current])

  const [cur, setCur] = useState(1)

  return (
    <>
      <MobileView>
        <div className={styles['mobile-table']}>
          {[...mobileContent]
            .filter(([key, value]) => key.loading === loading)
            .map(([key, value]) => value.call(this, data, columns))}
          <div className={styles.pagination}>
            <Pagination
              current={cur}
              total={total}
              pageSize={pageLimit}
              showQuickJumper={false}
              showSizeChanger={false}
              hideOnSinglePage={true}
              showLessItems={true}
              onChange={(cur: number) => {
                if (onChange) {
                  setCur(cur)
                  onChange({ current: cur })
                }
              }}
            />
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <Table
          tableLayout="fixed"
          bordered={false}
          className={`custom_table ${className} h-full w-full`}
          dataSource={[...data]}
          columns={columns}
          rowClassName={'custom_table_row'}
          rowKey={new Date().getTime()}
          onChange={onChange}
          // loading={loading}
          loading={{
            spinning: loading,
            size: 'large',
            wrapperClassName: 'custom-table-loading',
            indicator: (
              <div className="custom-table-loading-div">
                <Image src={loadingPng} width={160} height={160} alt="" />
              </div>
            ),
          }}
          scroll={{ x: 'max-content' }}
          showSorterTooltip={false}
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
  )
}

const mobileContent = new Map([
  [
    { loading: true },
    () => {
      return <Skeleton active paragraph={{ rows: 10 }} />
    },
  ],
  [
    { loading: false },
    (data: any[], columns: any[]) => {
      return data.length ? (
        data.map((dataSource, index) => {
          return (
            <div className={styles['mobile-table-card']} key={index}>
              {columns.map((item: any, idx: number) => {
                const { title, dataIndex, render } = item
                const showTitle =
                  typeof title === 'function'
                    ? title(dataSource[dataIndex], dataSource, index)
                    : title
                let showValue = dataSource[dataIndex]
                if (render) {
                  showValue = render(dataSource[dataIndex], dataSource, index)
                }
                return (
                  <div
                    className={classNames(
                      styles['mobile-table-card-item'],
                      `${dataIndex}-hide`,
                    )}
                    key={idx}
                  >
                    <div className={styles['mobile-table-card-item-label']}>
                      {showTitle}
                    </div>
                    <div className={styles['mobile-table-card-item-value']}>
                      {showValue}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })
      ) : (
        <NoData />
      )
    },
  ],
])
