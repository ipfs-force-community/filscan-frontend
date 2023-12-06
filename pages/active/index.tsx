import { Translation } from '@/components/hooks/Translation'
import active from '@/store/modules/active'
import { formatDateTime } from '@/utils'
import { observer } from 'mobx-react'
import Image from 'next/image'
import style from './index.module.scss'

export default observer(() => {
  const { tr } = Translation({ ns: 'common' })
  const { activeList } = active
  return (
    <div className="main_contain">
      <div className={style.active_title}>{tr('active')}</div>
      <ul className={style.active}>
        {activeList.map((v, index: number) => {
          return (
            <li key={index} className={style.active_item}>
              <Image
                className={style.active_item_image}
                width={373}
                height={270}
                src={v?.image_url || ''}
                alt=""
                onClick={() => {
                  if (v.jump_url) {
                    window.open(v.jump_url)
                  }
                }}
              />
              <div className={style.active_item_name}>{v?.name || ''}</div>
              <div className={style.active_item_des}>{`${tr(
                'active_time',
              )}: ${formatDateTime(
                v.start_at,
                'YYYY.MM.DD HH:mm',
              )} ~ ${formatDateTime(v.end_at, 'YYYY.MM.DD HH:mm')}`}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
