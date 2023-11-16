import { Button, Modal } from 'antd'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import { member_list_1, member_list_2 } from '@/contents/user'
import LeftIcon from '@/assets/images/member/left.svg'

interface Props {
  showModal: boolean
  record?: Record<string, any>
  onChange: (type: string, value: any) => void
}

export default (props: Props) => {
  const { showModal, onChange } = props
  const { tr } = Translation({ ns: 'user' })

  return (
    <Modal
      title={``}
      width={880}
      destroyOnClose={true}
      closeIcon={false}
      wrapClassName="custom_modal noPaddingModal"
      open={showModal}
      onOk={() => onChange('cancel', false)}
      onCancel={() => onChange('cancel', false)}
      footer={null}
      //       footer={[
      //         <Button
      //           className="cancel_btn"
      //           key="cancel_btn"
      //           onClick={() => onChange('cancel', false)}
      //         >
      //           {tr('cancel')}
      //         </Button>,
      //         <Button
      //           className="primary_btn"
      //           key="primary_btn"
      //           onClick={() => onChange('cancel', false)}
      //         >
      //           {tr('confirm')}
      //         </Button>,
      //       ]}
    >
      <div className={style.member}>
        <div className={style.member_header}>{tr('member_header')}</div>
        <div className={style.content}>
          {member_list_1.map((item: any) => {
            return (
              <div key={item.title} className={style.content_card}>
                <div className={style.content_card_icon}>{item.icon}</div>
                <div className={style.content_card_title}>{tr(item.title)}</div>
                <div>{tr(item.value)}</div>
              </div>
            )
          })}
        </div>
        <div className={style.content}>
          {member_list_2.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`${style.content_card} ${style.content_newCard}`}
              >
                <ul className={`${style.content_newCard_main}`}>
                  {item.title.map((v: any) => {
                    return (
                      <li key={v.title} className={style.content_newCard_item}>
                        {v.icon}
                        <span>{tr(v.title)}</span>
                      </li>
                    )
                  })}
                </ul>
                <div className={style.content_newCard_text}>
                  <LeftIcon />
                  {tr(item.content)}
                  <LeftIcon />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
