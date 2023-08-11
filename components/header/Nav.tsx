import Image from 'next/image'
import logo from '@/assets/images/logo.svg'
import { navMenu } from '@/contents/nav'
import down from '@/assets/images/down.svg'
import { Translation } from '@/components/hooks/Translation'
import Link from 'next/link'
export default () => { 
    const { tr } = Translation({ns:'nav'})

    const renderChild = (children:Array<any>) => { 
        return <ul className='hidden group-hover:block absolute inset-y-full max-h-fit w-max	list-none box-shadow border border-border p-4 rounded-[5px] '>
            {children.map(item => { 
                return <Link
                    key={item.key}
                    href={`/${item.link}`}
                    className='h-10  text-font  flex items-center cursor-pointer rounded-[5px]  hover:text-primary hover:bg-bg_hover'>
                    <span className='px-4'>
                     {tr(item.key)}
                    </span>
                </Link>
            })}
            
        </ul>

    }

    return <div className='flex items-center px-24 h-[60px] justify-between text-sm  font-semibold' >
        <div className='flex gap-x-2 items-center'>
            <Image src={logo} width={ 32} height={32} alt='logo' />
            <span className='font-Barlow font-bold text-xl'>Filscan</span>
        </div>
        <div className='flex gap-x-8 h-full justify-between items-center' >
            {navMenu.map(nav => { 
                if (nav?.children) { 
                    return <div className='group h-full flex cursor-pointer items-center relative hover:text-primary'>
                        <span className='flex gap-x-1 '>
                            {tr(nav.key)}
                            <Image src={down} width={8} height={4} alt='down' />
                        </span>
                        {renderChild(nav.children)}
                    </div>
                }
            return <Link href={`/${nav.link}`} className='cursor-pointer  text-font   hover:text-primary'>
                {tr(nav.key)}
            </Link>
        })}
        </div>

    </div>
}