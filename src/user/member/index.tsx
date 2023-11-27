import { Modal } from 'antd'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import { member_list_1, member_list_2, member_main } from '@/contents/user'
import LeftIcon from '@/assets/images/member/left.svg'
import RightIcon from '@/assets/images/member/right.svg'
import { getSvgIcon } from '@/svgsIcon'
import { observer } from 'mobx-react'
import userStore from '@/store/modules/user'

export default observer(() => {
  const { vipModal } = userStore
  const { tr } = Translation({ ns: 'user' })

  return (
    <Modal
      title={``}
      width={880}
      destroyOnClose={true}
      closeIcon={false}
      wrapClassName="custom_modal noPaddingModal"
      open={vipModal}
      onOk={() => userStore.setVipModal(false)}
      onCancel={() => userStore.setVipModal(false)}
      footer={null}
    >
      <div className={style.member}>
        <div className={style.member_header}>
          {tr('member_header')}{' '}
          <span
            className={style.member_header_close}
            onClick={() => {
              userStore.setVipModal(false)
            }}
          >
            X
          </span>
        </div>
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
                  <RightIcon />
                </div>
              </div>
            )
          })}
        </div>
        <div className={style.member_content}>
          <div className={style.member_content_title}>
            <LeftIcon />
            {tr('member_content_title')}
            <RightIcon />
          </div>
          <div className={style.member_content_main}>
            {member_main.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`${style.member_item} ${
                    style[`member_item${index}`]
                  }`}
                >
                  <span className={style.member_item_icon}>
                    {getSvgIcon('memberBg')}
                  </span>
                  <div className={style.member_itemMain}>
                    <div className={`${style.member_item_card}`}>
                      {tr(item.title)}
                      {item.icon}
                    </div>
                    <ul className={style.member_item_list}>
                      {item.list.map((v: any) => {
                        return (
                          <li key={v.title} className={style.member_item_li}>
                            {v.icon}
                            {tr(v.title)}
                          </li>
                        )
                      })}
                    </ul>
                    <ul className={style.member_item_price}>
                      {item.priceList.map((priceItem: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className={style.member_item_priceItem}
                          >
                            <span>{tr(priceItem.title)}</span>
                            <span className={style.member_item_priceValue}>
                              {priceItem.discount && (
                                <span className={style.member_item_discount}>
                                  {tr(priceItem.discount)}
                                </span>
                              )}
                              <span className={style.member_item_value}>
                                {priceItem.price}
                              </span>
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={style.member_btns}>
          <div className={`${style.member_btn} ${style.member_btnShare}`}>
            {tr('share_friend')}
          </div>
          <div className={style.member_btn}>{tr('share_turn')}</div>
        </div>
      </div>
    </Modal>
  )
})