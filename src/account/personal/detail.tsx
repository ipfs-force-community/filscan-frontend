import { Translation } from '@/components/hooks/Translation'
import userStore from '@/store/modules/user'
import { Modal, Popover } from 'antd'
import style from './index.module.scss'
import { useMemo, useState } from 'react'
import { member_main } from '@/contents/account'
import { getSvgIcon } from '@/svgsIcon'
export default () => {
  const { userInfo, memberWarn } = userStore
  const { membership_type } = userInfo
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  const item = useMemo(() => {
    return member_main[membership_type]
  }, [membership_type])

  const content = (
    <div className={`${style.member_card} `}>
      <div
        className={`${style.member_item} ${
          style[`member_item_${membership_type}`]
        }`}
      >
        <span className={style.member_item_icon}>{getSvgIcon('memberBg')}</span>
        <div className={style.member_itemMain}>
          <div className={style.member_itemMain_card}>
            <div className={style.member_itemMain_card_header}>
              <div className={`${style.member_item_card}`}>
                {tr(item?.title)}
                <span className={style.member_itemMain_card_icon}>
                  {item?.icon}
                </span>
              </div>
            </div>
            <ul className={style.member_item_list}>
              {item?.list?.map((v: any) => {
                return (
                  <li key={v.title} className={style.member_item_li}>
                    {v.icon}
                    {tr(v.title)}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={style.detail}>
      <Popover
        content={content}
        title={''}
        open={true}
        placement="left"
        overlayClassName="noPadding_popover"
      >
        <span className={style.detail_title}>{tr('look_more')}</span>
      </Popover>
    </div>
  )
}
