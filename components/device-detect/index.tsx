import { HTMLAttributes } from "react"
import classNames from 'classnames'
import styles from './index.module.scss'
import useWindow from "../hooks/useWindown"
export const BrowserView = (props: HTMLAttributes<HTMLDivElement>) => {
  const {isMobile} = useWindow()
  return isMobile ? <></> : <>{props.children}</>
}

export const MobileView = (props: HTMLAttributes<HTMLDivElement>) => {
  const {isMobile} = useWindow()
  return !isMobile ? <></> : <div className={classNames(styles.mobile)}>{props.children}</div>
}