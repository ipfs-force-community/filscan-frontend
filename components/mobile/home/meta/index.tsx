import { useEffect } from 'react'
import styles from './style.module.scss'
import { observer } from 'mobx-react'

const Meta = (props: any) => {
  return <div className={styles.meta}></div>
}

export default observer(Meta)
