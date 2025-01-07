/** @format */

import { useEffect, useMemo, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import lightImg from '@/assets/images/404_light.png'
import darkImg from '@/assets/images/404_dark.png'

import useAxiosData from '@/store/useAxiosData'
import { apiUrl } from '@/contents/apiUrl'
import Link from 'next/link'
import Loading from '@/components/loading'
import classNames from 'classnames'
import styles from './index.module.scss'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(() => {
  const router = useRouter()
  let searchValue = router.asPath?.split('=')[1]
  const [show404, setShow_404] = useState(false)
  const { axiosData } = useAxiosData()
  const { theme } = filscanStore

  useEffect(() => {
    searchValue = router.asPath?.split('=')[1]
    if (searchValue) {
      handleSearch(searchValue)
    } else {
      setShow_404(true)
    }
  }, [])

  useEffect(() => {
    if (router.asPath.includes('#')) {
      const a = router.asPath
      window?.location?.replace(a.replaceAll('/#', ''))
    }
  }, [router.asPath])

  const handleSearch = (searchValue: string) => {
    const showInput = searchValue.trim()
    if (searchValue) {
      axiosData(
        apiUrl.searchInfo,
        {
          input: showInput,
        },
        { isCancel: false },
      ).then((res: any) => {
        setShow_404(true)
        const type = res?.result_type
        if (type) {
          if (type === 'owner') {
            //owner
            Router.push(`/owner/${showInput}`)
          } else if (type === 'address') {
            Router.push(`/address/${showInput}`)
          } else if (type === 'height') {
            Router.push(`/height/${showInput}`)
          } else if (type === 'message_details') {
            Router.push(`/message/${showInput}`)
          } else if (type === 'miner') {
            Router.push(`/miner/${showInput}`)
          } else if (type === 'block_details') {
            Router.push(`/cid/${showInput}`)
          } else {
            Router.push(`/address/${showInput}`)
          }
        } else {
          //404
          Router.push(`/noResult/${showInput}`)
        }
      })
    }
  }

  const showImage = useMemo(() => {
    return theme === 'light' ? lightImg : darkImg
  }, [theme])

  if (searchValue || !show404) {
    return <Loading />
  }

  return (
    <div className={classNames(`main_contain !pt-20`, styles.wrap)}>
      <Image src={showImage} className="m-auto" width={300} alt="" />
      <div className="m-auto flex flex-col items-center justify-center">
        <span className="text-xl font-medium">404</span>
        <span className="text_des text-xs font-medium">
          Sorry, the page you visited does not exist
        </span>
      </div>
      <Link
        className="primary_btn mx-auto mt-5 !px-5 !py-1 !text-base"
        href="/home"
      >
        Back Home
      </Link>
    </div>
  )
})
