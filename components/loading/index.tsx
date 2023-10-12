import Image from 'next/image'
import loading from '@/assets/images/loading.png'
import classNames from 'classnames'
import styles from './index.module.scss'
export default ({width,height }: {width?:number,height?:number}) => {
  return <div className={classNames("main_contain flex justify-center !mt-12 ",styles.wrap)}>
    <Image src={loading} width={width||360} height={height||203} alt="" />
  </div>
}