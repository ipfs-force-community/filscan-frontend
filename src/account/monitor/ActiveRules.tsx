import { Translation } from "@/components/hooks/Translation";
import monitorStore from "@/store/modules/account/monitor";
import { Button, Modal, Switch } from "antd"
import { useMemo, useState } from "react";

export default ({ text,onChange,title }: { title:string ,text: boolean,onChange:()=>void}) => {
  const { tr } = Translation({ ns: 'account' });
  const [show, setShow] = useState(false);

  const handleClick = () => {
    onChange()
  }

  const content = useMemo(() => {
    if (title === 'isActive') {
      return '您确认改变这个规则状态吗？'
    } else if (title === 'edit_delete') {
      return '您确认删除这条规则吗？'
    }
  },[title])
  return <>
    {title === 'edit_delete' && <span className='text-primary cursor-pointer' onClick={() => setShow(true)}>{tr('edit_delete')}</span>}
    { title === 'isActive'&& <Switch className='custom_switch' checked={!!text} onChange={() => {setShow(true)}} />}
    <Modal
      title={`${tr('add_rules')}`}
      destroyOnClose={true}
      width={700}
      closeIcon={false}
      wrapClassName="custom_modal center_modal"
      open={show}
      onOk={handleClick}
      footer={[
        <Button className="cancel_btn" key='cancel_btn' >{ tr('cancel')}</Button>,
        <Button className="primary_btn" key='confirm_btn' onClick={handleClick}>{ tr('confirm')}</Button>
      ]}>
      <div>
        {content }
      </div>
    </Modal>
  </>

}