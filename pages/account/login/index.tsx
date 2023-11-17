/** @format */

import { Translation } from '@/components/hooks/Translation'
import { logTabs, login_list } from '@/contents/account'
import { Button, Checkbox, Form, Input } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import SendCode from '@/src/account/sendCode'
import { proApi } from '@/contents/apiUrl'
import { useHash } from '@/components/hooks/useHash'
import useAxiosData from '@/store/useAxiosData'
import Link from 'next/link'
import messageManager from '@/packages/message'
import { useRouter } from 'next/router'
import Banner from '@/src/account/Banner'
import userStore from '@/store/modules/user'
import { BrowserView, MobileView } from '@/components/device-detect'

export default () => {
  const [form] = Form.useForm()
  const { tr } = Translation({ ns: 'common' })
  const { hashParams } = useHash()
  const { userInfo } = userStore
  const { axiosData } = useAxiosData()
  const router = useRouter()
  const [token, setToken] = useState('')

  const onFinish = async () => {
    //登录
    const data = form.getFieldsValue()
    const result: any = await axiosData(proApi.login, {
      ...data,
      mail: data.email,
      token: token || localStorage.getItem('send_code'),
    })
    if (result?.token) {
      localStorage.setItem('token', result.token)
      localStorage.setItem('expired_at', result.expired_at) //过期时间
      userStore.setUserInfo({
        last_login: result?.expired_at || '',
        mail: data?.email || result?.mail,
        name: result?.name,
      })
      localStorage.setItem('token', result?.token)
      messageManager.showMessage({
        type: 'success',
        content: 'login successful',
      })
      router.push('/account#overview')
    }
  }

  useEffect(() => {
    if (userInfo.mail) {
      router.push('/account#overview')
    }
  }, [userInfo.mail])

  const handlePressEnter = (e: any) => {
    e.preventDefault()
  }

  //监听mail 的变化
  const mail = Form.useWatch('email', form)

  const type = useMemo(() => {
    if (hashParams.type) {
      return hashParams.type
    }
    return 'login'
  }, [hashParams.type])
  return (
    <>
      <BrowserView>
        <Banner />
      </BrowserView>
      <div className="main_contain !mb-10 !mt-8 !w-1/2 !min-w-[404px]">
        <ul className="flex list-none gap-x-6">
          {logTabs?.map((log_item, index) => {
            return (
              <Link
                href={`/admin/login?type=${log_item.dataIndex}`}
                key={index}
                scroll={false}
                id={log_item.dataIndex}
                className={`text-lg  ${
                  type === log_item.dataIndex ? 'text-primary' : 'text_color'
                }`}
              >
                {tr(log_item.title)}
              </Link>
            )
          })}
        </ul>
        {/* {accountStatus === 1 && (
              <div className='mt-5'>
                <Image src={errorIcon} width={14} height={14} alt='error' />
                <span>{tr('no_account')}</span>
              </div>
            )} */}
        <Form
          form={form}
          size="large"
          validateTrigger="submit"
          className="custom_form !mt-7 !flex !w-full !flex-col gap-y-6"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {login_list(hashParams && hashParams?.type).map((item) => {
            const showButton = item.name === 'code'
            return (
              <Form.Item
                className="!m-0  !h-[48px]"
                name={item.name}
                key={item.name}
                rules={item.rules}
              >
                {item?.name?.includes('password') ? (
                  <Input.Password
                    className="custom_input h-12"
                    prefix={item.prefix}
                    placeholder={tr(item.placeholder)}
                  />
                ) : (
                  <Input
                    className="custom_input"
                    prefix={item.prefix}
                    style={{ background: 'transparent' }}
                    placeholder={tr(item.placeholder)}
                    onPressEnter={handlePressEnter}
                    suffix={
                      showButton && (
                        <SendCode
                          mail={mail}
                          onChange={(token) => {
                            setToken(token)
                          }}
                        />
                      )
                    }
                  />
                )}
              </Form.Item>
            )
          })}
          <Form.Item
            name="remember"
            valuePropName="checked"
            className="!m-0 !p-0"
          >
            <div className="!flex !justify-between">
              <Checkbox
                className="custom_checkbox !text_color"
                defaultChecked={true}
              >
                {tr('remember_me')}
              </Checkbox>
              <Link href="/admin/password">{tr('forgot_password')}</Link>
            </div>
          </Form.Item>
          <Form.Item className="!mt-6">
            <Button htmlType="submit" className="primary_btn !w-full">
              {tr('login')}
            </Button>
          </Form.Item>
        </Form>
        <div className="flex gap-x-2">
          <span>{tr('no_account')}</span>
          <Link href={'/admin/register'} className="text-primary">
            {tr('go_register')}
          </Link>
        </div>
      </div>
    </>
  )
}
