import { HTMLAttributes } from "react"
import classNames from 'classnames'
import styles from './index.module.scss'
export const BrowserView = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div className={`${classNames(styles.browser)}`} style={props?.style || {}}>{props.children}</div>
}

export const MobileView = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div className={classNames(styles.mobile)}>{props.children}</div>
}