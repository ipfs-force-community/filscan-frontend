import { Translation } from '@/components/hooks/Translation'
import { Button, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import { active_member_share } from '@/contents/account'
import QRCodePage from '@/components/QR'
import { getSvgIcon } from '@/svgsIcon'
import html2canvas from 'html2canvas'

export default ({ inviteCode }: { inviteCode: string }) => {
  const { tr } = Translation({ ns: 'account' })

  const [show, setShow] = useState(false)
  const shareRef = useRef<HTMLDivElement>(null)
  const handleSave = () => {
    setTimeout(() => {
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
    }, 3000)
  }

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
                <div>{tr('active_target_1')}</div>
                <div>{tr('active_target_2')}</div>
              </div>
              <div className={style.share_invite}>
                <span>{tr('invite_code')}</span>
                <ul className={style.share_invite_content}>
                  {inviteCode?.split('')?.map((v) => {
                    return (
                      <li key={v} className={style.share_invite_item}>
                        {v}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={style.share_bottom}>
              <QRCodePage
                link={`${window.location.host}/admin/register/?inviteCode=${inviteCode}`}
              />
              <div>
                <div className={style.share_bottom_title}>
                  {tr('scan_code')}
                </div>
                <div className={style.share_bottom_des}>{tr('active_des')}</div>
                <div className={style.share_bottom_gift}>
                  <span className={style.share_bottom_icon}>
                    {getSvgIcon('member_active')}
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
