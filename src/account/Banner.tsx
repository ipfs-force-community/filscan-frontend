import { fvmUrl } from "@/contents/apiUrl";
import accountBg from "@/assets/images/accountBg.png";
import accountMain from "@/assets/images/accountMain.png";
import Image from 'next/image'

export default () => {
  return <div className="w-full relative h-[320px] bg-accountBg" >
    <Image src={accountBg} alt='' className="h-[320px]" />
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  max-w-[1440px] w-full flex justify-between	px-[70px]">
      <div className="text-white text-5xl flex justify-center flex-col  ml-[90px]">
        欢迎使用节点管家
        <div className="text-primary text-xl mt-4">立即登录</div>
      </div>
      <Image src={accountMain} alt='' className=" h-[280px] w-auto" />

    </div>
    <div>

    </div>
  </div>
}