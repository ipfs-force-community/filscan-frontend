import IconLogo from '@/assets/images/logo.svg'
import IconClose from '@/assets/images/header/icon_close.svg'
import IconOpen from '@/assets/images/header/icon_open.svg'
import Image from 'next/image'
import styles from './index.module.scss'
import classNames from 'classnames'
const Header = () => {
  return <div className={styles['footer-wrap']}>
    <div className={styles.top}>
      <Image src={IconLogo} alt='' />
      <div>Filscan.io</div>
    </div>
    <div className={classNames(styles['text'])}>Filecoin区块浏览器及数据服务平台，提供基于 Filecoin 的各类收节点收益排行榜、区块链数据查询、可视化图表等一站式数据服务。</div>
    <div className={classNames(styles.bottom)}>
      <Image src={IconOpen} alt=''/>
      <Image src={IconOpen} alt=''/>
      <Image src={IconOpen} alt=''/>
    </div>
  </div>
}
export default Header