/** @format */

import Success from '@/assets/images/success.svg'
import { Translation } from '@/components/hooks/Translation'
import { useRouter } from 'next/router'

export default ({
  type = '',
  text,
  btnText,
}: {
  type?: string
  btnText: string
  text: string
}) => {
  const { tr } = Translation({ ns: 'account' })
  const router = useRouter()

  const handleClick = () => {
    router.push('/home')
  }

  return (
    <div className="main_bg_color m-auto mt-5 flex flex-col items-center rounded-[5px] px-5 pb-5 pt-12">
      <Success width={80} height={80} />
      <span className="font-HarmonyOS mt-5 text-lg font-semibold">
        {tr('welcome')}
      </span>
      <div className="text_des mt-5 flex flex-col items-center gap-y-1 text-xs">
        {text ? (
          <span>
            <span>{tr(text)}</span>
          </span>
        ) : (
          <>
            <span>{tr('welcome_text1')}</span>
            <span>{tr('welcome_text2')}</span>
          </>
        )}
      </div>
      <div className="mt-5 flex items-center gap-x-5">
        {/* {type !== 'login' && (
          <Link
            href={'/admin/login'}
            className='border border_color rounded-[5px] px-4 py-2'>
            {tr('go_login')}
          </Link>
        )} */}
        <div
          onClick={handleClick}
          className="primary_btn cursor-pointer border px-4 py-2"
        >
          {tr(btnText)}
        </div>
      </div>
    </div>
  )
}
