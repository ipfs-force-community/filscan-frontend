import { Translation } from '@/components/hooks/Translation'
import { Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'
import { active_member_detail } from '@/contents/account'
import { getSvgIcon } from '@/svgsIcon'

export default () => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  return (
    <div className={style.detail}>
      <span className={style.detail_title} onClick={() => setShow(true)}>
        {tr('active_detail')}
      </span>
      <Modal
        destroyOnClose={true}
        width={400}
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
            {tr('active_rule_detail')}
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
          <div className={style.detail_content}>
            <span className={style.detail_content_icon}>
              {getSvgIcon('memberBg')}
            </span>
            <div className={style.detail_content_title}>
              {tr('active_member')}:
            </div>
            <ul className={style.detail_ul}>
              {active_member_detail.map((v, index) => {
                return (
                  <li key={index} className={style.detail_content_item}>
                    {v.icon}
                    {tr(v.des)}{' '}
                  </li>
                )
              })}
            </ul>
          </div>
          <p className={style.detail_expired}>{tr('active_expired')}</p>
        </div>
      </Modal>
    </div>
  )
}
