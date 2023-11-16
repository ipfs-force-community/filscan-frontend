import { Translation } from '@/components/hooks/Translation'
import styles from './index.module.scss'
import User from '@/src/user'
import Link from 'next/link'
import SendCode from '@/src/account/sendCode'
import userStore from '@/store/modules/user'
import { Button, Form, Input } from 'antd'
import { login_list } from '@/contents/user'
import errorIcon from '@/assets/images/error.svg'
import { isEmail, validatePassword } from '@/utils'
import { observer } from 'mobx-react'
import messageManager from '@/packages/message'
import Image from 'next/image'
import { BrowserView, MobileView } from '@/components/device-detect'

export default observer(() => {
  const { tr } = Translation({ ns: 'common' })
  const { verifyCode } = userStore
  const [form] = Form.useForm()

  const onFinish = async () => {
    const data = form.getFieldsValue()
    const payload = {
      ...data,
      mail: data.email,
      password: data.new_password,
      new_password: data.new_password,
      token: verifyCode || localStorage.getItem('send_code'),
    }
    const result = await userStore.resetPassword(payload)
    if (!result) {
      messageManager.showMessage({
        type: 'error',
        content: tr('no_account'),
        icon: <Image src={errorIcon} width={14} height={14} alt="error" />,
      })
    }
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
      case 'code':
        newRules.push(
          newRules.push(() => ({
            async validator(_: any, value: any) {
              if (value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(tr('code_rules')))
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
      case 'new_password':
        newRules.push(() => ({
          validator(_: any, value: any) {
            if (
              !value ||
              validatePassword(value, form.getFieldValue('email'))
            ) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(tr('password_rules')))
          },
        }))
        content = (
          <Input.Password
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
            placeholder={tr(item.placeholder)}
          />
        )
        break
      case 'confirm_password':
        newRules.push(({ getFieldValue }: { getFieldValue: Function }) => ({
          validator(_: any, value: any) {
            if (!value || getFieldValue('new_password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(tr('confirm_password_rules')))
          },
        }))
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
      <div className={styles.contain}>
        <div className={styles.contain_header}>{tr('forgot_password')}</div>
        <Form
          form={form}
          size="large"
          validateTrigger="submit"
          className={`custom_form ${styles.container_main} `}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {login_list['forget']?.map((item: any) => {
            return renderChildren(item)
          })}
          <div className={styles.contain_have}>
            <span>{tr('have_account')}</span>
            <Link href="/admin/login">{tr('login')}</Link>
          </div>
          <Form.Item className={styles.submit}>
            <Button htmlType="submit" className="primary_btn !w-full">
              {tr('reset_password')}
            </Button>
          </Form.Item>
        </Form>
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
