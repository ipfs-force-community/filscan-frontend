import IconLogo from '@/assets/images/logo.svg'
import IconClose from '@/assets/images/header/icon_close.svg'
import IconOpen from '@/assets/images/header/icon_open.svg'
import Image from 'next/image'
import styles from './index.module.scss'
const Header = () => {
  return <div className={styles['header-wrap']}>
    <div>
      <Image src={IconLogo} alt='' />
      <div>Filscan</div>
    </div>
    <Image src={IconOpen} alt=''/>
  </div>
}
export default Header