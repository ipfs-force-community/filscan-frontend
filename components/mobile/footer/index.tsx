import IconLogo from '@/assets/images/logo-mobile.svg'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { getSvgIcon } from '@/svgsIcon'

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

  return <div className={styles['footer-wrap']}>
    <div className={styles.top}>
      <IconLogo />
      <div>Filscan.io</div>
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
          className='w-5 h-5 bg-white rounded'
          target={item.type}
          style={{ color: '#fff' }} href={item.link}>{
            getSvgIcon(item.label)}</a>
      })}
    </div>
  </div>
}
export default Header