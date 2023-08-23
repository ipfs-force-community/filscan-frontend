/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default ({
  onChange,
  timeType,
}: {
  onChange: (value: string) => void;
  timeType?: string;
}) => {
  function handleDateChange(date: any, dateString: string) {
    let showDate = date.format('YYYY-MM-DDTHH:mm:ssZ') || dateString;
    onChange(showDate);
  }
  return (
    <span className='custom_picker'>
      <span className='custom_picker_pre'>{getSvgIcon('dateIcon')}</span>
      <DatePicker
        bordered={false}
        showToday={false}
        className='custom_date_picker'
        popupClassName='custom_date_picker_wrap'
        suffixIcon={<span>{getSvgIcon('downIcon')}</span>}
        onChange={handleDateChange}
      />
    </span>
  );
};
