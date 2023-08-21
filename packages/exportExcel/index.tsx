/** @format */

import React, { FC } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { getSvgIcon } from '@/svgsIcon';
import { Translation } from '@/components/hooks/Translation';
import { formatDateTime } from '@/utils';

interface ExportToExcelProps {
  columns: { title: string; dataIndex: string }[];
  data: { [key: string]: any }[];
  fileName?: string;
}

const ExportExcel: FC<ExportToExcelProps> = ({ columns, data, fileName }) => {
  const { tr } = Translation({ ns: 'common' });

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (
    columns: {
      title: any;
      dataIndex: any;
    }[],
    data: { [key: string]: any }[],
    fileName?: string
  ) => {
    const headers = columns.map((col) => col.title);
    const accessors = columns.map((col) => col.dataIndex);

    const dataArray = data.map((row) => accessors.map((field) => row[field]));
    dataArray.unshift(headers);

    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: fileType });
    const showFileName =
      fileName ||
      formatDateTime(Number(new Date().getTime()), 'YYYY-MM-DD HH:mm');

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
