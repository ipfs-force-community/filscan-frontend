/** @format */

import React, { FC } from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Button } from 'antd'
import { getSvgIcon } from '@/svgsIcon'
import { Translation } from '@/components/hooks/Translation'
import {
  formatDateTime,
  formatFil,
  formatFilNum,
  formatNumberPercentage,
  unitConversion,
} from '@/utils'

interface ExportToExcelProps {
  columns: { title: string; dataIndex: string; [key: string]: any }[]
  data: { [key: string]: any }[]
  fileName?: string
  ns?: string
}

function getUnitValue(
  value: any,
  amountUnit: { unit: string; number?: number },
) {
  if (amountUnit?.unit?.includes('fil')) {
    const otherUnit = amountUnit?.unit?.split('/')[1]
    const filValue = formatFil(value, 'FIL', 4)
    return filValue //otherUnit ? filValue + `/${otherUnit}` : filValue+' FIL';
  } else if (amountUnit?.unit === 'power') {
    const otherUnit = amountUnit?.unit?.split('/')[1]
    const powerValue = unitConversion(value, amountUnit.number || 2)
    return otherUnit ? powerValue + `/${otherUnit}` : powerValue
  } else if (amountUnit?.unit === '%') {
    const powerValue = formatNumberPercentage(value, amountUnit.number)
    return powerValue + '%'
  }
  return value
}

const ExportExcel: FC<ExportToExcelProps> = ({
  columns,
  ns,
  data,
  fileName,
}) => {
  const { tr } = Translation({ ns: ns || 'common' })

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (
    columns: {
      title: any
      dataIndex: any
      render?: (text: string, record: any) => JSX.Element
    }[],
    data: { [key: string]: any }[],
    fileName?: string,
  ) => {
    const headers: Array<string> = []
    columns.forEach((col: any) => {
      const { dataIndex, amountUnit } = col
      let title = col.titleTip ? col.excelTitle : col.title
      if (
        title.includes('/') &&
        col.exports &&
        (col?.exports || []).length > 0
      ) {
        let newTitle = title
        let [title0, title1] = newTitle.split('/')
        if (
          amountUnit &&
          amountUnit[dataIndex] &&
          amountUnit[dataIndex]?.unit.includes('fil') &&
          title0
        ) {
          title0 = title0 + `(${amountUnit[dataIndex]?.unit?.toUpperCase()})`
          title1 = title1 + `(${amountUnit[dataIndex]?.unit?.toUpperCase()})`
        }
        headers.push(title0)
        headers.push(title1)
      } else {
        if (
          amountUnit &&
          amountUnit[dataIndex] &&
          amountUnit[dataIndex]?.unit.includes('fil')
        ) {
          title = title + `(${amountUnit[dataIndex]?.unit?.toUpperCase()})`
        }
        headers.push(title)
      }

      // if (col.exports && Array.isArray(col.exports)) {
      //   col.exports.forEach((v: string) => {
      //     if (v === col.dataIndex) {
      //       title = title + col.amountUnit[v]
      //     }
      //     headers.push(tr(v));
      //   });
      // }
    })
    const accessors: Array<string> = []
    columns.forEach((col: any) => {
      accessors.push(col.dataIndex)
    })
    const dataRows: Array<any> = []
    data.forEach((dataItem) => {
      const row: any = []
      columns.forEach((col: any) => {
        const dataIndex = col.dataIndex
        let value = dataItem[dataIndex]
        let otherValue = ''
        const showUnit =
          col?.amountUnit &&
          col.amountUnit[dataIndex] &&
          col?.amountUnit[dataIndex]?.unit
        if (showUnit) {
          value = getUnitValue(value, col.amountUnit[dataIndex])
        }
        // if (col.exports) {
        //   if (col.exports && Array.isArray(col.exports)) {
        //     col.exports.forEach((v: string) => {
        //       otherValue = otherValue + '/' + String(getUnitValue(dataItem[v], col.amountUnit[v]));
        //     });
        //   }
        // }
        //   row.push(String(value)+otherValue);

        if (col.exports && Array.isArray(col.exports)) {
          col.exports.forEach((v: string) => {
            const otherKey = v
            let otherValue = dataItem[otherKey]
            const otherShow =
              col?.amountUnit && col.amountUnit[v] && col?.amountUnit[v]?.unit
            if (otherShow) {
              otherValue = getUnitValue(otherValue, col?.amountUnit[v])
            }
            row.push(otherValue)
          })
        }
        row.push(value)
      })
      dataRows.push(row)
    })
    const dataArray = [headers, ...dataRows]
    //const dataArray = data.map((row) => accessors.map((field) => row[field]));
    //dataArray.unshift(headers);
    const showFileName = fileName
      ? fileName +
        formatDateTime(Number(new Date().getTime() / 1000), 'MM_DD hh:mm:ss')
      : formatDateTime(Number(new Date().getTime() / 1000), 'MM_DD hh:mm:ss')
    const ws = XLSX.utils.aoa_to_sheet(dataArray)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blobData = new Blob([excelBuffer], { type: fileType })

    FileSaver.saveAs(blobData, showFileName + fileExtension)
  }

  return (
    <Button
      className="confirm_btn flex items-center gap-x-1"
      onClick={(e) => exportToCSV(columns, data, fileName)}
    >
      {getSvgIcon('downloadIcon')}
      <span>{tr('Export')}</span>
    </Button>
  )
}
export default ExportExcel
