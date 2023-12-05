import styles from './index.module.scss'
import loginIcon from '@/assets/images/loginIcon.png'
import { Translation } from '@/components/hooks/Translation'
import Image from 'next/image'
import Warn from './Warn'

interface Props {
  children: JSX.Element
}

export default (props: Props) => {
  const { children } = props
  const { tr } = Translation({ ns: 'common' })

  return (
    <div className={`${styles.contain}`}>
      <div className={styles.contain_left}>
        <div className={styles.contain_left_text}>
          <div className={styles.contain_text}>
            <div>{tr('active_top_1')}</div>
            <div className={styles.contain_text_pro}>{tr('active_top_2')}</div>
          </div>
          <div className={styles.contain_text}>
            <div>{tr('active_bottom_1')}</div>
            <div className={styles.contain_text_pro}>
              {tr('active_bottom_2')}
            </div>
          </div>
        </div>

        <Image src={loginIcon} alt="" height={288} />
      </div>
      <div className={styles.contain_right}>{children}</div>
    </div>
  )
}
