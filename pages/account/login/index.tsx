/** @format */

import { Translation } from '@/components/hooks/Translation';
import { logTabs, login_list } from '@/contents/account';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect} from 'react';
import SendCode from '@/src/account/sendCode';
import Success from '@/src/account/success';
import { proApi } from '@/contents/apiUrl';
import { UserInfo } from '@/store/UserStore';
import { useHash } from '@/components/hooks/useHash';
import useAxiosData from '@/store/useAxiosData';
import errorIcon from '@/assets/images/error.svg';
import Link from 'next/link';
import Image from 'next/image';
import messageManager from '@/packages/message';
import { useRouter } from 'next/router';

export default () => {
  const [form] = Form.useForm();
  const { tr } = Translation({ ns: 'common' });
  const { hashParams } = useHash();
  const userInfo = UserInfo();
  const { axiosData } = useAxiosData();
  const router = useRouter()

  const onFinish = async () => {
    //登录
    const data = form.getFieldsValue();
    const result: any = await axiosData(proApi.login, {
      ...data,
      mail: data.email,
    });
    if (result.code === 1) {
      //未注册
      messageManager.showMessage({
        type: 'error',
        content: tr('no_account'),
        icon: <Image src={errorIcon} width={14} height={14} alt='error' />,
      });
    }
    if (result.token) {
      localStorage.setItem('token', result.token);
      userInfo.setUserInfo({
        last_login: result?.expired_at || '',
        mail: data?.email || result?.mail,
        name: result?.name,
      });
      messageManager.showMessage({
        type: 'success',
        content: 'login successful',
      });
      router.push('/account#overview')
    }
  };

  useEffect(() => {
    if (userInfo.mail) {

      router.push('/account#overview')
    }
  }, [userInfo.mail]);

  return (
    <>
      <div className='bg-black w-full h-[200px]'>Banner</div>
      <div className='!w-[404px] !p-0 !mt-14 !m-auto'>
        <ul className='flex gap-x-6 list-none'>
          {logTabs?.map((log_item, index) => {
            return (
              <Link
                href={`/account/login?type=${log_item.dataIndex}`}
                key={index}
                scroll={false}
                id={log_item.dataIndex}
                className={`text-lg text-font_des hover:text-font ${
                  hashParams.type === log_item.dataIndex ? 'highlight' : ''
                }`}>
                {tr(log_item.title)}
              </Link>
            );
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
          size='large'
          validateTrigger='submit'
          className='custom_form !w-full !mt-7 !flex !flex-col gap-y-4'
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          {login_list(hashParams && hashParams?.type).map((item) => {
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
              <Checkbox defaultChecked={true}>{tr('remember_me')}</Checkbox>
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
    </>
  );
};
