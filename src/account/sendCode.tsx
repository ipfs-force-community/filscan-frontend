/** @format */

import { Translation } from '@/components/hooks/Translation';
import { useCountdown } from '@/components/hooks/useCount';
import { proApi } from '@/contents/apiUrl';
import fetchData from '@/store/server';

// 在组件中使用自定义hook
function VerifyCodeButton({
  mail,
  onChange,
}: {
  mail: string;
  onChange?: (token: string) => void;
}) {
  const { tr } = Translation({ ns: 'common' });
  const { count, resetCountdown } = useCountdown(0);

  function validateEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // 模拟发送验证码的函数
  const sendCode = async () => {
    // 假设验证码发送后，倒计时60秒
    if (mail && validateEmail(mail)) {
      const result: any = await fetchData(proApi.send_code, { mail: mail });
      if (result?.token) {
        if (onChange) onChange(result?.token);
        //token 存入localStorage
        // localStorage.setItem('token',result.token)
      }
    } else {
    }
  };

  return (
    <button
      className='text_primary text-sm border-s pl-2 cursor-pointer'
      disabled={count > 0}
      onClick={sendCode}>
      {count > 0 ? `${tr('retry_code')}(${count})` : tr('get_code')}
    </button>
  );
}

export default VerifyCodeButton;
