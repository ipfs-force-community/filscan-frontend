import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import style from './index.module.scss'
import { no_result } from '@/contents/home'
import Link from 'next/link'
import Image from 'next/image'
import searchLight from '@/assets/images/search_light.png'
import searchDark from '@/assets/images/search_dark.png'
import { useMemo } from 'react'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(() => {
  const router = useRouter()
  const { search } = router.query
  const { t } = useTranslation()
  const tr = (label: string): string => {
    return t(label, { ns: 'home' })
  }
  const { theme } = filscanStore

  const showImage = useMemo(() => {
    return theme === 'light' ? searchLight : searchDark
  }, [theme])

  return (
    <div
      style={{ marginTop: '3%' }}
      className={`main_contain flex flex-col items-center justify-center ${style.wrap}  !text-xl`}
    >
      <Image src={showImage} width={300} height={300} alt="" />
      <div className="font-medium">{tr(no_result.title)}</div>
      <div className="text_des mt-2 text-sm">{tr(no_result.warn_text)}</div>
      <div className={'mt-2  text-primary'}>{search}</div>
      {/* <div className='text_des mt-2.5'>
      { tr(no_result.warn_details)}
    </div> */}
      <Link className="primary_btn !mt-5 !px-5 !py-1 !text-base" href={'/home'}>
        {tr(no_result.go_home)}
      </Link>
    </div>
  )
})
