import { Translation } from '@/components/hooks/Translation'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'
import { active_member_share } from '@/contents/account'

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
        closeIcon={false}
        wrapClassName="custom_modal noPaddingModal"
        open={show}
        width={460}
        footer={null}
        onCancel={() => {
          setShow(false)
        }}
      >
        <div className={style.share}>
          <div className={style.share_top}>
            <div className={style.share_content}>
              <div className={style.share_content_title}>
                {tr('account_title')}
              </div>
              <ul>
                {active_member_share.map((v: any, index: number) => {
                  return (
                    <li key={index} className={style.share_content_item}>
                      {v.icon}
                      {tr(v.title)}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className={style.share_bottom}></div>
        </div>
      </Modal>
    </div>
  )
}
