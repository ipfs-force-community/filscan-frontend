import Image from "next/image"
import IconSearch from '@/assets/images/header/icon_search.svg'
import styles from './index.module.scss'
import classNames from "classnames"
import { Input } from "antd"
import { HtmlHTMLAttributes, useRef, useState } from "react"
import useAxiosData from "@/store/useAxiosData"
import { apiUrl } from "@/contents/apiUrl"
import { useRouter } from "next/router"
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
  const { axiosData } = useAxiosData()
  const router = useRouter()

  const onSearch = async(value:string) => {
    const showInput = value.trim();
    if (showInput) {
      const result=await axiosData(apiUrl.searchInfo, {
        input:showInput,
      })
      const type = result?.result_type;
      if (type) {
        if (type === 'owner') {
          //owner
          router.push(`/owner/${showInput}`);
        } else if (type === 'address') {
          router.push(`/address/${showInput}`)
        } else if (type === 'height') {
          router.push(`/height/${showInput}`)
        } else if (type === 'message_details') {
          router.push(`/message/${showInput}`)
        } else if (type === 'miner') {
          router.push(`/miner/${showInput}`)
        } else if (type === 'block_details') {
          router.push(`/cid/${showInput}`)
        } else if (type === 'fns') {
          router.push(`/domain/${showInput}`)
        } else {
          router.push(`/address/${showInput}`)
        }
      } else {
        //404
        router.push(`/noResult/${showInput}`)
      }
    }
  }

  return <div className={classNames(styles.wrap,props.className)}>
    <div className={classNames(styles['search-wrap'],isSearch ? "" : styles.disabled)}>
      <div className={styles.search}>
        <form action="" id="search-form" onSubmit={(e)=>{
          onSearch(ref.current.input.value)
          e.preventDefault()}}>
          <Input
            type="search"
            allowClear
            ref={ref}
            prefix={<Image src={IconSearch} alt="" /> }
            onBlur={(e)=>{
              setIsSearch(false)
            }}
          />
        </form>
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