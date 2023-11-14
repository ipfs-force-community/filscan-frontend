import { useEffect, useRef, RefObject } from 'react'

const useFadeInOnScroll = (): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素进入视口时，添加`fade-in`类
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
        }
      },
      {
        // 当元素的50%可见时，触发回调
        threshold: 0.01,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // 在组件卸载时，取消观察
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}

export default useFadeInOnScroll
