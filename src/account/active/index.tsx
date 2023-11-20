import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Detail from './detail'
import { active_member } from '@/contents/account'
import Copy from '@/components/copy'
import Share from './Share'
export default () => {
  const { tr } = Translation({ ns: 'account' })
  const code = 'test1123'
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
            {code} <Copy text={code} />
          </span>
        </div>
        <Share />
      </div>
    </div>
  )
}
