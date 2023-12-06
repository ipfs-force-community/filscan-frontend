import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Detail from './detail'
import { active_member, active_member_list } from '@/contents/account'
import Share from './Share'
import copy from 'copy-to-clipboard'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/modules/user'
import Table from '@/packages/Table'
import { useEffect, useMemo, useState } from 'react'
import { Button, message } from 'antd'
import Image from 'next/image'
import filscanStore from '@/store/modules/filscan'
import active_zh from '@/assets/images/member/member_Zh.jpg'
import active_en from '@/assets/images/member/member_en.jpg'
import active_kr from '@/assets/images/member/member_kr.jpg'

export default observer(() => {
  const { inviteCode, recordList, userInfo } = userStore
  const { lang } = filscanStore
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  const columns = useMemo(() => {
    return active_member_list(tr).map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [tr])

  const handleCopy = (value: string) => {
    copy(value)
    return message.success('Clipboard Successfully')
  }
  const showSrc = useMemo(() => {
    if (lang === 'zh') {
      return active_zh
    } else if (lang === 'kr') {
      return active_kr
    }
    return active_en
  }, [lang])

  return (
    <div className={`${style.active}`}>
      <div className={style.active_header}>
        <Image src={showSrc} alt="" />
      </div>
      <div className={style.active_title}>
        {tr('active_rule')} <Detail />
      </div>
      <div className={style.active_content}>
        {active_member.map((v: any, index: number) => {
          return (
            <>
              <div
                key={index}
                className={`${style.active_content_item} ${
                  !v.title ? style.active_content_otherItem : ''
                }`}
              >
                <div className={style.active_content_item_image}>{v.icon}</div>
                {/* <div>{tr(v.title)}</div> */}
                <div className={style.active_des}>{tr(v.des)}</div>
              </div>
            </>
          )
        })}
      </div>
      <div className={style.active_share}>
        <div className={style.active_share_item}>
          <span className={style.active_des}>{tr('invite_code')}</span>
          <ul className={style.active_value}>
            {inviteCode?.split('')?.map((v, index: number) => {
              return (
                <li className={style.active_value_code} key={index}>
                  {v}
                </li>
              )
            })}
            <span
              className={`${style.active_value_code} ${style.active_value_copy}`}
              onClick={() => handleCopy(inviteCode)}
            >
              {tr('copy')}
            </span>
            {/* <Copy text={inviteCode} /> */}
          </ul>
        </div>
        <div>
          <div className={style.send}>
            <Button className="active_btn" onClick={() => setShow(true)}>
              {tr('active_share')}
            </Button>
            <span className={style.send_icon}>{tr('send_member')}</span>
          </div>
          <Share
            inviteCode={inviteCode}
            show={show}
            onChange={(value: boolean) => {
              setShow(value)
            }}
          />
        </div>
      </div>
      <div className="card_shadow border_color  mt-4 rounded-xl	border p-5">
        <Table
          className="-mt-2.5 "
          data={recordList}
          columns={columns}
          loading={false}
        />
      </div>
    </div>
  )
})

//xdympqfl
