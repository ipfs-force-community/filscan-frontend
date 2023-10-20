/** @format */

import { Translation } from '@/components/hooks/Translation';
import { registerList } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import SendCode from '@/src/account/sendCode';
import { validateCode, validatePassword } from '@/utils';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import messageManager from '@/packages/message';
import Link from 'next/link';
import Image from 'next/image';
import errorIcon from '@/assets/images/error.svg';
import useAxiosData from '@/store/useAxiosData';
import Banner from '@/src/account/Banner';
import { useRouter } from 'next/router';

export default () => {
  const { tr } = Translation({ ns: 'common' });
  const [token, setToken] = useState('');
  const { axiosData } = useAxiosData();
  const [form] = Form.useForm();
  const router = useRouter()
  const onFinish = async () => {
    //注册
    const data = form.getFieldsValue();
    const result: any = await axiosData(proApi.resetPassword, {
      ...data,
      mail: data.email,
      password: data.new_password,
      new_password:data.new_password,
      token:token||localStorage.getItem('send_code'),
    });

    if (result) {
      localStorage.setItem('token', result?.token);
      router.push('/account/login' )
      // userInfo.setUserInfo({...result})
      // localStorage.setItem('expired_at', result.expired_at); //过期时间
    } else {
      messageManager.showMessage({
        type: 'error',
        content: tr('no_account'),
        icon: <Image src={errorIcon} width={14} height={14} alt='error' />,
      });
    }
  };

  //监听mail 的变化
  const mail = Form.useWatch('email', form);

  //注册
  return (
    <>
      <Banner />
      <div className='main_contain !w-2/5  !min-w-[404px]  !mb-10 !mt-8'>
        <div className={`text-lg tex_color`}>
          {tr('forgot_password')}
        </div>
        <Form
          form={form}
          size='large'
          className='custom_form !w-full !mt-7 !flex !flex-col gap-y-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          scrollToFirstError>
          {registerList.map((item) => {
            const showButton = item.label === 'code';
            const newRules: any = [];
            item.rules.forEach((v) => {
              newRules.push({ ...v, message: tr(v.message) });
              if (item.name === 'email') {
                newRules.push(() => ({
                  async validator(_: any, value: any) {
                    const result: any = await axiosData(
                      proApi.mail_exists,
                      {
                        mail: value,
                      }
                    );
                    if (!result?.exists) {
                      return Promise.reject(new Error(tr('no_account')));
                    }
                    if (result.exists) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error(tr('email_rules')));
                  },
                }));
              } if (item.name === 'token') {
                newRules.push(() => ({
                  validator(_: any, value: any) {
                    if (!value || (value && validateCode(value))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(tr('code_rules')));
                  },
                }));
              } else if (item.name === 'new_password') {
                newRules.push(() => ({
                  validator(_: any, value: any) {
                    if (
                      !value ||
                          validatePassword(value, form.getFieldValue('email'))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(tr('password_rules')));
                  },
                }));
              } else if (item.name === 'confirm_password') {
                newRules.push(
                  ({ getFieldValue }: { getFieldValue: Function }) => ({
                    validator(_: any, value: any) {
                      if (
                        !value ||
                            getFieldValue('new_password') === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(tr('confirm_password_rules'))
                      );
                    },
                  })
                );
              }
            });
            return (
              <Form.Item
                className='!m-0  !h-[48px]'
                name={item.name}
                key={item.name}
                validateTrigger='submit'
                rules={newRules}>
                {item?.name?.includes('password') ? (
                  <Input.Password
                    className='custom_input'
                    prefix={item.prefix}
                    placeholder={tr(item.placeholder)}
                  />
                ) : (
                  <Input
                    className='custom_input'
                    prefix={item.prefix}
                    placeholder={tr(item.placeholder)}
                    suffix={
                      showButton && (
                        <SendCode
                          mail={mail}
                          onChange={(token) => setToken(token)}
                        />
                      )
                    }
                  />
                )}
              </Form.Item>
            );
          })}
          <div className='!flex text_color !gap-x-2'>
            <span>{tr('have_account')}</span>
            <Link href='/account/login'>{tr('login')}</Link>
          </div>
          <Form.Item className='!w-full !text-white'>
            <Button
              htmlType='submit'
              className='!w-full !bg-primary !text-white'>
              {tr('reset_password')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
