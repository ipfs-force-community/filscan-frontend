
import styles from './index.module.scss'
import loginIcon from '@/assets/images/loginIcon.png'
import Image from 'next/image'

interface Props {
    children:JSX.Element
}

export default (props: Props) => {
  const { children } = props;

  return <div className={styles.contain}>
    <div className={ styles.contain_left}>
      <Image src={loginIcon} alt="" height={418} />

    </div>
    <div className={ styles.contain_right}>
      { children}
    </div>
  </div>
}