/** @format */

import { Translation } from '@/components/hooks/Translation';
import { proApi } from '@/contents/apiUrl';
import fetchData from '@/store/server';
import { Modal, Input, Button } from 'antd';
import { useState } from 'react';

export default ({
  show,
  onChange,
}: {
  show: boolean;
  onChange: (value: boolean) => void;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    //添加分组
    setLoading(true);
    const data = await fetchData(proApi.createGroup, { group_name: value });
    console.log('===45', data);
    setLoading(false);
    onChange(false);
  };

  return (
    <Modal
      width={400}
      title={tr('create_group')}
      open={show}
      destroyOnClose={true}
      closeIcon={false}
      footer={
        <span className='flex justify-center gap-x-4'>
          <Button className='cancel_btn'>{tr('cancel')}</Button>
          <Button
            className='confirm_btn'
            loading={loading}
            onClick={handleClick}>
            {tr('confirm')}
          </Button>
        </span>
      }>
      <Input
        className='mt-5 h-12'
        showCount
        placeholder={tr('create_group_holder')}
        maxLength={10}
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
      />
    </Modal>
  );
};
