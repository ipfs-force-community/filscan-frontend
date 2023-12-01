import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import styles from './index.module.scss'
import User from '@/src/user'
import Link from 'next/link'
import SendCode from '@/src/account/sendCode'
import userStore from '@/store/modules/user'
import { useEffect, useMemo } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { logTabs, login_list } from '@/contents/user'
import { isEmail } from '@/utils'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'
export default observer(() => {
  const { tr } = Translation({ ns: 'common' })
  const { verifyCode } = userStore
  const { hashParams } = useHash()
  const [form] = Form.useForm()
  const type = useMemo(() => {
    if (hashParams.type) {
      return hashParams.type
    }
    return 'password'
  }, [hashParams.type])

  useEffect(() => {
    const handleClick = async (e: any) => {
      e.stopPropagation()
      if (e.keyCode === 13) {
        //按下enter 回车键
        try {
          const values = await form.validateFields()
          console.log('Success:', values)
          onFinish()
        } catch (errorInfo) {
          console.log('Failed:', errorInfo)
        }
      }
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [])

  const onFinish = async () => {
    const data = form.getFieldsValue()
    const payload = {
      ...data,
      mail: data.email,
      token: verifyCode || localStorage.getItem('send_code'),
      invite_code: data.invite,
    }
    userStore.loginUserInfo(payload)
  }

  const mail = Form.useWatch('email', form)

  const renderChildren = (item: any) => {
    let content
    const newRules: any = []
    switch (item.name) {
      case 'email':
        newRules.push(
          newRules.push(() => ({
            async validator(_: any, value: any) {
              if (value && isEmail(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(tr('email_rules')))
            },
          })),
        )
        content = (
          <Input
            placeholder={tr(item.placeholder)}
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
          />
        )
        break
      case 'invite':
        content = (
          <Input
            placeholder={tr(item.placeholder)}
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
          />
        )
        break
      case 'code':
        newRules.push(
          newRules.push(() => ({
            async validator(_: any, value: any) {
              if (value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(tr('email_rules')))
            },
          })),
        )
        content = (
          <Input
            placeholder={tr(item.placeholder)}
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
            suffix={<SendCode mail={mail} />}
          />
        )
        break
      case 'password':
        content = (
          <Input.Password
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
            placeholder={tr(item.placeholder)}
          />
        )
        break
    }
    return (
      <Form.Item
        name={item.name}
        key={item.name}
        rules={newRules}
        className={styles.container_main_item}
      >
        {content}
      </Form.Item>
    )
  }

  const renderContent = () => {
    return (
      <div className={`${styles.contain}`}>
        <ul className={styles.contain_header}>
          {logTabs?.map((log_item, index) => {
            return (
              <Link
                className={`${styles.contain_header_link} ${
                  type === log_item.dataIndex ? styles.active : ''
                }`}
                href={`/admin/login?type=${log_item.dataIndex}`}
                key={index}
                scroll={false}
                id={log_item.dataIndex}
              >
                {tr(log_item.title)}
              </Link>
            )
          })}
        </ul>
        <Form
          form={form}
          size="large"
          validateTrigger="submit"
          className={`custom_form ${styles.container_main} `}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {login_list[type]?.map((item: any) => {
            return renderChildren(item)
          })}
          {type !== 'code' && (
            <Form.Item name="remember" valuePropName="checked">
              <div className={styles.remember}>
                <Checkbox
                  className="custom_checkbox !text_color"
                  defaultChecked={true}
                >
                  {tr('remember_me')}
                </Checkbox>
                <Link href="/admin/forget">{tr('forgot_password')}</Link>
              </div>
            </Form.Item>
          )}

          <Form.Item className={styles.submit}>
            <Button htmlType="submit" className="primary_btn !w-full">
              {tr('login')}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.go_register}>
          <span>{tr('no_account')}</span>
          <Link href={'/admin/register'} className="text-primary">
            {tr('go_register')}
          </Link>
        </div>
      </div>
    )
  }
  return (
    <>
      <BrowserView>
        <User>{renderContent()}</User>
      </BrowserView>
      <MobileView>{renderContent()}</MobileView>
    </>
  )
})
