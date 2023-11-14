import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel, Image } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import { apiUrl } from '@/contents/apiUrl'
import { useFilscanStore } from '@/store/FilscanStore'

function Banner() {
  const { axiosData } = useAxiosData()
  const { theme, lang } = useFilscanStore()
  const carousel = useRef<any>(null)
  const [data, setData] = useState([])

  useEffect(() => {
    loadBanner()
  }, [lang])

  const loadBanner = async () => {
    const result: any = await axiosData(apiUrl.home_banner, {
      category: 'new_home',
      language: lang || 'zh',
    })
    setData(result?.items || [])
  }

  if (data.length === 0) {
    return null
  }

  return (
    <div className="group relative h-full w-full overflow-hidden">
      {/* <span
      className="hidden group-hover:flex absolute z-10 top-1/2 cursor-pointer w-5 h-5  items-center justify-center rounded-full bg-tipColor"
      onClick={() => {
        if (carousel.current) {
          carousel?.current?.prev()
        }

      }}>
      <LeftOutlined rev={undefined} className="text-white text-xs" />
    </span> */}

      <Carousel
        autoplay={true}
        autoplaySpeed={5000}
        ref={carousel}
        infinite={true}
      >
        {[...data]?.map((item: any, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (item.link) {
                  window.open(item.link)
                }
              }}
            >
              <Image
                preview={false}
                src={item.url}
                alt=""
                width="100%"
                className="carousel-image cursor-pointer rounded-2xl object-cover"
              />
            </div>
          )
        })}
      </Carousel>
      {/* <span
      className="hidden group-hover:flex absolute z-10 top-1/2 right-0  w-5 h-5 items-center justify-center rounded-full bg-tipColor cursor-pointer"
      onClick={() => {
        if (carousel.current) {
          carousel?.current?.next()
        }
      }}>
      <RightOutlined rev={undefined} className="text-white text-xs"/>
    </span> */}
    </div>
  )
}

export default Banner
