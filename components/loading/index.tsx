import Image from 'next/image'
import loading from '@/assets/images/loading.png'
import classNames from 'classnames'
import styles from './index.module.scss'
export default ({ width, height }: { width?: number; height?: number }) => {
  return (
    <div
      className={classNames(
        'main_contain !mt-12 flex justify-center ',
        styles.wrap,
      )}
    >
      <Image src={loading} width={width || 260} height={height || 260} alt="" />
    </div>
  )
}
