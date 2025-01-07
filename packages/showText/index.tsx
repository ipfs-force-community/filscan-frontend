import AccountLink from '@/components/accountLink'
import { Translation } from '@/components/hooks/Translation'
import { getSvgIcon } from '@/svgsIcon'
import { useMemo, useState } from 'react'

export default ({
  content,
  unit = 0,
}: {
  content: Array<any>
  unit?: number
}) => {
  const { tr } = Translation({ ns: 'common' })
  const [open, setOpen] = useState(false)

  const showContent = useMemo(() => {
    if (content.length > 2 && !open) {
      return content.slice(0, 2)
    }
    return content
  }, [content, open])

  return (
    <ul className="flex flex-col flex-wrap  items-baseline justify-end gap-2">
      {showContent.map((item, index) => {
        return (
          <li
            className="flex w-full items-center justify-end gap-x-1"
            key={index}
          >
            <AccountLink value={item} unit={unit} />
          </li>
        )
      })}
      {content.length > 2 && (
        <span
          className="text_des flex cursor-pointer items-center gap-x-1 self-end text-xs"
          onClick={() => {
            setOpen(!open)
          }}
        >
          {tr(open ? 'no_open' : 'open')}
          <span className={open ? 'rotate-180 transform' : ''}>
            {getSvgIcon('downIcon')}
          </span>
        </span>
      )}
    </ul>
  )
}
