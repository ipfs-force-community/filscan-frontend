/** @format */

import { Option_Item } from '@/contents/type';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export default ({
  options,
  onChange,
  value,
  className = '',
  popupClassName='',
  border,
}: {
  value: string;
  className?: string;
  popupClassName?: string;
  border?: boolean;
  suffix?: JSX.Element;
  options: Array<Option_Item>;
  onChange: (value: string) => void;
}) => {
  const [new_options, setOptions] = useState<Array<Option_Item>>([]);

  useEffect(() => {
    setOptions(options || []);
  }, [options]);

  const handleChange = (value: string) => {
    onChange(value);
  };
  /*
  ${
        border ? 'border_select' : 'no_border_select'
        }
  */
  return (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      value={value}
      className={`custom_select ${className}`}
      popupClassName={'custom_select_wrapper'}
      filterOption={(input, option: any) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[...new_options]}
      onChange={handleChange}></Select>
  );
};
