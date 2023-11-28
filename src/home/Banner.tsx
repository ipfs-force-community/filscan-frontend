import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel, Image } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import { apiUrl } from '@/contents/apiUrl'
import { useFilscanStore } from '@/store/FilscanStore'
import style from './style.module.scss'

function Banner() {
  const { axiosData } = useAxiosData()
  const { theme, lang } = useFilscanStore()
  const carousel = useRef<any>(null)
  const [data, setData] = useState([])
  const [autoplay, setAutoplay] = useState(true)
  const [current, setCurrent] = useState<Number>(0)

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

  const handleSlideChange = (currentSlide: number) => {
    setCurrent(currentSlide)
  }

  return (
    <div className="group relative h-full w-full overflow-hidden">
      <Carousel
        autoplay={autoplay}
        ref={carousel}
        autoplaySpeed={5000}
        infinite={true}
        beforeChange={handleSlideChange}
        dots={false}
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
      <ul className={style.dots}>
        {[...data]?.map((v, index: number) => {
          return (
            <li
              key={index}
              className={`${style.dots_li} ${
                Number(current) === index ? style.dots_active : ''
              }`}
              onClick={() => {
                carousel?.current?.next()
                setAutoplay(false)
              }}
            ></li>
          )
        })}
      </ul>
    </div>
  )
}

export default Banner
