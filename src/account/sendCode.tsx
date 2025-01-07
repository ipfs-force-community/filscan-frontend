/** @format */

import { Translation } from '@/components/hooks/Translation'
import { useCountdown } from '@/components/hooks/useCount'
import { proApi } from '@/contents/apiUrl'
import fetchData from '@/store/server'
import { isEmail } from '@/utils'
import userStore from '@/store/modules/user'

// 在组件中使用自定义hook
function VerifyCodeButton({
  mail,
  onChange,
}: {
  mail: string
  onChange?: (token: string) => void
}) {
  const { tr } = Translation({ ns: 'common' })
  const { count, resetCountdown } = useCountdown(0)

  // 模拟发送验证码的函数
  const sendCode = async (e: any) => {
    // 假设验证码发送后，倒计时60秒
    if (mail && isEmail(mail)) {
      resetCountdown(60) // 证码有效期为60秒
      userStore.getVerifyCode(mail)
      // if (result?.token) {
      //   localStorage.setItem('send_code', result.token)
      //   if (onChange) onChange(result?.token)
      // }
    }
    e.preventDefault()
  }

  return (
    <button
      className="text_primary border_color cursor-pointer border-s pl-2 text-sm"
      disabled={count > 0}
      onClick={sendCode}
    >
      {count > 0 ? `${tr('retry_code')}(${count})` : tr('get_code')}
    </button>
  )
}

export default VerifyCodeButton
