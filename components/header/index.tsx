import { header_top } from "@/contents/common";
import { Layout } from "antd" 
import { Translation } from "@/components/hooks/Translation";
import network from '@/assets/images/network.svg'
import moon from '@/assets/images/moon.svg'

import Image from 'next/image'
import Nav from './Nav'

const { Header } = Layout;
const data :any = {
    fil: '42.35',
    last_time: '3分11秒',
    base_fee:'0.089 FIL',
    last_height:'234562'
    
}
export default () => { 
    const { tr } = Translation({ns:'common'});

    return <Header className="!bg-bgColor !h-[106px] !p-0" >
        <div className="flex justify-between items-center h-[45px] text-xs font-PingFang font-medium border-b border-border_des px-24">
            <ul className="flex gap-x-5 list-none">
                {header_top.left.map((item) => { 
                    const { title,dataIndex, render } = item
                    const value = data[dataIndex]
                    const renderDom =  render  && render(value,data)
                    return <li key={dataIndex} className="flex gap-x-1">
                        <span>{tr(title)}:</span>
                        <span>{ renderDom || value}</span>
                    </li>
                })}
            </ul>
            <div className="flex gap-x-2.5 items-center" >
                <Image src={network} width={28} height={28} alt='network' key='network' />
                <span className="flex items-center justify-center w-7 h-7 border border-border rounded-[5px]">{ tr('lang')}</span>
                <Image src={moon} width={28} height={ 28} alt='theme' key='moon'/>
            </div>

        </div>
        <Nav />
    </Header>
}