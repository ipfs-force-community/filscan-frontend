import { fvmUrl } from "@/contents/apiUrl";
import accountBg from "@/assets/images/accountBg.png";
import accountMain from "@/assets/images/accountMain.png";
import Image from 'next/image'
import { Translation } from "@/components/hooks/Translation";

export default () => {
  const { tr } = Translation({ ns: 'common' });

  return <div className="w-full relative h-[320px] bg-accountBg" >
    <Image src={accountBg} alt='' className="h-[320px]" />
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  max-w-[1440px] w-full flex justify-between	px-[70px]">
      <div className="text-white text-5xl flex justify-center flex-col  ml-[90px]">
        {tr('account_banner_bg') }
        <div className=" text-gray-400	text-xl mt-4">
          {tr('account_banner_main') }

        </div>
      </div>
      <Image src={accountMain} alt='' className=" h-[280px] w-auto" />

    </div>
    <div>

    </div>
  </div>
}