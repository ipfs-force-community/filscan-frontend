import { Modal } from "antd"

interface Props {
              showModal: boolean;
              onChange:(type:string,value:any)=>void;
}
export default (props: Props) => {
  const { showModal,onChange } = props;
  const handleChange = () => { }
  return <Modal title="Basic Modal" open={showModal} onOk={handleChange} onCancel={()=>onChange('cancel',false)} >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
}