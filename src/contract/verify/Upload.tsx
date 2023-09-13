import { Button, Upload, message } from "antd"
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Translation } from "@/components/hooks/Translation";
import { getSvgIcon } from "@/svgsIcon";
import dynamic from "next/dynamic";
import { verify } from "@/contents/contract";

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

export default ({ onChange ,fileData,confiles}: {fileData:any,confiles:any,onChange:(file:any,type:string)=>void}) => {

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
          onChange(ace, type === 'standard'? 'config':'files')
        }
      };
      //4.2 //读取中断事件
      reader.onabort = () => {
        console.log('读取中断了');
      };
    })
  }

  const handleConfigFile = (data:any) => {
    let reader = new FileReader();
    const configAce:any = {...confiles}
    reader.readAsText(data, "UTF-8");
    reader.onload = (e:any) => {
      //获取数据
      //const ace:any = {};
      const value = e.currentTarget.result;
      configAce[data.uid] = {
        name: data.name,
        uid:data.uid,
        value
      }
      if (onChange) {
        onChange(configAce,'config')
      }
    };
    //4.2 //读取中断事件
    reader.onabort = () => {
      console.log('读取中断了');
    };
  }

  const handleRemove = (uid: string, type: string) => {
    let newFiles = { ...fileData }
    delete newFiles[uid]
    if (type === 'config') {
      if (onChange) {
        onChange(newFiles, 'config')
      }
    } else {
      if (onChange) {
        onChange(newFiles,'file')
      }
    }

  }

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
            <span className="cursor-pointer" onClick={()=>handleRemove(acekey,type === 'standard'? 'config':'files')}>
              { getSvgIcon('deleteIcon')}
            </span>
          </div>
          <Editor key={ acekey} value={ aceItem.value}/>
        </div>
      })}
      {type === 'standard'&& <ul className="border border_color rounded-[5px] p-5 mt-5 leading-6" >
        {verify.meta_list_des.map((listItem:any,index:number) => {
          return <li className="text_des" key={ index}>{ tr(listItem.label)}</li>
        })
        }
      </ul>}
    </div>
    <div className="mt-2.5">
      {type === 'multi' && <div>
        <Upload
          accept=".json"
          maxCount={1}
          fileList={ []}
          beforeUpload={handleConfigFile}
          multiple={false}
        >
          <Button className="primary_btn flex items-center gap-x-2 h-8 mt-2.5" >
            <span>+</span>
            {tr('config_file_name')}
          </Button>

        </Upload>
        {confiles&&Object.keys(confiles)?.map((acekey: string,index:number) => {
          const aceItem = confiles[acekey]
          return <div key={index} className="my-2.5" >
            <div className="flex justify-between items-center mb-2.5">
              <span className="flex gap-x-2 text_des items-center" >
                { getSvgIcon('fileIcon')}
                {aceItem.name}
              </span>
              <span className="cursor-pointer" onClick={()=>handleRemove(acekey, 'config')}>
                { getSvgIcon('deleteIcon')}
              </span>
            </div>
            <Editor key={ acekey} value={ aceItem.value}/>
          </div>
        })}
      </div> }
    </div>

  </>
}