import { Translation } from '@/components/hooks/Translation'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'

export default () => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  return (
    <div className={style.detail}>
      <Button className="active_btn" onClick={() => setShow(true)}>
        {tr('active_share')}
      </Button>
      <Modal
        destroyOnClose={true}
        width={700}
        closeIcon={false}
        wrapClassName="custom_modal"
        open={show}
        footer={null}
        onCancel={() => {
          setShow(false)
        }}
      >
        <div>
          <div className={style.detail_header}>
            {tr('rule_detail')}
            <span
              className={style.detail_header_close}
              onClick={() => {
                setShow(false)
              }}
            >
              X
            </span>
          </div>
          <p>{tr('rule_content')}</p>
          <div></div>
        </div>
      </Modal>
    </div>
  )
}
