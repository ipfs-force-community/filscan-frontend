import userStore from '@/store/modules/user'
import { Modal } from 'antd'
import style from './warn.module.scss'
import { getSvgIcon } from '@/svgsIcon'
import { active_member_share, member_main } from '@/contents/account'
import { Translation } from '@/components/hooks/Translation'
import BgMore from '@/assets/images/member/bgMore.svg'

import { observer } from 'mobx-react'
export default observer(() => {
  const { firstWarn } = userStore
  const item = member_main.EnterpriseVIP
  const { tr } = Translation({ ns: 'account' })
  return (
    <Modal
      title={``}
      width={420}
      destroyOnClose={true}
      closeIcon={false}
      wrapClassName="custom_modal noPaddingModal"
      open={firstWarn}
      onOk={() => userStore.setVipModal(false)}
      onCancel={() => userStore.setVipModal(false)}
      footer={null}
    >
      <div className={style.warnContent}>
        <div className={style.warn}>
          <span className={style.warn_icon}>{getSvgIcon('memberBg')}</span>
          <div
            className={style.warn_close}
            onClick={() => {
              userStore.setFirstWarn(false)
            }}
          >
            {getSvgIcon('closeIcon')}
          </div>
          <div className={style.warn_content}>
            <div className={style.warn_main}>
              <div className={style.warn_main_left}>
                <span className={style.warn_main_left_icon}>
                  <i className="icon icon-logo" />
                  <span>{tr('free_send')}</span>
                </span>

                <span>
                  7
                  <span className={style.warn_main_left_unit}>{tr('day')}</span>
                </span>
              </div>
              <div>{item.icon}</div>
            </div>
          </div>
          <ul className={style.warn_list}>
            {active_member_share.map((v: any, index: number) => {
              return (
                <li key={index} className={style.warn_list_item}>
                  {v.icon}
                  {tr(v.title)}
                </li>
              )
            })}
          </ul>
          <div className={style.warn_btn}>
            {tr('look_detail')}
            <span className={style.warn_btn_icon}>
              <BgMore />
              <span className={style.warn_btn_icon_text}>
                {tr('look_detail_member')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
})
