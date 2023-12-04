import { Modal, message } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import TGImage from '@/assets/images/tgCode.png'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import { getSvgIcon } from '@/svgsIcon'

export default () => {
  const { tr } = Translation({ ns: 'account' })
  const [show, setShow] = useState(false)
  const handleCopy = () => {
    copy('Filscan.io')
    return message.success('Clipboard Successfully')
  }
  return (
    <>
      <div
        className={`${style.member_btn}  ${style.member_btn_recommend}`}
        onClick={() => setShow(true)}
      >
        {tr('share_turn')}
      </div>
      <Modal
        title={''}
        width={300}
        destroyOnClose={true}
        closeIcon={false}
        wrapClassName="custom_modal noPaddingModal"
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
      >
        <div className={style.tg_main}>
          <span className={style.tg_icon}>{getSvgIcon('memberBg')}</span>
          <div className={style.tg}>
            <div className={style.tg_title}>{tr('tg_title')}</div>
            <div className={style.tg_img}>
              <Image src={TGImage} alt="" />
            </div>
            <div className={style.tg_des}>
              <div>TG：@Filscan.io</div>
              <div className={style.tg_des_copy} onClick={handleCopy}>
                {tr('copy_tg')}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
