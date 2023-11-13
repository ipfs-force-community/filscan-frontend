import BgIcon from "@/assets/images/loginBg.svg";
import styles from './index.module.scss'
import Image from 'next/image'

export default () => {
  return <Image src={BgIcon} alt="" />
//   return <div className={ styles.contain}>
//     <div className={ `${styles.contain_shape} ${styles.contain_shape1}`} ></div>
//     <div className={ `${styles.contain_shape} ${styles.contain_shape2}`}></div>
//   </div>
//   return <BgIcon width={1440} height={652}/>
}