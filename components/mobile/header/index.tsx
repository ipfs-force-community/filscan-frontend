import IconLogo from '@/assets/images/logo.svg'
import IconClose from '@/assets/images/header/icon_close.svg'
import IconOpen from '@/assets/images/header/icon_open.svg'
import Image from 'next/image'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next'
import { mobileNavMenu } from '@/contents/nav'
import { useRouter } from 'next/router'
import _ from 'lodash'
const rootSubmenuKeys = ['1', '2', '3','4','5'];

const Header = () => {
  const {t} = useTranslation("nav")
  const [open,setOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

  const [items, setItems] = useState<MenuItem[]>([]);
  const router = useRouter()

  useEffect(()=>{
    document.body.style.overflow = open ? "hidden" : 'auto'
  },[open])

  const onOpen = ()=>{
    setSelectKeys([])
    setOpenKeys([])
    setOpen(!open)
  }
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect:MenuProps['onSelect'] = (select)=>{
    setOpen(false)
    setSelectKeys(select.selectedKeys)
    const link = _.get(mobileNavMenu,select.key).link
    router.push(link)
  }
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      children,
      label,
      type,
    } as MenuItem;
  }

  useEffect(()=>{
    let _items: MenuItem[] = []
    mobileNavMenu.forEach((value,index)=>{
      if (value.children) {
        _items.push(getItem(`${t(value.key)}`,index,value.children.map((val,idx)=>{
          return getItem(`${t(val.key)}`,`[${index}].children[${[idx]}]`)
        })))
      }
      else {
        _items.push(
          getItem(`${t(value.key)}`,`[${index}]`)
        )
      }
    })
    setItems(_items)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onClick=()=>{
    router.push('/')
  }

  const onMaskClick=()=>{
    setOpen(false)
  }

  return <div className={styles['header-wrap']}>
    <div className={styles['header']}>
      <div onClick={onClick}>
        <Image src={IconLogo} alt='' />
        <div>Filscan</div>
      </div>
      <Image onClick={onOpen} src={open ? IconClose :IconOpen} alt=''/>
    </div>
    <div id='mask' onClick={onMaskClick} className={classNames(styles.body,open?styles.active:'')}>
      <div onClick={(e)=>{
        e.stopPropagation()
      }} className={styles.menuWrap}>
        <Menu
          mode="inline"
          selectedKeys={selectKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onSelect={onSelect}
          items={items}
        />
      </div>
    </div>
  </div>
}
export default Header
