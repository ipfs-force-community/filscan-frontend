import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import { verify_source } from '@/contents/contract'
import { Button, Input, Select, notification } from 'antd'
import { useEffect, useState } from 'react'
import Upload from './Upload'
import { apiUrl } from '@/contents/apiUrl'
import Link from 'next/link'

const { TextArea } = Input

interface Props {
  onChange: (files: Record<string, any>, url: string) => void
  loading: boolean
}

export default (props: Props) => {
  const { onChange, loading } = props
  const { tr } = Translation({ ns: 'contract' })
  const { hashParams } = useHash()
  const { type } = hashParams
  const [data, setData] = useState<any>({
    contract_address: '',
    compile_version: '',
    optimize: true,
    optimize_runs: 200,
    arguments: '',
  })
  const [files, setFiles] = useState<any>({})
  const [configFile, setConfigFile] = useState<any>({})

  useEffect(() => {
    if (hashParams) {
      setData({
        ...data,
        contract_address: hashParams.contractAddress || '',
        compile_version: hashParams.version || '',
      })
    }
  }, [hashParams])

  const handleSave = () => {
    const obj = { ...data }
    const filesList = Object.keys(files) || []
    const configFiles = Object.keys(configFile) || []

    if (filesList.length === 0) {
      return notification.warning({
        className: 'custom-notification',
        message: 'Warning',
        duration: 100,
        description: 'please select file',
      })
    }
    if (type === 'multi' && configFiles.length === 0) {
      return notification.warning({
        className: 'custom-notification',
        message: 'Warning',
        duration: 100,
        description: 'Please select Metadata File',
      })
    }
    let source_file: any = []
    const config_files: any = []
    if (type === 'multi') {
      configFiles.forEach((v) => {
        const show_file = configFile[v]
        const item = {
          file_name: show_file.name,
          source_code: show_file.value,
        }
        config_files.push(item)
      })
    }
    filesList.forEach((v) => {
      const show_file = files[v]
      const item = {
        file_name: show_file.name,
        source_code: show_file.value,
      }
      source_file.push(item)
    })

    obj.source_file = source_file
    obj.optimize_runs = data.optimize_runs
      ? Number(data.optimize_runs)
      : undefined
    obj.optimize = data.optimize === 'true'
    obj.mate_data_file = config_files[0]
    if (type === 'standard') {
      obj.hardhat_build_info_file = source_file[0]
    }
    const url =
      type === 'standard' ? apiUrl.contract_hard_verify : apiUrl.contract_verify
    onChange(obj, url)
  }

  const renderChildren = (item: any) => {
    const { dataIndex, title, placeholder = '' } = item
    let content
    switch (item.type) {
      case 'Input':
        return (content = (
          <Input
            className="custom_input !text_des !h-10"
            value={data[dataIndex]}
            placeholder={tr(placeholder)}
          />
        ))
      case 'Select':
        return (content = (
          <Select
            className="custom_select"
            popupClassName={'custom_select_wrapper'}
            options={item.options}
            defaultValue={data[dataIndex]}
            placeholder={tr(placeholder)}
          />
        ))
    }
    return (
      <span className="border_text flex h-10 items-center rounded-[5px] border px-2">
        {data[dataIndex] || ''}
      </span>
    )
  }

  return (
    <div>
      <div className="card_shadow border_color text_des mt-2.5 rounded-xl border p-5 text-xs">
        <ul className="border_color rounded-[5px] border p-4 leading-6">
          {verify_source.desList.map((item) => {
            return <li key={item.title}>{tr(item.title)}</li>
          })}
        </ul>
        <ul className="mt-5 flex gap-x-5 gap-y-2">
          {verify_source.headerList.map((item) => {
            return (
              <li className="flex flex-1 flex-col" key={item.dataIndex}>
                <span className="text_color mb-2 text-sm">
                  {tr(item.title)}
                </span>
                {renderChildren(item)}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="border_color card_shadow mt-5 rounded-[12px] border p-5">
        <Upload
          fileData={files}
          confiles={configFile}
          onChange={(files: any, type: string) => {
            if (type === 'config') {
              setConfigFile(files)
            } else {
              setFiles(files)
            }
          }}
        />
      </div>
      <div className="border_color card_shadow mt-5 rounded-[12px] border p-5">
        <div className="mb-2 text-sm font-medium">{tr('arguments')}</div>
        <TextArea
          value={data.arguments || ''}
          autoSize={{ minRows: 4, maxRows: 6 }}
          className="custom_input"
          onChange={(e: any) => {
            setData({ ...data, arguments: e.target.value })
          }}
        />
        <div className="mt-5 flex gap-x-2">
          <Button
            className="primary_btn flex h-8 items-center gap-x-2"
            onClick={handleSave}
            loading={loading}
          >
            {' '}
            {tr('confirm')}
          </Button>
          <Link
            href={`/contract/verify`}
            className="cancel_btn border_color flex items-center justify-center rounded-md border"
          >
            {' '}
            {tr('reset')}
          </Link>
          <Link
            href={`/home`}
            className="cancel_btn border_color flex items-center justify-center rounded-md border"
          >
            {' '}
            {tr('back')}
          </Link>
        </div>
      </div>
    </div>
  )
}
