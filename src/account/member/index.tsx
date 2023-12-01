import { Modal } from 'antd'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import { member_list_1, member_list_2, member_main } from '@/contents/account'
import LeftIcon from '@/assets/images/member/left.svg'
import RightIcon from '@/assets/images/member/right.svg'
import Vip from '@/assets/images/member/vip.svg'
import { getSvgIcon } from '@/svgsIcon'
import { observer } from 'mobx-react'
import userStore from '@/store/modules/user'
import iconBg from '@/assets/images/member/member_bg.png'
import AddTG from './addTg'
import Image from 'next/image'
import Share from '../active/Share'
import { useState } from 'react'

export default observer(() => {
  const { vipModal } = userStore
  const { tr } = Translation({ ns: 'account' })
  const { inviteCode } = userStore
  const [show, setShow] = useState(false)
  return (
    <Modal
      title={``}
      width={880}
      destroyOnClose={true}
      closeIcon={false}
      wrapClassName="custom_modal noPaddingModal LagerModal"
      open={vipModal}
      onOk={() => userStore.setVipModal(false)}
      onCancel={() => userStore.setVipModal(false)}
      footer={null}
    >
      <div className={style.memberContent}>
        <div className={style.member}>
          <div className={style.member_header}>
            {tr('member_header')}
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
                  <div className={style.content_card_title}>
                    {tr(item.title)}
                  </div>
                  <div>{tr(item.value)}</div>
                </div>
              )
            })}
          </div>
          <div className={style.member_content_title}>
            {tr('member_warn_title')}
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
                        <li
                          key={v.title}
                          className={style.content_newCard_item}
                        >
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
          <div className={`${style.member_content}`}>
            <div className={`${style.member_content_title}`}>
              {/* <LeftIcon /> */}
              {tr('member_content_title')}
              {/* <RightIcon /> */}
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
                      <div className={style.member_itemMain_card}>
                        <div className={style.member_itemMain_card_header}>
                          <div className={`${style.member_item_card}`}>
                            {tr(item.title)}
                            <span className={style.member_itemMain_card_icon}>
                              {item.icon}
                            </span>
                          </div>
                          {index === 1 && (
                            <Image
                              className={style.member_itemMain_card_iconBg}
                              src={iconBg}
                              alt=""
                            />
                          )}
                        </div>
                        <ul className={style.member_item_list}>
                          {item.list.map((v: any) => {
                            return (
                              <li
                                key={v.title}
                                className={style.member_item_li}
                              >
                                {v.icon}
                                {tr(v.title)}
                              </li>
                            )
                          })}
                        </ul>
                        <ul className={style.member_item_price}>
                          {item.priceList.map(
                            (priceItem: any, index: number) => {
                              return (
                                <li
                                  key={index}
                                  className={style.member_item_priceItem}
                                >
                                  <span>{tr(priceItem.title)}</span>
                                  <span
                                    className={style.member_item_priceValue}
                                  >
                                    {priceItem.discount && (
                                      <span
                                        className={style.member_item_discount}
                                      >
                                        {tr(priceItem.discount)}
                                      </span>
                                    )}
                                    <span className={style.member_item_value}>
                                      {priceItem.price}
                                    </span>
                                  </span>
                                </li>
                              )
                            },
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`${style.member_btns} ${style.memberContent_btns}`}>
          <div
            className={`${style.member_btn} ${style.member_btnShare}`}
            onClick={() => {
              setShow(true)
            }}
          >
            <Vip />
            {tr('share_friend')}
          </div>
          <Share
            inviteCode={inviteCode}
            show={show}
            onChange={(value) => {
              setShow(value)
            }}
          />
          <AddTG />
        </div>
      </div>
    </Modal>
  )
})
