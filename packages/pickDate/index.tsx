/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

interface Props {
  onChange: (value: string) => void;
  timeType?: string;
  defaultValue?: string;
  [key: string]: any;
}

export default (props: Props) => {
  const { onChange, timeType, defaultValue } = props;
  function handleDateChange(date: any, dateString: string) {
    let showDate = date.format('YYYY-MM-DDTHH:mm:ssZ') || dateString;
    onChange(showDate);
  }
  const validRange = {
    startDate: dayjs().subtract(30, 'days'),
    endDate: dayjs(),
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    // Can not select days before today and today

    // if (!dates) {
    //   return false;
    // }
    // const tooLate = startTime && current.diff(startTime, 'days') >= 30;
    // const tooEarly = endTime && current.diff(current, 'days') >= 7;
    // return !!tooEarly || !!tooLate;

    return (
      current &&
      (current < dayjs().subtract(30, 'day') || current > dayjs().endOf('day'))
    );
  };

  return (
    <span className='custom_picker'>
      <span className='custom_picker_pre'>{getSvgIcon('dateIcon')}</span>
      <DatePicker
        bordered={false}
        showToday={false}
        disabledDate={disabledDate}
        defaultValue={dayjs(defaultValue, 'YYYY-MM-DD')}
        className='custom_date_picker'
        popupClassName='custom_date_picker_wrap'
        suffixIcon={<span>{getSvgIcon('downIcon')}</span>}
        onChange={handleDateChange}
      />
    </span>
  );
};
