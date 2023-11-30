import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import logo from '@/assets/images/logo.png'

interface Props {
  link: string
}
export default function QRCodePage(props: Props) {
  const { link } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<any>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // 生成二维码数据
        const qrCodeData: string = await QRCode.toDataURL(link, { margin: 3 })
        // 加载Logo图片
        const logoImage = new Image()
        logoImage.crossOrigin = 'anonymous'
        logoImage.src =
          'https://filscan-v2.oss-accelerate.aliyuncs.com/client/logo.ico' // 替换为你的Logo图片路径
        // 在Canvas上绘制二维码和Logo图片
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')
        const qrCodeImage = new Image()
        qrCodeImage.crossOrigin = 'anonymous'
        qrCodeImage.src = qrCodeData
        qrCodeImage.onload = () => {
          context.drawImage(qrCodeImage, 0, 0, canvas.width, canvas.height)
          // const logoSize = 20
          // const logoX = canvas.width / 2 - logoSize / 2
          // const logoY = canvas.height / 2 - logoSize / 2
          // context.drawImage(logoImage, logoX, logoY, logoSize, logoSize)
          setTimeout(() => {
            const dataUrl = canvas.toDataURL()
            imgRef.current.style.width = '120px'
            imgRef.current.style.height = '120px'
            imgRef.current.src = dataUrl
            canvas.style.display = 'none'
          })
        }
      } catch (error) {
        console.error('生成二维码时出错：', error)
      }
    }

    generateQRCode()
  }, [link, imgRef.current])

  return (
    <>
      <img ref={imgRef} width={0} height={0} className="rounded-md" />
      <canvas ref={canvasRef} width={120} height={120} className="rounded-md" />
    </>
  )
}
