import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Detail from './detail'
import { active_member, active_member_list } from '@/contents/account'
import Copy from '@/components/copy'
import Share from './Share'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/modules/user'
import Table from '@/packages/Table'
import { useMemo, useState } from 'react'
import { Button } from 'antd'
import Image from 'next/image'
import active_zh from '@/assets/images/member/active_zh.jpg'
import active_kr from '@/assets/images/member/active_kr.jpg'
import active_en from '@/assets/images/member/active_en.jpg'
import filscanStore from '@/store/modules/filscan'

export default observer(() => {
  const { inviteCode, recordList } = userStore
  const { lang } = filscanStore
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)

  const columns = useMemo(() => {
    return active_member_list(tr).map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [tr])

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
                <div>{tr(v.title)}</div>
                <div className={style.active_des}>{tr(v.des)}</div>
              </div>
            </>
          )
        })}
      </div>
      <div className={style.active_share}>
        <div className={style.active_share_item}>
          <span className={style.active_des}>{tr('invite_code')}</span>
          <span className={style.active_value}>
            {inviteCode} <Copy text={inviteCode} />
          </span>
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
