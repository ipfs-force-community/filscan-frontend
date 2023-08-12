import { Input } from 'antd'
import style from './index.module.scss'
import { search } from '@/contents/common'
import { Translation } from '../hooks/Translation'
import { spawn } from 'child_process'

export default () => { 
    const { tr } = Translation({ ns: 'common' });

    return <Input className={style.banner_search_input} placeholder={tr(search.holder)}  />
}