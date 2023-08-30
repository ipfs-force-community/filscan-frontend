import { Button, Upload, message } from "antd"
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Translation } from "@/components/hooks/Translation";
import { getSvgIcon } from "@/svgsIcon";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

export default ({ onChange ,fileData}: {fileData:any,onChange:(file:any,type:string)=>void}) => {

  const { type} = useRouter().query;
  const { tr } = Translation({ ns: 'contract' });

  const maxCount = useMemo(() => {
    if (type === 'standard') {
      return 1
    }
    return 50
  }, [type])

  const handleFile = (file: any, filesList: any) => {
    //1.将文件读取为二进制数据
    const ace: any = { ...fileData }
    filesList.forEach((data: any,index:number) => {
      if (Object.keys(ace).length + index + 1 > maxCount) {
        message.warning('file already exists')
        return
      }
      if (data.size / 1024 / 1024 > 10) {
        message.warning('file size more than 10M')
        return false
      }
      let reader = new FileReader();
      reader.readAsText(data, "UTF-8");
      reader.onload = (e:any) => {
        //获取数据
        //const ace:any = {};
        const value = e.currentTarget.result;
        ace[data.uid] = {
          name: data.name,
          uid:data.uid,
          value
        }
        if (onChange) {
          onChange(ace, 'file')
        }
      };
      //4.2 //读取中断事件
      reader.onabort = () => {
        console.log('读取中断了');
      };
    })
  }

  // const handleRemove = (uid: string, type: string) => {
  //   if (type === 'config') {
  //     let configFiles = { ...confiles }
  //     delete configFiles[uid]
  //     setConfies(configFiles)
  //     if (onChange) {
  //       onChange(configFiles,'config')
  //     }

  //   }
  //   const newAce = { ...aceFiles }
  //   delete newAce[uid]
  //   if (onChange) {
  //     onChange(newAce,'file')
  //   }
  // }

  return <>
    <div >
      <Upload
        accept={type === 'standard'? '.json':".sol"}
        maxCount={maxCount}
        beforeUpload={handleFile}
        multiple={type !== 'standard'}
        fileList={[]}
        customRequest={(file:any) => {
          file.onProgress({ percent: 100 })
          file.onSuccess({status:200})
        }}
      >
        <span className=" flex items-center gap-x-2 h-8">
          <Button className="primary_btn flex items-center gap-x-2 h-8">
            { getSvgIcon('uploadIcon')}
            {tr(type === 'standard' ? 'file_name_json' : 'file_name')}
          </Button>
          <span className="text_des text-xs">{ tr('file_name')}</span>
        </span>
      </Upload>
      {fileData&&Object.keys(fileData)?.map((acekey: string,index:number) => {
        const aceItem = fileData[acekey]
        return <div key={index} className="my-2.5" >
          <div className="flex justify-between items-center mb-2.5">
            <span className="flex gap-x-2 text_des items-center" >
              { getSvgIcon('fileIcon')}
              {aceItem.name}
            </span>
            <span >
              { getSvgIcon('deleteIcon')}
            </span>
          </div>
          <Editor key={ acekey} value={ aceItem.value}/>
        </div>

      }) }
    </div>

  </>
}