import { Translation } from "@/components/hooks/Translation";
import monitorStore from "@/store/modules/account/monitor";
import { Button, Modal, Switch } from "antd"
import { useState } from "react";

export default ({ text,record }: { text: boolean,record:any }) => {
  const { tr } = Translation({ ns: 'account' });
  const [show, setShow] = useState(false);

  const handleClick = () => {
    monitorStore.ruleActive({
      UUID:record.UUID,

    },record.monitorType)
  }

  return <>
    <Switch className='custom_switch' checked={!!text} onChange={() => {setShow(true)}} />
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
          您确认改变这个规则状态吗？
      </div>
    </Modal>
  </>

}