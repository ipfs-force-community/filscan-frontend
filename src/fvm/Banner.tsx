import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import { useEffect, useRef, useState } from "react"
import { Image } from 'antd'
import useAxiosData from "@/store/useAxiosData"
import { apiUrl } from "@/contents/apiUrl"
import { useFilscanStore } from "@/store/FilscanStore"

function Banner() {

  const { axiosData } = useAxiosData()
  const { theme, lang } = useFilscanStore();
  const carousel = useRef<any>(null)
  const [data, setData] = useState([])

  useEffect(() => {
    loadBanner()
  }, [lang])

  const loadBanner = async() => {
    const result:any =await axiosData(apiUrl.home_banner, {
      category: 'metric_banner',
      language:lang ||'zh'
    })
    setData(result?.items||[])
  }

  if (data.length === 0) {
    return null
  }

  return <div className="group relative overflow-hidden w-full h-full mt-5">
    <Carousel autoplay={true} autoplaySpeed={5000} ref={carousel} infinite={true }>
      {[...data]?.map((item: any,index) => {
        return <div key={ index} onClick={() => {
          if (item.link) {
            window.open(item.link)
          }
        }}>
          <Image preview={false} src={item.url} alt='' width='100%' className="rounded-2xl cursor-pointer object-cover carousel-image"/>
        </div>
      })}
    </Carousel>
  </div>
}

export default Banner

