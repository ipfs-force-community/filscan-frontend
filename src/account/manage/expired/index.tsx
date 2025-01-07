/** @format */

import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { account_expired } from '@/contents/account'
import { formatDateTime } from '@/utils'
import { Collapse } from 'antd'
import { useHash } from '@/components/hooks/useHash'
import Detail from './Detail'
import manageStore from '@/store/modules/account/manage'
import Groups from '../../Groups'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'
import MTable from '@/packages/mobile/table'
import styles from './index.module.scss'
import classNames from 'classnames'
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons'
import ArrowDown from '@/assets/images/account/arrow_down.svg'
import Image from 'next/image'
import { cloneDeep } from 'lodash'
import useWindow from '@/components/hooks/useWindown'
interface Props {
  selectedKey: string
}
export default observer((props: Props) => {
  const { selectedKey } = props
  const { tr } = Translation({ ns: 'account' })
  const { expiredData, expiredLoading } = manageStore
  const [active, setActive] = useState<string>('-1')
  const { hashParams } = useHash()
  const { isMobile } = useWindow()
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

  const handleRowClick = (record: any, index: number) => {
    const keys = [...expandedRowKeys]
    const keyIndex = keys.indexOf(record.id)
    if (keyIndex >= 0) {
      // 如果行已经展开，折叠它
      keys.splice(keyIndex, 1)
    } else {
      // 如果行已经折叠，展开它
      keys.push(record.id)
    }
    setExpandedRowKeys(keys)
  }

  const columns = useMemo(() => {
    return account_expired.columns(tr).map((item) => {
      if (isMobile && item.dataIndex === 'group_name') {
        item.render = (text: string, record: any) => {
          const showText = record.is_default ? tr('default_group') : text
          return (
            <div className="text_color w-fit rounded-[5px] font-normal">
              {showText}
            </div>
          )
        }
      }
      return { ...item, title: tr(item.title) }
    })
  }, [tr, isMobile])

  const columnsTable = useMemo(() => {
    return cloneDeep(account_expired.headerList).map((item) => {
      if (item.title === 'exp_month') {
        item.title = 'exp_time'
        item.render = (text: string, record: any, tr: any) => {
          const [year, month] = text.split('-')
          return (
            <div className={styles.expTime}>
              <ArrowDown style={{}} />
              <span>{formatDateTime(text, 'YYYY-MM')}</span>
            </div>
          )
          // return <span>{tr('exp_month', { year, month })}</span>;
        }
      }

      item.width = 'unset'
      if (item.dataIndex === 'exp_month') {
        item.width = '150px'
      }
      if (item.dataIndex === 'total_exp_power') {
        item.width = '120px'
      }
      return { ...item, title: tr(item.title) }
    })
  }, [tr])

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const iconCells = document.getElementsByClassName(
      'ant-table-row-expand-icon-cell',
    )
    console.log('+======000===', iconCells)
  }, [])

  const load = (value?: string) => {
    const group_id = value ? Number(value) : Number(active)
    manageStore.getExpiredData({
      group_id: group_id,
    })
  }

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} selectedKey={selectedKey} />
  }

  return (
    <div className={styles.wrap}>
      <BrowserView>
        <div className={classNames('flex items-center justify-between')}>
          <div className="flex  flex-col">
            <span className="w-full font-HarmonyOS text-lg font-semibold	">
              {tr(selectedKey)}
            </span>
            <span className="text_des text-xs">
              <span>{tr('last_time')}</span>
              <span className="ml-2">
                {formatDateTime(expiredData?.epoch_time, 'YYYY/MM/DD HH:mm')}
              </span>
            </span>
          </div>
          <div className="flex gap-x-2.5">
            <Groups
              selectGroup={active}
              onChange={(value: string) => {
                load(value)
                setActive(value)
              }}
            />
            {/* <ExportExcel columns={columns} data={expiredData} /> */}
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className={classNames('flex flex-col justify-start')}>
          <div className="flex  flex-col">
            <span className={styles.title}>{tr(selectedKey)}</span>
            <span className={styles.desc}>
              <span>{tr('last_time')}</span>
              <span className="ml-2">
                {formatDateTime(expiredData?.epoch_time, 'YYYY/MM/DD HH:mm')}
              </span>
            </span>
          </div>
          <div className={styles.group}>
            <Groups
              selectGroup={active}
              onChange={(value: string) => {
                load(value)
                setActive(value)
              }}
            />
            {/* <ExportExcel columns={columns} data={expiredData} /> */}
          </div>
        </div>
      </MobileView>
      <div className={classNames('mt-5', styles.tableWrap)}>
        <MobileView>
          <MTable
            scroll={{ x: 'max-content' }}
            columns={columnsTable}
            dataSource={expiredData?.sector_detail_month}
            onRow={(record, index) => ({
              onClick: () => handleRowClick(record, index ?? 0),
            })}
            rowKey={(record) => {
              return record.id
            }}
            expandable={{
              expandedRowKeys,
              expandIcon: () => null,
              expandedRowClassName: (record, index, indent) => {
                return styles.expandedRow
              },
              expandedRowRender: (record, index, indent, expanded) => {
                return (
                  <MTable
                    className={styles['expanded-table']}
                    scroll={{ x: 'max-content' }}
                    dataSource={
                      expiredData?.sector_detail_month[index]
                        ?.sector_detail_list || []
                    }
                    columns={columns}
                  />
                )
              },
            }}
          />
        </MobileView>
        <BrowserView>
          <ul className="card_shadow border_color text_des mb-5 flex rounded-xl border px-10 py-4 text-sm font-medium ">
            {account_expired?.headerList.map((titleItem, index) => {
              let showTitle = titleItem.title
              if (showTitle === 'exp_month') {
                showTitle = 'exp_time'
              }
              return (
                <li key={index} style={{ width: titleItem.width }}>
                  {tr(showTitle)}
                </li>
              )
            })}
          </ul>
          {expiredData?.sector_detail_month?.map(
            (sector_item: any, index: number) => {
              return (
                <Collapse
                  key={index}
                  collapsible="header"
                  className="card_shadow custom_Collapse  mb-2.5 !rounded-xl"
                  expandIconPosition="end"
                  items={[
                    {
                      key: index,
                      label: (
                        <ul className="flex pl-7">
                          {account_expired?.headerList.map((item: any) => {
                            const { dataIndex, width, title, render } = item
                            const value = sector_item[dataIndex]
                            const showValue = render
                              ? render(value, sector_item, tr)
                              : value
                            return (
                              <li key={index} style={{ width: width }}>
                                {showValue}
                              </li>
                            )
                          })}
                        </ul>
                      ),
                      children: (
                        <Table
                          data={sector_item?.sector_detail_list || []}
                          columns={columns}
                          loading={expiredLoading}
                        />
                      ),
                    },
                  ]}
                />
              )
            },
          )}
        </BrowserView>
      </div>
    </div>
  )
})
