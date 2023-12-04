/** @format */

import { Translation } from '@/components/hooks/Translation'
import Logo from '@/assets/images/logo.svg'
import UserIcon from '@/assets/images/user.svg'
import userStore from '@/store/modules/user'
import { formatDateTime } from '@/utils'
import { Input } from 'antd'
import { useState } from 'react'
import { getSvgIcon } from '@/svgsIcon'
import { observer } from 'mobx-react'
import { personal_list } from '@/contents/user'

export default observer(() => {
  const { tr } = Translation({ ns: 'account' })
  const { userInfo, showMemberWarn } = userStore
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')

  const handleSaveName = async () => {
    setEdit(false)
    // const result = await axiosData(proApi.updateInfo, {
    //   name,
    // })
    // if (result) {
    //   messageManager.showMessage({
    //     type: 'success',
    //     content: 'Update successful',
    //   })
    // }
  }

  return (
    <>
      <p className="font-HarmonyOS text-lg font-semibold">
        {tr('personal')}
        {showMemberWarn && (
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
              {/* <span className="text_des text-xs">{userInfo.mail}</span> */}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="des_bg_color flex w-fit gap-x-2 rounded-[5px] px-[6px] py-1">
              <UserIcon width={20} height={20} />
              <span>{tr('default_user')}</span>
            </span>
            <span className="text_des mt-2 text-xs ">
              <span className="mr-2">{tr('last_login')}:</span>
              {formatDateTime(userInfo.last_login)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        {personal_list.map((v: any, index: number) => {
          return (
            <div
              key={index}
              className="card_shadow border_color w-fit flex-1 rounded-xl p-5"
            >
              <span>{tr(v.title)}</span>
            </div>
          )
        })}
      </div>
    </>
  )
})
