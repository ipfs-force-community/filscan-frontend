import { Translation } from "@/components/hooks/Translation";
import { useHash } from "@/components/hooks/useHash";
import { verify_source } from "@/contents/contract"
import { Button, Input, Select, notification } from "antd";
import { useEffect, useState } from "react";
import Upload from "./Upload";
import { apiUrl } from "@/contents/apiUrl";
import useAxiosData from "@/store/useAxiosData";

const { TextArea } = Input;

export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const {axiosData } = useAxiosData()
  const { hashParams } = useHash();
  const {type } = hashParams;
  const [data,setData] = useState<any>({
    contract_address: '',
    compile_version: '',
    optimize: true,
    optimize_runs: 200,
    arguments:'',
  })
  const [files, setFiles] = useState<any>({})
  const [loading,setLoading] = useState<boolean>(false)
  const [configFile, setConfigFile] = useState({})

  useEffect(() => {
    if (hashParams) {
      setData({
        ...data,
        contract_address: hashParams.contractAddress || '',
        compile_version:hashParams.version||""
      })
    }
  }, [hashParams])

  const handleSave = () => {
    const obj = { ...data };
    const filesList = Object.keys(files) || [];
    if (filesList.length === 0) {
      return notification.warning({
        className: 'custom-notification',
        message: 'Warning',
        duration: 100,
        description: 'please select file'
      })
    }
    const source_file: any = [];
    filesList.forEach((v) => {
      const show_file = files[v];
      const item = {
        file_name: show_file.name,
        source_code: show_file.value
      };
      source_file.push(item)

    })
    obj.source_file = source_file;
    obj.optimize_runs = data.optimize_runs ? Number(data.optimize_runs) : undefined;

    setLoading(true)
    const url = type === 'standard' ? apiUrl.contract_hard_verify : apiUrl.contract_verify;

    // axiosData(url, { ...obj }).then((res: any) => {
    //   setLoading(false)
    //   if (res && res.result) {
    //     setOutData({ ...res?.result?.compiled_file || {}, is_verified: res.result.is_verified });
    //     setActive('compile_output')
    //     setDisable(false);
    //     if (res.result.is_verified) {
    //       notification.success({
    //         className: 'custom-notification',
    //         message: 'success',
    //         duration: 100,
    //         description: 'Success'
    //       })
    //     } else {
    //       notification.error({
    //         className: 'custom-notification',
    //         message: 'Error',
    //         duration: 100,
    //         description: 'Invalid Arguments'
    //       })
    //     }

    //   }

    // })
  }

  const renderChildren = (item: any) => {
    const { dataIndex, title, placeholder = '' } = item;
    let content;
    switch (item.type) {
    case 'Input':
      return content = <Input className="custom_input !h-10 !text_des" value={data[dataIndex]} placeholder={ tr(placeholder)} />
    case 'Select':
      return content = <Select className="custom_select !text_des"
        options={item.options}
        defaultValue={data[dataIndex]}
        placeholder={ tr(placeholder)}
      />
    }
    return <span className="border border_text h-10 flex items-center rounded-[5px] px-2">{data[dataIndex]||'' }</span>
  }

  return <div>
    <div className="border rounded-xl p-5 card_shadow border_color mt-2.5 text_des text-xs">
      <ul className="border border_color rounded-[5px] p-4">
        {verify_source.desList.map(item => {
          return <li key={ item.title}>{ tr(item.title)}</li>
        })}
      </ul>
      <ul className="flex gap-y-2 mt-5 gap-x-5">
        {verify_source.headerList.map(item => {
          return <li className="flex flex-col flex-1" key={item.dataIndex}>
            <span className="text_color text-sm mb-2">{tr(item.title)}</span>
            { renderChildren(item)}
          </li>
        })}
      </ul>
    </div>
    <div className="border border_color card_shadow rounded-[12px] p-5 mt-5">
      <Upload fileData={files} onChange={(files: any, type: string) => {
        if (type === 'config') {
          setConfigFile(files)
        } else {
          setFiles(files);
        }

      } }/>
    </div>
    <div className="border border_color card_shadow rounded-[12px] p-5 mt-5">
      <div className="mb-2 text-sm font-medium">{tr('arguments')}</div>
      <TextArea value={data.arguments || ''}
        autoSize={{ minRows: 4, maxRows: 6 }}
        className="custom_input"
        onChange={(e: any) => { setData({ ...data, arguments: e.target.value }) }} />
      <div className="flex gap-x-2 mt-5">
        <Button className="primary_btn flex items-center gap-x-2 h-8" onClick={ handleSave}> {tr('confirm')}</Button>
        <Button className="cancel_btn"> { tr('reset')}</Button>
        <Button className="cancel_btn"> { tr('back')}</Button>
      </div>
    </div>
  </div>
}