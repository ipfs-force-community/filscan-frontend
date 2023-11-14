import { DownOutlined, LeftOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Props {
  title: string
  children?: JSX.Element
}

export default (props: Props) => {
  const { title, children } = props
  const [show, setShow] = useState(false)
  return (
    <div className="border_color flex h-fit min-h-[36px] flex-col items-center rounded-[5px] border">
      <div
        className={`des_bg_color flex w-full items-center justify-between rounded-[5px] px-2.5 py-3 ${
          show ? 'rounded-b-none' : ''
        }`}
        onClick={() => setShow(!show)}
      >
        <span className="flex items-center text-base "> {title}</span>
        {show ? (
          <DownOutlined rev={undefined} />
        ) : (
          <LeftOutlined rev={undefined} />
        )}
      </div>
      <div
        className="flex w-full flex-col gap-y-2.5 bg-transparent p-5"
        style={{ display: show ? 'flex' : 'none' }}
      >
        {children}
      </div>
    </div>
  )
}
