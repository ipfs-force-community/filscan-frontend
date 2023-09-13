import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { verify_first } from "@/contents/contract";
import useAxiosData from "@/store/useAxiosData";
import { Button, Form, Input, Select, Space } from "antd";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default () => {
  const { tr } = Translation({ ns: 'contract' });
  const router = useRouter();
  const [form] = Form.useForm();

  const {data:versionData, } = useAxiosData(apiUrl.contract_solidity)
  const { data: licensesData, } = useAxiosData(apiUrl.contract_Licenses)

  const versionOptions = useMemo(() => {
    if (versionData?.version_list) {
      return versionData?.version_list?.map((item:string) => {
        return { item,label: item,value:item}
      })
    }
    return []
  }, [versionData])

  const licensesOptions = useMemo(() => {
    if (licensesData?.version_list) {
      return licensesData?.version_list?.map((item:string) => {
        return { item,label: item,value:item}
      })
    }
    return []
  }, [licensesData])

  const handleFinish = (values:any) => {
    router.push(`/contract/verify?contractAddress=${values.contract_address}&version=${values.compile_version}&type=${values.verify_model}`)

  }

  const renderChildren = (item: any) => {
    const { dataIndex, title, placeholder = '' } = item;
    const options = dataIndex === 'compile_version' ? versionOptions : licensesOptions;
    let content;
    switch (item.type) {
    case 'Input':
      content = <Input className="!h-10" placeholder={ tr(placeholder)} />
      break;
    default:
      content = <Select className="custom_select"
        options={item.options || options}
        placeholder={ tr(placeholder)}
      />
      break;
    }
    return <Form.Item help={undefined} required={false} name={dataIndex} className="!w-full" label={ tr(title)} key={item.dataIndex}
      rules={item.rules}>
      { content}
    </Form.Item>

  }
  return <>
    <div>
      <span className='flex flex-col text-xl font-medium gap-y-2.5'>{tr('verify_title')}</span>
      <span className="text_des text-xs">{ tr('verify_des')}</span>
    </div>
    <div className='border rounded-xl p-5 card_shadow border_color mt-2.5 flex flex-col items-center'>
      <div className="text_des text-xs leading-6">{tr('verify_content')}</div>
      <div className="mt-12 w-[500px]">
        <Form className="!w-full custom_form"
          form={form}
          size='small'
          onFinish={handleFinish}

          layout="vertical">
          {verify_first.list.map(item => {
            return renderChildren(item)
          })}
          <Form.Item >
            <Space>
              <Button htmlType="submit" className="primary_btn !w-[140px] !h-9" >
                { tr('next')}
              </Button>
              <Button htmlType="reset" className="cancel_btn !w-[140px] !h-9">{ tr('reset')}</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  </>
}