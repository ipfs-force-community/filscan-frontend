import Search from '@/components/search';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default ({ onSearch }: {onSearch:(value:any,type:string)=>void}) => {
  // const [force,setForce]= useState(false)
  const handleSearch = (value: any) => {
    if (Number(value)) {
      onSearch(value,'height')
    } else {
      onSearch(value,'cid')
    }
  }
  //bafy2bzacedj7o2cshul2y5ckjrwdfkghiojm3f4aehwwhsuu3xm6ec2tjq4aq
  const handleBlur = () => {
    //setForce(false)
  }
  // if(!force ){
  //   return <div className='w-[32px] h-[32px] flex items-center justify-center border border_color rounded-[5px] cursor-pointer' onClick={()=>{setForce(true)}}>
  //     <SearchOutlined />
  //   </div>
  // }
  return <Search
    className={'!w-[400px] !h-10'}
    placeholder={'cw-search'}
    onSearch={handleSearch}
    onClick={handleSearch}
    onBlur={handleBlur}
    ns='static'
    suffix={<SearchOutlined />}
  />
}