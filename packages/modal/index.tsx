/** @format */

import { Translation } from '@/components/hooks/Translation';
import { Button, Modal } from 'antd';

interface ModalProps {
  show: boolean;
  title?: string;
  children: JSX.Element;
  loading?: boolean;
  onCancel?: (e: any) => void;
  onOk?: (e: any) => void;
  [key: string]: any;
}

export default (props: ModalProps) => {
  const { title, children, show, onCancel, loading, onOk } = props;

  const { tr } = Translation({ ns: 'common' });

  return (
    <Modal
      {...props}
      title={title}
      open={show}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose={true}
      className='custom_modal'
      wrapClassName='custom_modal_wrapper'
      footer={[
        <Button className='cancel_btn' onClick={onCancel}>
          {tr('cancel')}
        </Button>,
        <Button className='confirm_btn' loading={loading} onClick={onOk}>
          {tr('confirm')}
        </Button>,
      ]}>
      {children}
    </Modal>
  );
};
