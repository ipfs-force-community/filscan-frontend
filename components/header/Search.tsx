/** @format */
import Search from '@/components/search';
import { search } from '@/contents/common';
import SearchIcon from '@/assets/images/searchIcon_w.svg';
import Image from 'next/image';
import useAxiosData from '@/store/useAxiosData';
import { apiUrl } from '@/contents/apiUrl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default ({
  origin,
  className = '',
}: {
  origin?: string;
  className?: string;
  }) => {

  const { axiosData, } = useAxiosData()
  const router = useRouter();
  const [options, setOptions] = useState([])
  const [active, setActive] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (router.asPath.includes('address/miner')) {
      const addressValue = router.asPath.split('?')[1]
      const showValue = addressValue.split('=')[1]
      handleSearch(showValue)
    }
  },[router])

  const handleSearch = async(value:string) => {
    const showInput = value.trim();
    if (showInput) {
      setSearchLoading(true)
      const result=await axiosData(apiUrl.searchInfo, {
        input:showInput,
      })
      setSearchLoading(false)
      const type = result?.result_type;
      if (type) {
        if (type === 'owner') {
          //owner
          router.push(`/owner/${showInput}`);
        } else if (type === 'address') {
          router.push(`/address/${showInput}`)
        } else if (type === 'height') {
          router.push(`/height/${showInput}`)
        } else if (type === 'message_details') {
          router.push(`/message/${showInput}`)
        } else if (type === 'miner') {
          router.push(`/miner/${showInput}`)
        } else if (type === 'block_details') {
          router.push(`/cid/${showInput}`)
        } else if (type === 'fns') {
          if (result?.fns_tokens.length > 0) {
            setOptions(result?.fns_tokens||[])
            setActive(type)
          } else {
            router.push(`/domain/${showInput}`)
          }
        } else {
          router.push(`/address/${showInput}`)
        }
      } else {
        //404
        router.push(`/noResult/${showInput}`)
      }
    }
  }

  const handleClick = (item:any) => {
    router.push(`/domain/${item.name}?provider=${item.provider}`)
  }
  return (
    <div className='relative w-auto group'>
      <Search
        className={`${className} focus:outline-none`}
        ns='common'
        placeholder={search.holder}
        onSearch={handleSearch}
        origin={origin}
        onClick={handleSearch}
        suffix={
          searchLoading ? <span className='flex items-center justify-center bg-primary rounded-[5px]'
            style={{ width: origin === 'banner' ? 40 : 21, height: origin === 'banner' ? 40 : 21 }}>
            <LoadingOutlined className='custom-icon text-xs'/></span> :
            <SearchIcon
              width={origin === 'banner' ? 40 : 21}
              height={origin === 'banner' ? 40 : 21}
            />
        }
      />
      { active==='fns' && options && options.length > 0 &&
        <ul className={`opacity-0 group-focus-within:opacity-100  absolute flex gap-y-2 flex-col  w-full h-fit p-3 card_shadow border border_color ${origin === 'home'? '':'!max-w-lg'}`}>
          {options.map((item:any) => {
            return <li key={item.value} className='flex p-2 items-center gap-x-1 hover:bg-bg_hover cursor-pointer rounded-[5px]' onClick={() => handleClick(item)}>
              <Image src={item.icon} alt='' width={45} height={45} className={'logo_img rounded-[5px]'}/>
              <span>{item.name}</span>

            </li>
          })}
        </ul>
      }
    </div>

  );
};
