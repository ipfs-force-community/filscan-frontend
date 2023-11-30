import { Translation } from '@/components/hooks/Translation'
import { Button, Modal } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import style from './index.module.scss'
import { active_member_share } from '@/contents/account'
import QRCodePage from '@/components/QR'
import { useFilscanStore } from '@/store/FilscanStore'
import html2canvas from 'html2canvas'
import ActiveZh from '@/assets/images/member/ActiveZh.png'
import ActiveEn from '@/assets/images/member/activeEn.png'
import ActiveKr from '@/assets/images/member/activeKr.png'
import gift from '@/assets/images/member/gift.png'
import Image from 'next/image'
export default ({ inviteCode }: { inviteCode: string }) => {
  const { tr } = Translation({ ns: 'account' })
  const { lang } = useFilscanStore() // 使用你的 store 获取 lang 状态
  const [show, setShow] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)
  const handleSave = () => {
    if (shareRef.current) {
      html2canvas(shareRef?.current, {
        useCORS: true,
        allowTaint: false, //允许跨域图片,
        backgroundColor: 'transparent',
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = imgData
        link.download = `filscan-active.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }

  const imgSrc = useMemo(() => {
    if (lang === 'zh') {
      return ActiveZh
    } else if (lang === 'kr') {
      return ActiveKr
    }
    return ActiveEn
  }, [lang])

  return (
    <div className={style.detail}>
      <div className={style.send}>
        <Button className="active_btn" onClick={() => setShow(true)}>
          {tr('active_share')}
        </Button>
        <span className={style.send_icon}>{tr('send_member')}</span>
      </div>
      <Modal
        destroyOnClose={true}
        closeIcon={false}
        wrapClassName="custom_modal noPaddingModal noTopModal"
        open={show}
        width={416}
        footer={null}
        onCancel={() => {
          setShow(false)
        }}
      >
        <div className={style.activeShare}>
          <div className={style.share} ref={shareRef}>
            <div className={style.share_top}>
              <div className={style.share_main}>
                <div className={style.share_content}>
                  <span
                    className={`${style.share_content_icon} ${style.share_content_top}`}
                  />
                  <span
                    className={`${style.share_content_icon} ${style.share_content_top} ${style.share_content_right}`}
                  />
                  <span
                    className={`${style.share_content_icon} ${style.share_content_bottom}`}
                  />
                  <span
                    className={`${style.share_content_icon} ${style.share_content_bottom} ${style.share_content_Bright}`}
                  />
                  <div className={style.share_content_title}>
                    {tr('account_title')}
                  </div>
                  <ul>
                    {active_member_share.map((v: any, index: number) => {
                      return (
                        <li key={index} className={style.share_content_item}>
                          {v.icon}
                          {tr(v.title)}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className={style.share_target}>
                <Image
                  src={imgSrc}
                  alt=""
                  className={style.share_target_image}
                />
                {/* <div>{tr('active_target_1')}</div>
                <div>{tr('active_target_2')}</div> */}
              </div>
              <div className={style.share_invite}>
                <span>{tr('invite_code')}</span>
                <div className={style.share_invite_content}>
                  {inviteCode?.split('')?.map((v, index: number) => {
                    return (
                      <div key={index} className={style.share_invite_item}>
                        {v}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={style.share_bottom}>
              <div>
                <QRCodePage
                  link={`${window.location.host}/admin/register/?inviteCode=${inviteCode}`}
                />
              </div>

              <div>
                <div className={style.share_bottom_title}>
                  {tr('scan_code')}
                </div>
                <div className={style.share_bottom_des}>{tr('active_des')}</div>
                <div className={style.share_bottom_gift}>
                  <span className={style.share_bottom_icon}>
                    <Image src={gift} alt="" />
                    {/* {getSvgIcon('member_active')} */}
                  </span>
                  <span className={style.share_bottom_gift_text}>
                    {tr('active_gift')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={style.activeShare_save} onClick={handleSave}>
            {tr('active_save')}
          </div>
        </div>
      </Modal>
    </div>
  )
}
