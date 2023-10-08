import styles from './index.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { getSvgIcon } from '@/svgsIcon'
import Logo from '@/assets/images/logo.png';
import LogoText from '@/assets/images/logoText.png'
import Image from 'next/image';

const links = [
  {
    label: "twitter",
    type:'_blank',
    link:'https://twitter.com/FilscanOfficial'
  },
  {
    label: "telegram",
    type:'_blank',
    link:'https://t.me/+bI9fUEkmPjMzYjg1'
  },
  {
    label: "outlook",
    type:'_self',
    link:'mailto:filscan@ipfsforce.com'
  }
]

const Header = () => {
  const {t} = useTranslation("common")

  return (
    <div className={styles['footer-wrap']}>
      <div className={styles.top} >
        <Image src={Logo} alt='logo'></Image>
        <Image src={LogoText} alt='logo' ></Image>
      </div>
      <div className={classNames(styles['text'])}>
        <div>
          { t('footer_des1')}
        </div>
        <div>
          { t('footer_des2')}
        </div></div>
      <div className={classNames(styles.bottom)}>
        {links.map((item,index)=>{
          return <a key={item.label}
            target={item.type}
            style={{ color: '#fff' }} href={item.link}>{
              getSvgIcon(item.label)}</a>
        })}
      </div>
    </div>
  )
}
export default Header