/** @format */

import { Option_Item } from '@/contents/type';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export default ({
  options,
  onChange,
  value,
}: {
  value: string;
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
      value={active}
      className='custom_select'
      popupClassName={'custom_select'}
      placeholder='Search to Select'
      optionFilterProp='children'
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA: { label: any }, optionB: { label: any }) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
      onChange={handleChange}
    />
  );
};
