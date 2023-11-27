import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Detail from './detail'
import { active_member, active_member_list } from '@/contents/account'
import Copy from '@/components/copy'
import Share from './Share'
import { observer } from 'mobx-react-lite'
import userStore from '@/store/modules/user'
import Table from '@/packages/Table'
import { useMemo } from 'react'
export default observer(() => {
  const { userInfo, recordList } = userStore
  const { tr } = Translation({ ns: 'account' })
  const columns = useMemo(() => {
    return active_member_list(tr).map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [tr])

  return (
    <div className={`${style.active}`}>
      <div className={style.active_header}>ddd</div>
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
                {v.icon}
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
            {userInfo?.inviteCode} <Copy text={userInfo?.inviteCode} />
          </span>
        </div>
        <Share />
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
