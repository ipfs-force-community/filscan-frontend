/** @format */

import PickDate from '@/packages/pickDate';
import { getSvgIcon } from '@/svgsIcon';
import { useState } from 'react';
import { message } from 'antd';

export default ({
  onChange,
}: {
  onChange: (start: string, end: string) => void;
}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleDateChange = (type: string, value: string) => {
    if (type === 'start') {
      setStartTime(value);
    } else if (type === 'end') {
      if (startTime && value > startTime) {
        setEndTime(value);
      } else {
        return message.warning('endTime must be greater than startTime');
      }
    }
    onChange(
      type === 'start' ? value : startTime,
      type === 'end' ? value : endTime
    );
  };

  return (
    <div className='flex items-center gap-x-2'>
      <PickDate onChange={(value) => handleDateChange('start', value)} />
      <span>{getSvgIcon('dateArrowIcon')}</span>
      <PickDate onChange={(value) => handleDateChange('end', value)} />
    </div>
  );
};
