/** @format */

import React, { FC } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { getSvgIcon } from '@/svgsIcon';
import { Translation } from '@/components/hooks/Translation';
import { formatDateTime, formatFilNum } from '@/utils';

interface ExportToExcelProps {
  columns: { title: string; dataIndex: string; [key: string]: any }[];
  data: { [key: string]: any }[];
  fileName?: string;
  ns?: string;
}

const ExportExcel: FC<ExportToExcelProps> = ({
  columns,
  ns,
  data,
  fileName,
}) => {
  const { tr } = Translation({ ns: ns || 'common' });

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (
    columns: {
      title: any;
      dataIndex: any;
      render?: (text: string, record: any) => JSX.Element;
    }[],
    data: { [key: string]: any }[],
    fileName?: string
  ) => {
    const headers: Array<string> = [];
    columns.forEach((col: any) => {
      headers.push(col.title);
      if (col.exports && Array.isArray(col.exports)) {
        col.exports.forEach((v: string) => {
          headers.push(tr(v));
        });
      }
    });
    const accessors: Array<string> = [];
    columns.forEach((col: any) => {
      accessors.push(col.dataIndex);
      if (col.exports && Array.isArray(col.exports)) {
        col.exports.forEach((v: string) => {
          accessors.push(tr(v));
        });
      }
    });
    const dataRow: Array<any> = [];
    data.forEach((dataItem) => {
      columns.forEach((col: any) => {
        const dataIndex = col.dataIndex;
        let value = dataItem[dataIndex];
        if (col.amountUnit && col?.amountUnit?.unit === 'fil') {
          value = formatFilNum(
            value,
            false,
            false,
            col?.amountUnit?.number || 2
          );
        }
        dataRow.push(value);
        if (col.exports && Array.isArray(col.exports)) {
          col.exports.forEach((v: string) => {
            const otherKey = v;
            let otherValue = dataItem[otherKey];
            if (col.amountUnit && col?.amountUnit?.unit === 'fil') {
              otherValue = formatFilNum(
                value,
                false,
                false,
                col?.amountUnit?.number || 2
              );
            }
            dataRow.push(otherValue);
          });
        }
      });
    });

    //const dataArray = data.map((row) => accessors.map((field) => row[field]));
    //dataArray.unshift(headers);

    const dataArray = [headers, dataRow];
    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: fileType });
    const showFileName = fileName
      ? fileName +
        formatDateTime(Number(new Date().getTime() / 1000), 'MM-DD HH:mm')
      : formatDateTime(Number(new Date().getTime() / 1000), 'MM-DD HH:mm');

    FileSaver.saveAs(blobData, showFileName + fileExtension);
  };

  return (
    <Button
      className='confirm_btn flex items-center gap-x-1'
      onClick={(e) => exportToCSV(columns, data, fileName)}>
      {getSvgIcon('downloadIcon')}
      <span>{tr('Export')}</span>
    </Button>
  );
};
export default ExportExcel;
