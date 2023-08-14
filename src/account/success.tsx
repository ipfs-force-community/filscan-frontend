import success from '@/assets/images/success.svg';
import { Translation } from '@/components/hooks/Translation';
import { Button } from 'antd';
import Image from 'next/image'

export default () => { 
    const { tr } = Translation({ ns: 'common' });
    return <div>
            <Image src={success} width={80} height={ 80} alt=''/>
            <Button>{tr('go_home')}</Button>
        </div>
}