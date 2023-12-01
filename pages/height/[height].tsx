import { Translation } from '@/components/hooks/Translation'
import { heightDetail } from '@/contents/apiUrl'
import { height_list } from '@/contents/detail'
import useAxiosData from '@/store/useAxiosData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { Skeleton } from 'antd'
import Content from '@/packages/content'
import Loading from '@/components/loading'
import { BrowserView, MobileView } from '@/components/device-detect'
export default () => {
  const router = useRouter()
  const { height } = router.query
  const { tr } = Translation({ ns: 'detail' })
  const { axiosData, loading } = useAxiosData()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    load()
  }, [height])

  const load = async () => {
    const result: any = await axiosData(heightDetail, {
      height: Number(height),
    })
    setData(result?.tipset_detail)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className={classNames(styles.height, 'main_contain')}>
      <div className="font-HarmonyOS mx-2.5 text-lg font-semibold">
        {tr('height')}
        {height && <span className="ml-1"> #{height}</span>}
      </div>
      <div
        className={classNames(
          'card_shadow border_color text_xs mt-4 h-full rounded-xl border p-5',
          styles.content,
        )}
      >
        <Content
          contents={height_list.headerList}
          ns={'detail'}
          data={data}
          className={classNames('border_color border-b', styles.title)}
        />
        <BrowserView>
          <ul>
            {data?.block_basic?.map((dataItem: any, index: any) => {
              return (
                <Content
                  key={index}
                  contents={height_list.columns}
                  ns={'detail'}
                  data={dataItem}
                  className="border_color border-b pt-5 last:border-none"
                />
              )
            })}
          </ul>
        </BrowserView>
        <MobileView>
          {data?.block_basic?.map((dataItem: any, index: any) => {
            return (
              <Content
                key={index}
                contents={height_list.columns}
                ns={'detail'}
                data={dataItem}
                className="border_color border-b !py-4 last:border-none"
              />
            )
          })}
        </MobileView>
      </div>
    </div>
  )
}
