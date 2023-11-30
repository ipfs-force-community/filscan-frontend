import { Translation } from '@/components/hooks/Translation'
import styles from './index.module.scss'
import User from '@/src/user'
import Link from 'next/link'
import SendCode from '@/src/account/sendCode'
import userStore from '@/store/modules/user'
import { Button, Form, Input } from 'antd'
import { login_list } from '@/contents/user'
import { isEmail, validatePassword } from '@/utils'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'
import { useHash } from '@/components/hooks/useHash'
import { useEffect } from 'react'

export default observer(() => {
  const { tr } = Translation({ ns: 'common' })
  const { verifyCode } = userStore
  const { hashParams = {} } = useHash()
  const { inviteCode } = hashParams
  const [form] = Form.useForm()

  useEffect(() => {
    const handleClick = async (e: any) => {
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
      e.stopPropagation()
    }
    window.addEventListener('keydown', handleClick)
    return () => {
      window.removeEventListener('keydown', handleClick)
    }
  }, [])

  console.log('----33', verifyCode)

  const onFinish = async () => {
    const data = form.getFieldsValue()
    const payload = {
      ...data,
      mail: data.email,
      password: data.new_password,
      new_password: data.new_password,
      invite_code: data.invite,
      token: verifyCode || localStorage.getItem('send_code'),
    }
    userStore.loginUserInfo(payload)
  }

  const mail = Form.useWatch('email', form)
  useEffect(() => {
    form?.setFieldValue('invite', inviteCode)
  }, [inviteCode])

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
      case 'invite':
        content = (
          <Input
            placeholder={tr(item.placeholder)}
            className={`custom_input ${styles.contain_input}`}
            prefix={item.prefix}
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
        <div className={styles.contain_header}>{tr('register')}</div>
        <Form
          form={form}
          size="large"
          validateTrigger="submit"
          className={`custom_form ${styles.container_main} `}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {login_list['register']?.map((item: any) => {
            return renderChildren(item)
          })}
          <div className={styles.contain_have}>
            <span>{tr('have_account')}</span>
            <Link href="/admin/login">{tr('login')}</Link>
          </div>
          <Form.Item className={styles.submit}>
            <Button htmlType="submit" className="primary_btn !w-full">
              {tr('go_register')}
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
