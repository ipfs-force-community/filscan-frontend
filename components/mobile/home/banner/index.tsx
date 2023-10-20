import styles from './style.module.scss';
import { observer } from 'mobx-react';
import { Carousel } from 'antd';
import useAxiosData from '@/store/useAxiosData';
import { useFilscanStore } from '@/store/FilscanStore';
import { useEffect, useRef, useState } from 'react';
import useWindow from '@/components/hooks/useWindown';
import { apiUrl } from '@/contents/apiUrl';
import { Image } from 'antd'

const Banner = (props: any)=> {
  const { axiosData } = useAxiosData()
  const { theme, lang } = useFilscanStore();
  const carousel = useRef<any>(null)
  const [data, setData] = useState([])
  const {isMobile} = useWindow()
  useEffect(() => {
    loadBanner()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang,isMobile])

  const loadBanner = async() => {
    const result:any =await axiosData(apiUrl.home_banner, {
      category: 'mobile_home',
      language:lang ||'zh'
    }, {isCancel:false})
    setData(result?.items||[])
  }

  return <div className={styles.banner}>
    <Carousel>
      {data?.map((item: any,index) => {
        return <div key={ index} onClick={() => {
          if (item.link) {
            window.open(item.link)
          }
        }}>
          <Image preview={false} src={item.url} alt='' width='100%' className="cursor-pointer object-cover carousel-image rounded-[6px]"/>
        </div>
      })}
    </Carousel>
  </div>;
}

export default observer(Banner);
