import { Translation } from '@/components/hooks/Translation'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'

export default () => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  return (
    <div className={style.detail}>
      <div className={style.send}>
        <Button className="active_btn" onClick={() => setShow(true)}>
          {tr('active_share')}
        </Button>
        <span className={style.send_icon}>{tr('send_member')}</span>
      </div>
      <Modal
        destroyOnClose={true}
        width={416}
        closeIcon={false}
        wrapClassName="custom_modal noPaddingModal"
        open={show}
        footer={null}
        onCancel={() => {
          setShow(false)
        }}
      >
        <div className={style.share}>
          <div className={style.share_top}>
            <div>{tr('account_title')}</div>
          </div>
          <div className={style.share_bottom}></div>
        </div>
      </Modal>
    </div>
  )
}
