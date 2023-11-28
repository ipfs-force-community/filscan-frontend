import { Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'

export default () => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className={`${style.member_btn} ${style.member_btnShare}`}
        onClick={() => setShow(true)}
      >
        {tr('share_friend')}
      </div>
      <Modal
        title={tr('tg_title')}
        width={480}
        destroyOnClose={true}
        closeIcon={false}
        wrapClassName="custom_modal"
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
      >
        <div>444</div>
      </Modal>
    </>
  )
}
