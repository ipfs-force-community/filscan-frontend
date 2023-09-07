import Image from "next/image"
import IconSearch from '@/assets/images/header/icon_search.svg'
import styles from './index.module.scss'
import classNames from "classnames"
import { Input, InputRef } from "antd"
import { HtmlHTMLAttributes, useRef, useState } from "react"
interface SearchProps extends HtmlHTMLAttributes<HTMLDivElement>{
}
const Search = (props:SearchProps)=>{
  const [isSearch,setIsSearch] = useState<boolean>(false)
  const ref = useRef<any>()
  const onMaskClick = ()=>{
    setIsSearch(true)
    ref.current.focus()
  }
  const onCancelClick = ()=>{
    setIsSearch(false)
  }
  return <div className={classNames(styles.wrap,props.className)}>
    <div className={classNames(styles['search-wrap'],isSearch ? "" : styles.disabled)}>
      <div className={styles.search}>
        <Input ref={ref} prefix={<Image src={IconSearch} alt=""/>}/>
      </div>
      <div onClick={onCancelClick}>取消</div>
    </div>
    <div onClick={onMaskClick} className={classNames(styles['mask-wrap'],isSearch ? styles.disabled:"")}>
      <div className={classNames(styles['mask'])}>
        <Image src={IconSearch} alt=""/>
        <div>搜索区块/高度/账户/地址/消息/FNS</div>
      </div>
    </div>
  </div>
}
export default Search