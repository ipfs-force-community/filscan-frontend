import Image from 'next/image'
import loading from '@/assets/images/loading.png'

export default () => {
  return <div className="main_contain flex justify-center !mt-20 ">
    <Image src={loading} width={360} height={203} alt="" />
  </div>
}