import { formatNumber, get$Number, getClassName } from "@/utils";
import Image from 'next/image'
import { Item } from "./type";

interface TOP_DATA {
    left: Item[];
    right:Item[]
}
export const header_top:TOP_DATA = {
    left: [
        {
            title: 'fil',
            dataIndex: 'fil',
            render: (text: number) => <span className="text_primary">{get$Number(text)} </span>
        },
        {
            title: 'last_time',
            dataIndex:'last_time'
        },
        {
            title: 'base_fee',
            dataIndex: 'base_fee',
            render: (text: number) => <span className="text_primary">{text} </span>

        },
        {
            title: 'last_height',
            dataIndex: 'last_height',
            render: (text: number) => <span className="text_primary">{formatNumber(text)} </span>

        },

    ],
    right: [
        {
            title:'',
            dataIndex: 'network',
          
        },
          {
            title:'',
            dataIndex: 'network',
        },
            {
            title:'',
            dataIndex: 'network',
        }
        
    ]
}

