/** @format */

import Rank from '@/src/rank'
import classNames from 'classnames'
import styles from './index.module.scss'
export default () => {
  return (
    <div className={classNames('main_contain', styles.wrap)}>
      <Rank origin={'rank'} />
    </div>
  )
}
