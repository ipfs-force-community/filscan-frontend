/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { DatePicker } from 'antd';

export default ({ onChange }: { onChange: (value: string) => void }) => {
  function handleDateChange(date: any, dateString: string) {
    //console.log('---3', date, date, dateString);
    onChange(dateString);
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
