/** @format */

import { Translation } from '@/components/hooks/Translation'
import AuthorIcon from '@/assets/images/author.svg'
import DownIcon from '@/assets/images/down.svg'
import { account_manager } from '@/contents/account'
import Link from 'next/link'
import { useRouter } from 'next/router'
import userStore from '@/store/modules/user'
import { observer } from 'mobx-react'

//已登录状态
export default observer(() => {
  const { tr } = Translation({ ns: 'account' })
  const { userInfo } = userStore
  const { superVip } = userInfo
  const { name, mail } = userInfo
  const router = useRouter()
  const showName = name || mail || ''

  if (!showName) {
    return (
      <Link href="/admin/login" as="/admin/login" scroll={false}>
        <span className="border_color main_bg_color primary_btn flex  h-[46px] items-center  justify-center !rounded-none border">
          {tr('login')}
        </span>
      </Link>
    )
  }
  return (
    <div className="group relative text-sm">
      <div className=" flex cursor-pointer items-center gap-x-2">
        <AuthorIcon width={32} height={32} className="rounded-full" />
        <span>
          {showName?.length > 5 ? showName?.slice(0, 5) + '...' : showName}
        </span>
        <DownIcon width={8} height={4} />
      </div>
      <ul className="select_shadow main_bg_color border_color absolute inset-y-full z-50 hidden h-fit  w-max  list-none rounded-[5px] border p-4  group-hover:block">
        {account_manager.map((item, index) => {
          if (!item?.href) {
            return null
          }
          if (item.key === 'logout') {
            return (
              <li
                key={index}
                onClick={() => {
                  //logout
                  localStorage.removeItem(`mail`)
                  localStorage.removeItem(`token-${mail}`)
                  userStore.clearUserInfo()
                  router.push('/admin/login')
                }}
                className="text_color  flex h-10 cursor-pointer items-center rounded-[5px] font-normal  hover:bg-bg_hover hover:text-primary"
              >
                <span className="flex items-center gap-x-2 px-4">
                  {item.icon}
                  {tr(item.label)}
                </span>
              </li>
            )
          }
          if (item.vip) {
            return (
              <li
                key={index}
                onClick={() => {
                  //vip
                  if (!superVip) {
                    userStore.setVipModal(true)
                  } else {
                    router.push(`/account/#${item.href}`)
                  }
                }}
                className="text_color  flex h-10 cursor-pointer items-center rounded-[5px] font-normal  hover:bg-bg_hover hover:text-primary"
              >
                <span className="flex items-center gap-x-2 px-4">
                  {item.icon}
                  {tr(item.label)}
                </span>
              </li>
            )
          }
          return (
            <Link
              key={index}
              href={`/account/#${item.href}`}
              scroll={false}
              className="text_color  flex h-10 cursor-pointer items-center rounded-[5px] font-normal  hover:bg-bg_hover hover:text-primary"
            >
              <span className="flex items-center gap-x-2 px-4">
                {item.icon}
                {tr(item.label)}
                {item.sufIcon}
              </span>
            </Link>
          )
        })}
      </ul>
    </div>
  )
})
