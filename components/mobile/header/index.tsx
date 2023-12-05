import IconClose from '@/assets/images/header/icon_close.svg'
import IconOpen from '@/assets/images/header/icon_open.svg'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { mobileNavMenu } from '@/contents/nav'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import Logo from '@/assets/images/logo.png'
import LogoText from '@/assets/images/logoText.png'
import { Translation } from '@/components/hooks/Translation'
import Image from 'next/image'
import { header_top } from '@/contents/common'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

const rootSubmenuKeys = ['1', '2', '3', '4', '5']

const Header = (props: any) => {
  const { t } = useTranslation('nav')
  const { tr } = Translation({ ns: 'common' })
  const { tr: trr } = Translation({ ns: 'account' })
  const [open, setOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectKeys, setSelectKeys] = useState<string[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const router = useRouter()
  const { lang } = filscanStore

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const onOpen = () => {
    setSelectKeys([])
    setOpenKeys([])
    setOpen(!open)
  }
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onSelect: MenuProps['onSelect'] = (select) => {
    setOpen(false)
    setSelectKeys(select.selectedKeys)
    const child = get(mobileNavMenu, select.key)

    if (child.value) {
      const value = child.value
      if (child.type === 'lang') {
        localStorage.setItem('lang', value)
        filscanStore.setLang(value)
        router.push(router.asPath, router.asPath, { locale: value })
        return
      }

      if (child.type === 'network') {
        if (value === 'Calibration') {
          window.open('https://calibration.filscan.io/')
        } else if (value === 'Mainnet') {
          window.open('https://filscan.io/')
        }
        return
      }
    }

    router.push(child.link)
  }
  type MenuItem = Required<MenuProps>['items'][number]
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
    } as MenuItem
  }

  useEffect(() => {
    let _items: MenuItem[] = []
    mobileNavMenu.forEach((value0, index0) => {
      if (value0.children) {
        let __items: MenuItem[] = []

        value0.children.forEach((value1, index1) => {
          if (value1.children) {
            __items.push(
              getItem(
                `${
                  value0.type === 'account' ? trr(value1.key) : t(value1.key)
                }`,
                `[${index0}].children[${[index1]}]`,
                value1.children.map((value2, index2) => {
                  return getItem(
                    `${
                      value0.type === 'account'
                        ? trr(value2.key)
                        : t(value2.key)
                    }`,
                    `[${index0}].children[${[index1]}].children[${[index2]}]`,
                  )
                }),
              ),
            )
          } else {
            __items.push(
              getItem(
                `${
                  value0.type === 'account' ? trr(value1.key) : t(value1.key)
                }`,
                `[${index0}].children[${[index1]}]`,
              ),
            )
          }
        })

        _items.push(
          getItem(
            `${value0.type === 'account' ? trr(value0.key) : t(value0.key)}`,
            index0,
            __items,
          ),
        )
      } else {
        _items.push(getItem(`${t(value0.key)}`, `[${index0}]`))
      }
    })
    setItems(_items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const onClick = () => {
    router.push('/')
  }

  const onMaskClick = () => {
    setOpen(false)
  }

  return (
    <div className={styles['header-wrap']}>
      <div className={styles['header']}>
        <div className={styles.nav}>
          <div className={styles.logo} onClick={onClick}>
            <Image src={Logo} alt="logo"></Image>
            <Image src={LogoText} alt="logo"></Image>
          </div>
          {open ? (
            <IconClose onClick={onOpen} />
          ) : (
            <IconOpen onClick={onOpen} />
          )}
        </div>
        <div className={styles.fil}>
          {header_top.left
            .filter((value) => {
              return (
                value.dataIndex === 'base_fee' || value.dataIndex === 'price'
              )
            })
            .map((item, index) => {
              const { title, dataIndex, render } = item
              const value = props.data && props.data[dataIndex]
              let renderDom = render && render(value, props.data)
              return (
                <li key={dataIndex} className="flex gap-x-1">
                  <span>{tr(title)}:</span>
                  <span>{renderDom || value}</span>
                </li>
              )
            })}
        </div>
      </div>
      <div
        id="mask"
        onClick={onMaskClick}
        className={classNames(styles.body, open ? styles.active : '')}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={styles.menuWrap}
        >
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
  )
}
export default observer(Header)
