import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button, Modal } from 'antd';
import Image from 'next/image'
import fvmBg from '@/assets/images/fvmBg.png';
import fvm from '@/assets/images/fvm.png';
import logo from '@/assets/images/logo.png';

function Share({ data,title }: {data:any,title:string}) {
  const myRef = useRef();
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState({})

  //   const handleScreenshot = () => {
  //     html2canvas(myRef.current).then((canvas) => {
  //       // 你可以在这里对 canvas 进行操作，例如将其转换为图片
  //       const imgData = canvas.toDataURL('image/png');
  //       console.log(imgData);
  //     });
  //   };
  useEffect(() => {
    if (title === 'all') {
      const newObj: any = {};
      (data || []).forEach((v: any) => {
        newObj[v.detail] = newObj[v.detail] || [];
        newObj[v.detail].push(v)
      })
      setContent(newObj)
    } else {
      setContent({
        [title]:data
      })
    }
  }, [data, title]);

  console.log('----345', data, title,content)

  return (
    <>
      <Button className="primary_btn mt-20 !w-full cursor-pointer" onClick={ ()=>setOpen(true)}>Share</Button>
      <Modal
        open={open}
        width={750}
        className='custom_modal'
        onCancel={() => { setOpen(false) }}>
        <div className='bg-fvmBg p-8' >
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <Image src={'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logo.png'} width={60} height={60} alt='logo' />
              {/* {getSvgIcon('logoText')} */}
              <Image src={'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logoText.png'} alt='logo' width={95} height={16}></Image>
            </div>

            <Image src={fvm} alt='' width={220} height={192}/>
          </div>
          {/* 这里是你想要转换为图片的内容 */}
        </div>
        {/* <button onClick={handleScreenshot}>生成截图</button> */}
      </Modal></>
  );
}

export default Share;
