/** @format */

import { Translation } from '@/components/hooks/Translation';
import { proApi } from '@/contents/apiUrl';
import useAxiosData from '@/store/useAxiosData';
import { Modal, Input, Button } from 'antd';
import { useState } from 'react';
import { useGroupsStore } from '../content';

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
  const { axiosData } = useAxiosData();
  const { setGroups } = useGroupsStore();

  const handleClick = async () => {
    //添加分组
    // onChange(value);
    setLoading(true);
    const data = await axiosData(proApi.saveGroup, { group_name: value });
    const newGroups = await axiosData(proApi.getGroups);
    setGroups(newGroups?.group_info_list || []);
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
        <span className='flex justify-center gap-x-4 mt-5'>
          <Button
            className='cancel_btn'
            onClick={() => {
              onChange(false);
            }}>
            {tr('cancel')}
          </Button>
          <Button
            className='confirm_btn'
            loading={loading}
            onClick={handleClick}>
            {tr('confirm')}
          </Button>
        </span>
      }>
      <Input
        className='mt-5 custom_input h-12'
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
