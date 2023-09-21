import { DownOutlined, LeftOutlined, UpOutlined } from "@ant-design/icons"
import { useState } from "react"

interface Props {
    title: string,
    children?:JSX.Element
}

export default (props: Props) => {
  const {title,children } = props
  const [show,setShow] = useState(false)
  return <div className="flex items-center flex-col min-h-[36px] h-fit rounded-[5px] border border_color" >
    <div className={ `flex justify-between items-center w-full des_bg_color py-3 px-2.5 rounded-[5px] ${show ? 'rounded-b-none':''}`} onClick={() => setShow(!show)}>
      <span className="flex items-center text-base "> {title}</span>
      { show ?<DownOutlined rev={undefined} />: <LeftOutlined rev={undefined} />}
    </div>
    <div className='flex flex-col w-full p-5 gap-y-2.5 bg-transparent' style={{display:show?'flex':'none'}}>
      { children}
    </div>
  </div>
}