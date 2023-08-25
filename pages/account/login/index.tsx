/** @format */

import { Translation } from '@/components/hooks/Translation';
import { logTabs, login_list } from '@/contents/account';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SendCode from '@/src/account/sendCode';
import fetchData from '@/store/server';
import Success from '@/src/account/success';
import { proApi } from '@/contents/apiUrl';
import { UserInfo } from '@/store/UserStore';
import { useHash } from '@/components/hooks/useHash';
import useAxiosData from '@/store/useAxiosData';

export default () => {
  const [form] = Form.useForm();
  const { tr } = Translation({ ns: 'common' });
  const { hash, hashParams } = useHash();
  const userInfo = UserInfo();
  const [success, setSuccess] = useState(false);
  const { axiosData } = useAxiosData();
  const onFinish = async () => {
    //登录
    const data = form.getFieldsValue();
    const result: any = await axiosData(proApi.login, {
      ...data,
      mail: data.email,
    });
    if (result.token) {
      setSuccess(true);
      localStorage.setItem('token', result.token);
    }
  };

  useEffect(() => {
    if (userInfo.mail) {
      setSuccess(true);
    }
  }, [userInfo.mail]);

  return (
    <>
      <div className='bg-black w-full h-[200px]'>Banner</div>
      <>
        {success ? (
          <Success />
        ) : (
          <div className='!w-[404px] !p-0 !mt-14 !m-auto'>
            <ul className='flex gap-x-6 list-none'>
              {logTabs?.map((log_item, index) => {
                return (
                  <Link
                    href={`/account${
                      log_item.dataIndex !== 'login'
                        ? '#' + log_item.dataIndex
                        : ''
                    }`}
                    as={`/account${
                      log_item.dataIndex !== 'login'
                        ? '#' + log_item.dataIndex
                        : ''
                    }`}
                    key={index}
                    id={log_item.dataIndex}
                    className={`text-lg text-font_des hover:text-font ${
                      hash === log_item.dataIndex ? 'highlight' : ''
                    }`}>
                    {tr(log_item.title)}
                  </Link>
                );
              })}
            </ul>
            <Form
              form={form}
              size='large'
              validateTrigger='submit'
              className='custom_form !w-full !mt-7 !flex !flex-col gap-y-4'
              initialValues={{ remember: true }}
              onFinish={onFinish}>
              {login_list(hash).map((item) => {
                const showButton = item.name === 'code';
                return (
                  <Form.Item
                    className='!m-0  !h-[48px]'
                    name={item.name}
                    key={item.name}
                    rules={item.rules}>
                    {item?.name?.includes('password') ? (
                      <Input.Password
                        className='h-12'
                        prefix={item.prefix}
                        placeholder={tr(item.placeholder)}
                      />
                    ) : (
                      <Input
                        prefix={item.prefix}
                        placeholder={tr(item.placeholder)}
                        suffix={
                          showButton && (
                            <SendCode mail={form.getFieldValue('email')} />
                          )
                        }
                      />
                    )}
                  </Form.Item>
                );
              })}
              <Form.Item
                name='remember'
                valuePropName='checked'
                className='!m-0 !p-0'>
                <div className='!flex !justify-between'>
                  <Checkbox>{tr('remember_me')}</Checkbox>
                  <a href=''>{tr('forgot_password')}</a>
                </div>
              </Form.Item>
              <Form.Item className='!mt-6'>
                <Button
                  htmlType='submit'
                  className='!w-full !bg-primary !text-white'>
                  {tr('login')}
                </Button>
              </Form.Item>
            </Form>
            <div className='flex gap-x-2'>
              <span>{tr('no_account')}</span>
              <Link href={'/account/register'}>{tr('go_register')}</Link>
            </div>
          </div>
        )}
      </>
    </>
  );
};
