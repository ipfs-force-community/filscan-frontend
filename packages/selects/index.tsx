/** @format */

import { Option_Item } from '@/contents/type';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export default ({
  options,
  onChange,
  value,
  className = '',
  border,
  suffix,
}: {
  value: string;
  className?: string;
  border?: boolean;
  suffix?: JSX.Element;
  options: Array<Option_Item>;
  onChange: (value: string) => void;
}) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(value);
  }, [value]);

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      className={`custom_select ${
        border ? 'border_select' : 'no_border_select'
      } ${className}`}
      popupClassName={'custom_select_wrapper'}
      filterOption={(input, option: any) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      onSearch={handleChange}>
      {/* {options?.map((item) => {
        return (
          <Select.Option key={item.value} value={item.value} label={item.label}>
            {item.label}
          </Select.Option>
        );
      })}
      {suffix && (
        <Select.Option
          className={'custom_options_item'}
          value={'suffix'}
          style={{ pointerEvents: 'none' }}>
          {suffix}
        </Select.Option>
      )} */}
    </Select>
  );
};
