/** @format */

import { Translation } from '@/components/hooks/Translation'
import Logo from '@/assets/images/logo.svg'
import userStore from '@/store/modules/user'
import { formatDateTime } from '@/utils'
import { Input } from 'antd'
import { useState } from 'react'
import { getSvgIcon } from '@/svgsIcon'
import { observer } from 'mobx-react'
import { userType, vipList } from '@/contents/account'
import passwordPng from '@/assets/images/member/password.png'
import emailPng from '@/assets/images/member/email.png'
import style from './index.module.scss'
import Vip from '@/assets/images/member/vip.svg'
import Detail from './detail'
import Image from 'next/image'
import ResetPassword from './resetPassword'
import { tree } from 'd3'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' })
  const { userInfo, memberWarn } = userStore
  const { membership_type, mail } = userInfo
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)

  const handleSaveName = async () => {
    setEdit(false)
  }
  return (
    <div className="mb-50">
      <p className="font-HarmonyOS text-lg font-semibold">
        {tr('personal')}
        {memberWarn && (
          <span
            className=" ml-4 cursor-pointer text-xs font-normal text-warnColor"
            onClick={() => {
              userStore.setVipModal(true)
            }}
          >
            <i className="ri-error-warning-line mr-1"></i>
            {tr('member_warn')}
          </span>
        )}
      </p>
      <div className="card_shadow border_color mt-8 rounded-xl border p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <Logo width={60} height={60} />
            <div className="flex flex-col justify-start ">
              <div className="flex items-center gap-x-2">
                {edit ? (
                  <Input
                    defaultValue={userInfo.name}
                    showCount={true}
                    maxLength={10}
                    onChange={(e: any) => setName(e.target.value)}
                    onPressEnter={handleSaveName}
                    onBlur={handleSaveName}
                  />
                ) : (
                  <span className="font-HarmonyOS text-xl font-semibold ">
                    {name || userInfo.name}
                  </span>
                )}
                <span className="cursor-pointer" onClick={() => setEdit(true)}>
                  {getSvgIcon('edit')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={style.membership_card}>
              <span
                className={`${style.membership_card} ${
                  style[`membership_card_${membership_type}`]
                }`}
              >
                {userType[membership_type]?.icon}
                <span>{tr(userType[membership_type]?.title)}</span>
              </span>
              {vipList.includes(membership_type) && <Detail />}
            </span>

            <span className="text_des mt-2 text-xs">
              <span className="mr-2">{tr('last_login')}:</span>
              {formatDateTime(userInfo.last_login)}
            </span>
          </div>
        </div>
      </div>
      <div className={style.personal_list}>
        <div
          className={`${style.personal_list_item} ${
            style[`personal_list_item_member`]
          }`}
          onClick={() => {
            userStore.setVipModal(true)
          }}
        >
          <span className={`${style.personal_list_icon}`}>
            {getSvgIcon('memberBg')}
          </span>
          <span className={style.personal_list_title}>
            <Vip width={20} height={25} />
            {tr('personal_1')}
          </span>
          <span className={style.personal_list_des}>
            {`${tr('member_expired_time', {
              value: formatDateTime(userInfo.expired_time, 'YYYY-MM-DD'),
            })}`}
          </span>
        </div>

        <div
          className={`${style.personal_list_item}`}
          onClick={() => {
            setShow(true)
          }}
        >
          <span className={`${style.personal_list_icon}`}>
            {getSvgIcon('member_icon_logo')}
          </span>
          <span className={style.personal_list_title}>
            <Image src={passwordPng} alt="" width={20} height={25} />
            {tr('personal_3')}
          </span>
        </div>

        <div
          className={`${style.personal_list_item} ${style.personal_list_value}`}
        >
          <span className={`${style.personal_list_icon}`}>
            {getSvgIcon('member_icon_logo')}
          </span>
          <span className={style.personal_list_text}>{mail}</span>
          <span className={style.personal_list_text}>
            {getSvgIcon('successIcon')}
            {tr('mail_success')}
          </span>
        </div>
        <div
          className={`${style.personal_list_item} ${style.personal_list_value}`}
        >
          <span className={`${style.personal_list_icon}`}>
            {getSvgIcon('member_icon_logo')}
          </span>
          <span className={style.personal_list_title}>Coming soon</span>
        </div>
      </div>
      <ResetPassword
        show={show}
        onChange={(value) => {
          setShow(value)
        }}
      />
    </div>
  )
})
