import { Translation } from '@/components/hooks/Translation'
import { personal_setting } from '@/contents/account'
import userStore from '@/store/modules/user'
import { max_name_length, validatePassword } from '@/utils'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'

export default () => {
  const { userInfo, showMemberWarn } = userStore
  const { tr } = Translation({ ns: 'account' })

  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    //     setLoading(true)
    //     const payload = form.getFieldsValue()
    //     const result = await axiosData(proApi.updateInfo, {
    //       ...payload,
    //     })
    //     if (result) {
    //       const newInfo: any = await axiosData(proApi.userInfo)
    //       messageManager.showMessage({
    //         type: 'success',
    //         content: 'Update successful',
    //       })
    //       localStorage.removeItem('token')
    //       userStore.clearUserInfo()
    //       router.push('/admin/login')
    //     }
    //     setLoading(false)
  }

  return (
    <>
      <Form
        initialValues={{
          old_password: '',
          name: userInfo?.name || '',
        }}
        form={form}
        onFinish={handleSave}
        layout="vertical"
        className="mt-5 w-3/5 min-w-[300px]"
      >
        {personal_setting.map((item: any) => {
          const objShow: any = {}
          if (item.dataIndex === 'name') {
            objShow.showCount = true
            objShow.maxLength = max_name_length
          }
          const newRules: any = []
          item?.rules?.forEach((v: any) => {
            newRules.push({ ...v, message: tr(v.message) })
            if (item.name === 'name') {
              newRules.push(() => ({
                validator(_: any, value: any) {
                  if (!value || value.length < max_name_length) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(tr('name_length')))
                },
              }))
            }
            if (item.name === 'new_password') {
              newRules.push(() => ({
                validator(_: any, value: any) {
                  if (
                    !value ||
                    validatePassword(value, form.getFieldValue('old_password'))
                  ) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(tr('password_rules')))
                },
              }))
            } else if (item.name === 'confirm_password') {
              newRules.push(
                ({ getFieldValue }: { getFieldValue: Function }) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(tr('confirm_password_rules')),
                    )
                  },
                }),
              )
            }
          })
          return (
            <Form.Item
              rules={item.rules}
              name={item.dataIndex}
              label={tr(item.title)}
              key={item.dataIndex}
            >
              {item?.dataIndex?.includes('password') ? (
                <Input.Password
                  className="custom_input h-12"
                  {...objShow}
                  defaultValue={''}
                  placeholder={tr(item.placeholder)}
                />
              ) : (
                <Input
                  className="custom_input h-12"
                  defaultValue={''}
                  {...objShow}
                  placeholder={tr(item.placeholder)}
                />
              )}
            </Form.Item>
          )
        })}
        <Form.Item className="mt-5 flex !w-full flex-1">
          {/* <Button className='cancel_btn border border_color' onClick={() => {
                form.resetFields(['old_password','name','new_password','old_password'])
              }}
              >{tr('cancel')}</Button> */}
          <Button htmlType="submit" className="confirm_btn" loading={loading}>
            {tr('confirm')}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}