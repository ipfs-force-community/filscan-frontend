/** @format */

import Image from 'next/image'
import { navMenu } from '@/contents/nav'
import { Translation } from '@/components/hooks/Translation'
import Link from 'next/link'
import Search from './Search'
import { useRouter } from 'next/router'
import { getSvgIcon } from '@/svgsIcon'

export default () => {
  const { tr } = Translation({ ns: 'nav' })
  const router = useRouter()

  const renderChild = (children: Array<any>, num: number) => {
    return (
      <ul
        key={num}
        className="select_shadow main_bg_color border_color absolute inset-y-full z-50 -ml-8 hidden h-fit  w-max list-none rounded-[5px] border px-4  font-HarmonyOS  group-hover:block"
      >
        {children.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${item.link}`}
              className="text_color relative flex h-10 cursor-pointer items-center rounded-[5px] font-normal  first:mt-4 last:mb-4 hover:bg-bg_hover hover:text-primary"
            >
              <span className="px-4">{tr(item.key)}</span>
              {item.sufIcon && (
                <span className="absolute -right-2 -top-[2px]">
                  {getSvgIcon(item.sufIcon)}
                </span>
              )}
            </Link>
          )
        })}
      </ul>
    )
  }

  const isHome = router.asPath === '/home' || router.asPath === '/'

  return (
    <div className="custom_header m-auto flex h-[60px] items-center justify-between  text-sm font-medium">
      <Link
        href={'/'}
        className="text_color mt-1 flex cursor-pointer items-center gap-x-2"
      >
        <Image
          src={
            'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logo.png'
          }
          width={40}
          height={40}
          alt="logo"
        />
        {/* {getSvgIcon('logoText')} */}
        <Image
          src={
            'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logoText.png'
          }
          alt="logo"
          width={95}
          height={16}
        ></Image>
        {/* <span className='font-Barlow font-bold text-xl '>Filscan</span> */}
      </Link>
      <div className="ml-5 mr-10 flex-1">
        {!isHome && <Search className="!h-10 !max-w-lg	" />}
      </div>

      <div className="relative flex h-full items-center justify-between gap-x-9">
        {navMenu.map((nav, index) => {
          if (nav?.children) {
            return (
              <div
                key={index}
                className="group relative flex  h-full cursor-pointer items-center gap-x-1  font-HarmonyOS_Medium hover:text-primary "
              >
                {tr(nav.key)}
                <span>{getSvgIcon('downIcon')}</span>
                {nav.sufIcon && (
                  <span className="absolute -right-[12px] top-[8px]">
                    {getSvgIcon(nav.sufIcon)}
                  </span>
                )}
                {renderChild(nav.children, index)}
              </div>
            )
          }
          if (nav.outLink) {
            return (
              <div
                className="relative"
                key={nav.key}
                onClick={() => {
                  window?.open(nav.outLink)
                }}
              >
                <li className="text_color cursor-pointer list-none  hover:text-primary">
                  {tr(nav.key)}
                </li>
                {nav.sufIcon && (
                  <span className="absolute -right-6 -top-[8px]">
                    {getSvgIcon(nav.sufIcon)}
                  </span>
                )}
              </div>
            )
          }
          return (
            <div className="relative" key={nav.key}>
              <Link
                href={`${nav.link || nav.outLink}`}
                className="text_color cursor-pointer  hover:text-primary"
              >
                {tr(nav.key)}
              </Link>
              {nav.sufIcon && (
                <span className="absolute -right-6 -top-[8px]">
                  {getSvgIcon(nav.sufIcon)}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
