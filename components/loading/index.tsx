import Image from 'next/image'
import loading from '@/assets/images/loading.png'

export default ({width,height }: {width?:number,height?:number}) => {
  return <div className="main_contain flex justify-center !mt-12 ">
    <Image src={loading} width={width||360} height={height||203} alt="" />
  </div>
}